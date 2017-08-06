"use strict";
const mdb = require("./db");
const helpers = require("../../helpers");
const autoIncrement = require("mongodb-autoincrement");
const uuidv1 = require("uuid/v1");

const items_per_page = 50;

const model = function(coll_name) {
  let coll = mdb.db.collection(coll_name);
  let mysql_model = require("../sql/" + coll_name);
  /**
   * Gets list of docs
   * @param {Object} args
   * @param {number} args.page - Page
   * @param {number} [args.items_per_page] - Items per Page
   * @param {Object} args.conditions - Query Object
   * @param {function} cb
   * @returns {void}
   */
  this.get = (args, cb) => {
    let query = typeof args.filter != "undefined" ? args.filter : {};
    var pagination = {
      page: ~~args.page,
      items_per_page:
        typeof args.items_per_page != "undefined"
          ? args.items_per_page
          : items_per_page
    };

    if(pagination.page <= 0) pagination.page = 1;

    helpers.log("getting docs from " + coll_name);
    coll
      .find(query)
      .sort({ text: 1 })
      .limit(pagination.items_per_page)
      .skip((pagination.page - 1) * items_per_page)
      .toArray(function(err, docs) {
        if (err) {
          helpers.log(err);
          cb(err, null);
          return;
        }

        helpers.log("got docs from " + coll_name);
        cb(null, { data: docs });
      });
  };

  /**
   * Gets doc by ID
   * @param {number} id
   * @param {function} cb
   * @returns {void}
   */
  this.getById = (id, cb) => {
    helpers.log("getting doc from " + coll_name);
    coll.findOne({ id: ~~id }, function(err, doc) {
      if (err) {
        helpers.log(err);
        cb(err, null);
        return;
      }

      helpers.log("got doc from " + coll_name);
      cb(null, { data: doc });
    });
  };

  /**
   * Create doc
   * @param {Object} doc
   * @param {Function} cb
   */
  this.create = (doc, cb) => {
    if (typeof doc._id != "undefined") delete doc._id;
    doc.uuid = uuidv1();
    helpers.log("creating doc in " + coll_name);

    autoIncrement.getNextSequence(mdb.db, this.coll_name, "id", function(
      err,
      autoIndex
    ) {
      if (~~doc.id == 0) doc.id = autoIndex;
      coll.insertOne(doc, function(err, results) {
        if (err) {
          helpers.log(err);
          cb(err, null);
          return;
        }
        helpers.log(
          "created doc in " + coll_name + ", id=" + results.ops[0].id
        );
        // if (
        //   (process.env.environment == "dev" ||
        //     process.env.environment == "test") &&
        //   process.env.db == "mongodb"
        // )
        //   mysql_model.create(doc, function(a, b) {});
        cb(null, results.ops[0].id);
      });
    });
  };

  /**
   * Update doc
   * @param {Object} doc
   * @param {Function} cb
   */
  this.update = (doc, cb) => {
    if (typeof doc._id != "undefined") delete doc._id;
    helpers.log("updating doc in " + coll_name + ", id=" + doc.id);
    coll.updateOne({ id: ~~doc.id }, { $set: doc }, null, function(
      err,
      result
    ) {
      if (err) {
        helpers.log(err);
        cb(err, null);
        return;
      }
      helpers.log("updated doc in " + coll_name + ", id=" + doc.id);
      // if (
      //   (process.env.environment == "dev" ||
      //     process.env.environment == "test") &&
      //   process.env.db == "mongodb"
      // )
      //   mysql_model.update(doc, function(a, b) {});
      cb(null, "success");
    });
  };

  /**
   * Delete docs
   * @param {string} ids
   * @param {Function} cb
   */
  this.delete = (ids, cb) => {
    helpers.log("deleting docs from " + coll_name);

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
      helpers.log("deleted docs from " + coll_name);
      // if (
      //   (process.env.environment == "dev" ||
      //     process.env.environment == "test") &&
      //   process.env.db == "mongodb"
      // )
      //   mysql_model.delete(ids, function(a, b) {});
      cb(null, result.deletedCount);
    });
  };
};

module.exports = coll_name => {
  return new model(coll_name);
};
