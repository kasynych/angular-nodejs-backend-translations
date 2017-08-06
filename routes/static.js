"use strict";
var express = require("express");
var app = express();
var router = express.Router();

router.get(
  [
    "/",
    "/login",
    "/users",
    "/users/:id",
    "new-user",
    "/projects",
    "/projects/:id",
    "new-project",
    "languages",
    "languages/:id",
    "new-language",
    "translations/project/:id1/language/:id2"
  ],
  function(req, res) {
    if (req.xhr) return;
    if (
      process.env.environment != "stage" &&
      process.env.environment != "prod"
    ) {
      res.sendStatus(404).end();
      return;
    }

    res.sendFile(process.env.static_path + "/index.html");
  }
);

module.exports = router;
