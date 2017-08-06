"use strict";
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

const aws_s3 = require("../modules/aws-s3");

// GET signed request from Amazon S3
router.get("/sign-s3", (req, res) => {
  console.log("getting signed url");
  const filename = req.query["file-name"];
  if (
    req.query["file-type"] == "" &&
    req.query["file-name"].indexOf(".strings") != -1
  )
    req.query["file-type"] = "plain/text";
  const filetype = req.query["file-type"];

  aws_s3.getSignedUrl(filename, filetype, (error, response) => {
    if (error !== null) {
      res.json({ error: "error" });
      console.log(error);
      return;
    } else {
      console.log("got signed url");
      res.json(response).end();
    }
  });
});

module.exports = router;
