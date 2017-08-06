"use strict";
const mdb = require("./db");
const collection_name = "users";
const coll = mdb.db.collection(collection_name);
const helpers = require("../helpers");
const autoIncrement = require("mongodb-autoincrement");

/**
 * Gets list of users
 * @param {Object} args
 * @param {number} args.page - Page
 * @param {number} [args.items_per_page] - Items per Page
 * @param {function} cb
 * @returns {void}
 */
module.exports.get = (args, cb) => {
  helpers.log("getting users");
  coll.find().toArray(function(err, docs) {
    if (err) {
      helpers.log(err);
      cb(err, null);
      return;
    }

    helpers.log("got users");
    cb(null, docs);
  });
};

/**
 * Gets user by ID
 * @param {number} user_id
 * @param {function} cb
 * @returns {void}
 */
module.exports.getById = (id, cb) => {
  helpers.log("getting user");
  coll.findOne({ id: ~~id }, function(err, doc) {
    if (err) {
      helpers.log(err);
      cb(err, null);
      return;
    }

    helpers.log("got user");
    cb(null, doc);
  });
};

/**
 * Create user
 * @param {Object} user
 * @param {Function} cb
 */
module.exports.create = (user, cb) => {
  helpers.log("creating user");

  autoIncrement.getNextSequence(mdb.db, collection_name, "id", function(
    err,
    autoIndex
  ) {
    user.id = autoIndex;
    coll.insertOne(user, function(err, results) {
      if (err) {
        helpers.log(err);
        cb(err, null);
        return;
      }
      helpers.log("created user");
      cb(null, results.ops[0].id);
    });
  });
};

/**
 * Delete users
 * @param {string} ids
 * @param {Function} cb
 */
module.exports.delete = (ids, cb) => {
  helpers.log("deleting users");

  var ids_arr = [];
  (ids + "").split(",").forEach(function(id) {
    ids_arr.push(~~id);
  });

  coll.deleteMany({ id: { $in: ids_arr } }, function(err, result) {
    if (err) {
      helpers.log(err);
      cb(err, null);
      return;
    }
    helpers.log("deleted users");
    cb(null, result.deletedCount);
  });
};
