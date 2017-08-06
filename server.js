"use strict";
process.env.environment = "stage"; // dev, test, stage, prod
process.env.db = "mongodb"; // mongodb, mysql
process.env.limit_access = 1;
process.env.static_path = __dirname + "/community-app";

const mdb = require("./modules/models/mongo/db");
mdb.connect((err, db) => {
  const express = require("express");
  const http = require("http");
  const path = require("path");
  const app = express();
  const helmet = require("helmet");
  const routes = {
    static: require("./routes/static"),
    users: require("./routes/users"),
    translations: require("./routes/translations"),
    comments: require("./routes/comments"),
    dashboard: require("./routes/dashboard"),
    projects: require("./routes/projects"),
    languages: require("./routes/languages"),
    aws_s3: require("./routes/aws-s3")
  };

  app.use(helmet());

  if (process.env.environment == "stage" || process.env.environment == "prod") {
    app.use(express.static(process.env.static_path));

    app.use("/", routes.static);
  }

  if (process.env.environment == "dev" || process.env.environment == "test")
    // Add headers
    app.use(function(req, res, next) {
      // Website you wish to allow to connect
      res.setHeader("Access-Control-Allow-Origin", "*");
      // Request methods you wish to allow
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );

      // Request headers you wish to allow
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,content-type"
      );

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader("Access-Control-Allow-Credentials", true);

      // Pass to next layer of middleware
      next();
    });

  app.use("/api/users", routes.users);
  app.use("/api/translations", routes.translations);
  app.use("/api/comments", routes.comments);
  app.use("/api/dashboard", routes.dashboard);
  app.use("/api/projects", routes.projects);
  app.use("/api/languages", routes.languages);
  app.use("/api/aws-s3", routes.aws_s3);

  app.set("port", process.env.PORT || 3000);
  http.createServer(app).listen(app.get("port"), function() {
    console.log("Express server listening on port " + app.get("port"));
  });
});
