const http = require('http');

const port = 8080;
const host = 'localhost';

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('test');
    res.end();
});

server.listen(port, host, () => {
    console.log(`server is running on port ${port}`);
});