let server = require("./server.js");
let router = require("./router");

server.start(router.route);