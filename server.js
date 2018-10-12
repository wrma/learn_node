let http = require('http');
let url = require('url');

function start (route){
    http.createServer((request,response) => {
        let pathName = url.parse(request.url).pathname;
        console.log(`Request for ${pathName} received`);

        route(pathName);

        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write('Hello World');
        response.end();
    }).listen(8888);
    console.log('Server has started');
}

exports.start = start;
