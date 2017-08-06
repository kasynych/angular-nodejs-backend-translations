"use strict";
const request_module = require("supertest");
const json_beautify = require("json-beautify");
const uuidv1 = require("uuid/v1");
module.exports.request = request_module("http://localhost:3000");
module.exports.beautify = beautify;
let i = 0;
var beautify = obj => {
  return json_beautify(obj, null, 2, 100);
};

module.exports.log = obj => {
  console.log(beautify(obj));
};

module.exports.uuid = () => {
  let nodes = [];

  for (let j = 0; j < 6; j++)
    nodes.push(Math.round(Math.random() * 255).toString(16));
  i++;
  return uuidv1({
    node: new Uint8Array(nodes),
    msecs: Date.now() + Math.round(Math.random() * 10000) + i,
    nsecs: Math.round(Math.random() * 9999)
  });
};
