let http = require('http');
let url = require('url');

function start (route,handle){
    http.createServer((request,response) => {
        let pathName = url.parse(request.url).pathname;
        let postData = '';
        console.log(`Request for ${pathName} received`);

        // request.setEncoding('utf8');

        // request.addListener('data',(postDataChunk) => {
        //     postData += postDataChunk;
        //     console.log(`Received POST data chunk ${postDataChunk} .`)
        // });
        // request.addListener('end',() => {
        //     route(handle,pathName,response,postData);
        // });

        route(handle,pathName,response,request);

        // http服务器收到请求后，向客户端发送http状态码和内容类型，在http主体中发送内容
        // response.writeHead(200, {'Content-Type': 'text/plain'});
        // response.write('Hello World');
        // response.end();
    }).listen(8888);
    console.log('Server has started');
}

exports.start = start;
