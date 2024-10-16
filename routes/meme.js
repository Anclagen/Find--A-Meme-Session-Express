var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");

router.get("/:id", function (req, res, next) {
  const id = req.params.id;
  const memes = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/memes.json")));
  let meme = memes.filter((meme) => id === meme.id);
  res.render(`meme`, { meme });
});

module.exports = router;
