"use strict";
const db = require("./db");
const xl = require("excel4node");
const settings = require("./settings");
const aws = require("./aws");

module.exports.generate = (columns, arg, filename, cb) => {
  if (arg.constructor == String) {
    query(arg, function(error, results, fields) {
      if (error) {
        console.log(error);
        cb(error, null);
        return;
      }

      createExcel(
        columns,
        { records: results, fields: fields },
        filename,
        function(error, results) {
          if (error) {
            console.log(error);
            cb(error, null);
            return;
          }

          cb(null, results);
        }
      );
    });
  } else {
    createExcel(columns, arg, filename, function(error, results) {
      if (error) {
        console.log(error);
        cb(error, null);
        return;
      }

      cb(null, results);
    });
  }
};

var query = (sql, cb) => {
  
  db.query(sql, function(error, results, fields) {
    
    if (error) {
      console.log(error);
      cb(error, null, null);
      return;
    }

    if (results.length == 0) {
      
      cb("Empty result", null, null);
      return;
    }

    console.log("Number of rows: " + results.length);
    cb(null, results, fields);
  });
};

var createExcel = (columns, data, filename, cb) => {
  
  if (!(data.records.constructor == Array)) {
    cb("Wrong records passed to createExcel()", null);
    return;
  }

  if (data.fields.length != columns.length) {
    
    cb("Columns quantity is not equal to columns quantity in data", null);
    return;
  }

  const wb = new xl.Workbook();

  var ws = wb.addWorksheet("Worksheet");

  var i = 0,
    j = 0;

  for (j in columns) ws.cell(1, parseInt(j) + 1).string(columns[j].label);
  for (i in data.records) {
    for (j in columns) {
      switch (columns[j].type) {
        case "string":
          ws
            .cell(parseInt(i) + 2, parseInt(j) + 1)
            .string(data.records[i][columns[j].alias].toString());
          break;
      }
    }
  }

  wb.writeToBuffer().then(function(buffer) {
    let args = { filename: filename + ".xlsx" };
    aws.putObject(args, buffer, function(error, results) {
      cb(error, results);
      if (!error) {
        
      }
    });
  });
};
