var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");

router.get("/:id", function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }
  const id = req.params.id;
  const memes = req.app.locals.memesData;
  const meme = memes.filter((meme) => id == meme.id);
  res.render(`meme`, { meme });
});

router.post("/:id", function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const id = Number(req.params.id);
  if (!req.session.viewedMemes) {
    req.session.viewedMemes = [id];
  } else {
    if (!req.session.viewedMemes.includes(id)) {
      req.session.viewedMemes.push(id);
    }
  }
  console.log(req.session.viewedMemes);
  res.status(201).json({ message: "Success" });
});

module.exports = router;
