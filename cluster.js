const cluster = require("cluster");
const os = require("os");

var cpus = os.cpus();
if (cluster.isMaster) {
  cpus.forEach(() => {
    cluster.fork();
  });

  cluster.on("listening", (worker) => {
    console.log("cluster conectado " + worker.process.pid);
  });

  cluster.on("exit", (worker) => {
    console.log("cluster %d descontectado", worker.process.pid);
  });
} else {
  console.log("thred");
  require("./Source/app");
}
