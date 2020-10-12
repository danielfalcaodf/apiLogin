var express = require("express");
var consign = require("consign");
var bodyParser = require("body-parser");

var morgan = require("morgan");
var logger = require("./services/logger");
module.exports = function() {
  var app = express();
  app.use(
    morgan("common", {
      stream: {
        write: (mensagem) => {
          logger.info(mensagem);
        },
      },
    })
  );
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  consign()
    .include("./Source/controllers")
    .then("./Source/services")
    .then("./Source/router")
    .into(app);
  return app;
};
