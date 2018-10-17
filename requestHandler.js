let exec = require('child_process').exec;
let queryString = require('querystring');
let fs = require('fs');
let formifable = require('formidable');

function start(response) {
    console.log("Request handler 'start' was called");

    let body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" '+
        'content="text/html; charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" '+
        'method="post">'+
        '<input type="file" name="upload">'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';
    // exec('ls -lah',(error,stdout,stderr) => {
    //     response.writeHead(200,{"Content-Type": "text/plain"});
    //     response.write(stdout);
    //     response.end();
    // })
    response.writeHead(200,{"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response,request) {
    console.log("Request handler 'upload' was called");
    // response.writeHead(200, {'Content-Type': 'text/plain'});
    // response.write(`You've sent ${queryString.parse(postData).text}`);
    // response.end();
    let form = new formifable.IncomingForm();
    console.log(`about to parse`);
    form.parse(request,(err,fields,files) => {
        console.log(`parsing done`)
        fs.renameSync(files.upload.path,`/tmp/test.png`);
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(`received image:<br/>`);
        response.write("<img src='/show' />");
        response.end();
    })
}

function show(response) {
    console.log(`Request handler 'show' was called.`);
    fs.readFile("/tmp/test.png","binary",(err,file) => {
        if (err){
            response.writeHead(500,{"Content-Type": "text/plain"});
            response.write(err);
            response.end();
        } else {
            response.writeHead(200,{"Content-Type": "image/png"});
            response.write(file,'binary');
            response.end();
        }
    })
}

exports.start = start;
exports.upload = upload;
exports.show = show;