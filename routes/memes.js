var express = require("express");
var router = express.Router();
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const URL = process.env.URL;

router.get("/", async function (req, res, next) {
  let memes = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/memes.json")));
  if (!memes.length) {
    const response = await axios.get(URL);
    memes = response.data.memes;
    fs.writeFileSync(path.resolve(__dirname, "../data/memes.json"), JSON.stringify(memes));
  }

  const visited = req.session.viewedMemes || [];
  res.render("memes", { memes, visited });
});

router.post("/", function (req, res, next) {
  const memes = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/memes.json")));
  const query = req.query.query;
  let searchResults = memes;
  if (query) {
    searchResults = memes.filter((meme) => meme.name.toLowerCase().includes(query.toLowerCase()));
  }
  const visited = req.session.viewedMemes || [];
  res.json({ data: searchResults, isLoggedIn: req.isAuthenticated(), visited });
});

module.exports = router;
