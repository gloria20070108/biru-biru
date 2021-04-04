var express = require("express");
var router = express.Router();
var LocalStrategy = require("passport-local").Strategy;
const MyDB = require("../db/MyDB");
const passport = require("passport");


router.post("/register", (req, res, next) => {
  console.log("backend signup functionc calling");
  passport.authenticate("local-signup", (error, user) => {
    if (error) {
      return res.status(500).json(error);
    }

    req.login(user, (error) => {
      if (error) {
        return res.status(500).json(error);
      } else {
        return res.json({
          message: "successfully sign up and sign in!",
        });
      }
    });
  })(req, res, next);
});

passport.use(
  "local-signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      MyDB.localReg(username, password)
        .then((user) => {
          if (user) {
            console.log("REGISTERED: " + user.username);
            req.session.success =
              "You are successfully registered and logged in " +
              user.username +
              "!";
            done(null, user);
          } else {
            console.log("COULD NOT REGISTER");
            req.session.error =
              "That username is already in use, please try a different one."; //inform user could not log them in
            done(null, user);
          }
        })
        .fail((err) => {
          console.log(err.body);
        });
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  done(null, username);
});
module.exports = router;