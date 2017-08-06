"use strict";
const mdb = require("./db");
const helpers = require("../../helpers");
const autoIncrement = require("mongodb-autoincrement");
const uuidv1 = require("uuid/v1");
const coll_name = "translations";
const coll = mdb.db.collection(coll_name);
const translations = require("./model")("translations");
let comments = [];
const Classes = require('../../../classes');

module.exports.getNewOne = (args,cb) => {
  comments = [];
  
  translations.get({page:1},function(error,results){
    if(error) {cb(error,null);return}
    let comments_tree = [];
    for(let i in results.data){
      let tr = new Classes.Translation(results.data[i]);
      tr.comments = [];
      walkComments(results.data[i].comments,tr);
    }
    
    for(let i in comments)
      if(comments[i].status=='new' && args.ignore_uuids.indexOf(comments[i].uuid) == -1){
        
        cb(null,{"data":comments[i]});
        comments = [];
        return;
      }
    cb(new Error('Comment not found'),null)
  });
}

module.exports.update = (comment_arg,cb) => {
  let comment = new Classes.CommentExtended(comment_arg);

  let cur_comment = comment;
  while(typeof cur_comment.parent_comment != undefined && cur_comment.parent_comment != null){
    cur_comment = cur_comment.parent_comment;
    if (cur_comment.parent_translation != null) break;
  }

  translations.get({filter:{id:cur_comment.parent_translation.id}}, function(error,results){
    if(error) {cb(error,null);return}

    let translation = new Classes.Translation(results.data[0]);
    if(translation.comments.length == 0) {cb(new Error('Error'),null);return}

    updateTranslationObject(translation,0,comment);

    translations.update(translation,function(error,results){
      if(error) {cb(error,null);return}
      cb(null,"success");
    })
  })
}

let walkComments = (comments_tree,parent) => {
  if(comments_tree.length == 0) return;
  for(let i in comments_tree){
    let comment = new Classes.Comment(comments_tree[i])
    comment.comments = [];
    comment.parent_comment = null;
    comment.parent_translation = null;
    if(parent.constructor == Classes.Translation)
      comment.parent_translation = parent;
    if(parent.constructor == Classes.Comment)
      comment.parent_comment = parent;
    comments.push(comment);
    
    if(typeof comments_tree[i].comments != 'undefined' && comments_tree[i].comments.length > 0){
      walkComments(comments_tree[i].comments,comment);
    }
  }
}

let updateTranslationObject = (obj, index, comment) => {
  if (typeof obj.comments[index] == 'undefined')
    return;

  if (obj.comments[index].uuid == comment.uuid){
    comment.comments = obj.comments[index].comments;
    obj.comments[index] = new Classes.Comment(comment);
    return;
  }

  if(obj.comments[index].comments.length > 0){
    updateTranslationObject(obj.comments[index],0,comment);
  }
  updateTranslationObject(obj,++index,comment);
}
module.exports.updateTranslationObject = updateTranslationObject;