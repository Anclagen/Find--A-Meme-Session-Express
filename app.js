var createError = require("http-errors");
var express = require("express");
var path = require("path");
var fs = require("fs");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var session = require("express-session");
var JsonStore = require("express-session-json")(session);

//routes
var indexRouter = require("./routes/index");
var memesRouter = require("./routes/memes");
var memeRouter = require("./routes/meme");
var loginRouter = require("./routes/login");

// initialise app
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
// ^4.16 express has its own body parser for json!
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use(express.static(__dirname + "/node_modules/jquery/dist/"));
app.use(express.static(__dirname + "/node_modules/bootstrap-icons"));

// setup passport authentication
app.use(
  session({
    secret: process.env.PASSPORT_SECRET || "Secret",
    resave: false,
    saveUninitialized: false,
    store: new JsonStore(),
  })
);
app.use(passport.authenticate("session"));

// clear stored memes on server restart
fs.writeFileSync(path.resolve(__dirname, "./data/memes.json"), "[]");

// Check user is logged in, applies user to locals for renders.
app.use(function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.session.passport.user;
  } else {
    res.locals.user = null;
  }
  next();
});

// setup routers
app.use("/", indexRouter);
app.use("/memes", memesRouter);
app.use("/meme", memeRouter);
app.use("/login", loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
