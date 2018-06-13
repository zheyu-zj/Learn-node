const http = require('http'),
    fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode) {
    if (!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('500 - Internal Error');
        } else {
            res.writeHead(responseCode, {'Content-Type': contentType});
            res.end(data)
        }
    });
}

http.createServer((req, res) => {
    //规范化URL，去掉查询字符串、可选的反斜杠，并把他变成小写
    let path = req.url.replace(/\?(?:\?.*)?$/, '').toLowerCase();
    console.log(path);
    switch (path) {
        case '/':
            serveStaticFile(res, '/public/home.html', 'text/html');
            break;
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html');
            break;
        case '/img/logo.jpg':
            serveStaticFile(res, '/public/img/logo.jpg', 'image/jpeg');
        default:
            serveStaticFile(res, '/public/404.html', 'text/html', 400);
            break;
    }
}).listen(3000);
console.log('Server started on localhost:3000;press Ctrl-C  to terminate....');