"use strict";
// const stitch = require("mongodb-stitch");
// const client = new stitch.StitchClient('community-exaij');
// module.exports.client = client;
// module.exports.db = client.service('mongodb', 'mongodb-atlas').db('community');

const url = "...";
const client = require("mongodb").MongoClient;

module.exports.connect = cb => {
  client.connect(url, (err, db) => {
    module.exports.db = db;
    cb(err, db);
  });
};

module.exports.db = null;
