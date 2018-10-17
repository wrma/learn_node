let server = require("./server.js");
let router = require("./router");
let requestHandlers = require("./requestHandler");

let handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
server.start(router.route,handle);