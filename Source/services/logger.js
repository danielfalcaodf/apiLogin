var winston = require("winston");
const fs = require("fs");
if (!fs.existsSync("Source/logs")) {
  fs.mkdirSync("Source/logs");
}
module.exports = new winston.createLogger({
  transports: [
    new winston.transports.File({
      level: "info",
      filename: "Source/logs/info.log",
      maxsize: 100000,
      maxFiles: 10,
    }),
  ],
});
