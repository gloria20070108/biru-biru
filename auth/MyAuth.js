const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const MyDB = require("../db/myDB");
const path = require("path");

function MyAuth() {
  const myAuth = {};
  //Set up passport session
  myAuth.setupPassport = (app) => {
    passport.use(
      new Strategy(async function (username, password, cb) {
        console.log("passport authentication...", username);
        try {
          const user = await MyDB.findByUsername(username);
          if (!user) {
            console.log("User not found");
            return cb(null, false);
          }

          if (user.password !== password) {
            return cb(null, false);
          }
          console.log("Login successful", user);
          return cb(null, user);
        } catch (err) {
          return cb(err);
        }
      })
    );

    //Save username in the session
    passport.serializeUser(function (user, cb) {
      cb(null, user.username);
    });

    passport.deserializeUser(async (username, cb) => {
      try {
        const user = await MyDB.findByUsername(username);
        return cb(null, user);
      } catch (err) {
        console.log("Error deserializing");
        cb(err);
      }
    });
    // Initialize Passport and restore authentication state, if any, from the
    // session
    app.use(
      require("express-session")({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
  };

  //passport router
  myAuth.authRouter = () => {
    const express = require("express");
    const router = express.Router();

    router.post("/login", (req, res, next) => {
      passport.authenticate("local", (error, user) => {
        if (error) {
          return res.status(500).json(error);
        }

        if (!user) {
          return res.status(401).json({});
        }

        req.login(user, (error) => {
          if (error) {
            return res.status(500).json(error);
          }

          res.redirect("/");
          return res.json({
            message: "successfully sign in!",
          });
        });
      })(req, res, next);
    });

    router.post("/logout", function (req, res) {
      try {
        req.logout();
        return res.json({ message: "successfully logged out!" });
      } catch (err) {
        return res.status(404).json({ error: err });
      }
    });

    router.get("/getUser", (req, res) => {
      if (req.user && req.user.username != null) {
        res.json(req.user.username);
      } else {
        res.status(404).json({ error: "can't find user." });
      }
    });

    router.post("/register", async function (req, res) {
      let result = await MyDB.findByUsername(req.body.username);
      if (result) {
        res.status(500).json({ error: "User exists" });
      } else {
        result = await MyDB.registerUser(req.body.username, req.body.password);
        console.log("register user result", result);
        // TODO: auto login here
      }
    });

    router.get("/", (req, res) =>
      res.sendFile(
        path.resolve(__dirname, "..", "front", "build", "index.html")
      )
    );

    router.get("/detail/*", (req, res) =>
      res.sendFile(
        path.resolve(__dirname, "..", "front", "build", "index.html")
      )
    );

    return router;
  };
  return myAuth;
}
module.exports = MyAuth();
