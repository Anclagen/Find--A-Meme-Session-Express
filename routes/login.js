var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
const path = require("path");
const fs = require("fs");

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("login");
});

passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    let usersArray = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/users.json")));
    let filteredArray = usersArray.filter((x) => x.username == username);
    if (filteredArray.length > 0) {
      let usersData = filteredArray[0];
      if (usersData.password == password) {
        return cb(null, usersData);
      }
    } else {
      return cb(null, false);
    }
  })
);

passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((user, callback) => {
  const userId = user ? user.username : "";
  callback(null, userId);
});

router.post(
  "/password",
  passport.authenticate("local", {
    successRedirect: "/memes",
    failureRedirect: "/login",
  })
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/memes");
  });
});

module.exports = router;
