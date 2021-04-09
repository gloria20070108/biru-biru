const express = require("express");
const router = express.Router();
const path = require("path");
const LocalStrategy = require("passport-local").Strategy;
const MyDB = require("../db/MyDB");
const passport = require("passport");

const sendIndexFile = (req, res) => {
  res.sendFile(
    path.join(__dirname, "../front/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
};

router.get("/home", sendIndexFile);
router.get("/detail/*", sendIndexFile);

router.get("/beers", async (req, res) => {
  const params = req.query;
  if (params.id) {
    //get beer based on id, used for detail page.
    try {
      const result = await MyDB.getBeerById(params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  } else {
    // get beer based on style/country/flavor and sortOption, used for home page.
    const style = params.style === "all" ? null : params.style;
    const country = params.country === "all" ? null : params.country;
    const flavor = params.flavor === "all" ? null : params.flavor;
    const sortOption = params.sortOption;
    try {
      const result = await MyDB.getBeers(style, country, flavor, sortOption);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
});

router.get("/beer-styles", async (req, res) => {
  try {
    const result = await MyDB.getStyles();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/countries", async (req, res) => {
  try {
    const result = await MyDB.getCountries();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/flavors", async (req, res) => {
  try {
    const result = await MyDB.getFlavors();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

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

router.post("/signout", (req, res) => {
  req.logout();
  res.redirect("/");
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
