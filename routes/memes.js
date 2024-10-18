var express = require("express");
var router = express.Router();
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const URL = process.env.URL;

router.get("/", async function (req, res, next) {
  // Get stored memes object
  const memes = req.app.locals.memesData;
  const visited = req.session.viewedMemes || [];
  res.render("memes", { memes, visited, query: "" });
});

router.post("/", function (req, res, next) {
  // Get stored memes object
  const memes = req.app.locals.memesData;
  let query = req.body.searchInput;
  const action = req.body.action;
  let searchResults = memes;

  if (action === "clear") {
    query = "";
  }

  if (query) {
    searchResults = memes.filter((meme) => meme.name.toLowerCase().includes(query.toLowerCase()));
  }

  const visited = req.session.viewedMemes || [];
  res.render("memes", { memes: searchResults, visited, query });
});

module.exports = router;
