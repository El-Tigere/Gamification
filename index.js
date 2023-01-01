const http = require('http');
const fs = require('fs');

const port = 8080;
const host = 'localhost';

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    content = fs.readFileSync('page\\index.html');
    res.write(content);
    res.end();
});

server.listen(port, host, () => {
    console.log(`server is running on port ${port}`);
});