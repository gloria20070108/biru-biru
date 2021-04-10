const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const MyDB = require("../db/MyDB");
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
          if (user.password != password) {
            console.log("Wrong password");
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

    router.post(
      "/login",
      passport.authenticate("local", { failureRedirect: "/signin" }),
      function (req, res) {
        res.redirect("/home");
      }
    );

    router.get("/logout", function (req, res) {
      req.logout();
      res.redirect("/signin");
    });

    router.get("/getUser", (req, res) => {
      console.log("get user", req.user);
      res.json(req.user);
    });

    router.post("/register", async function (req, res) {
      let result = await MyDB.findByUsername(req.body.username);
      if (result) {
        res.json({ error: "User exists" });
      } else {
        result = await MyDB.registerUser(req.body.username, req.body.password);
        console.log("register user result", result);
      }
      res.redirect("/home");
    });
    router.get("*", (req, res) =>
      res.sendFile(path.resolve("front", "build", "index.html"))
    );

    return router;
  };
  return myAuth;
}
module.exports = MyAuth();
