const http = require('http');
const fs = require('fs');

const port = 8080;
const host = 'localhost';

const pageMap = JSON.parse(fs.readFileSync('pageMap.json'));
const mimeTypes = JSON.parse(fs.readFileSync('mimeTypes.json'));

const server = http.createServer((req, res) => {
    
    // respond with 404 to all requests with special chars in the url (except / and . (but not ..))
    const url = (((req.url || '/').match(/^([\w\d/]\.?)+$/g) || [''])[0].toLowerCase());
    if(url == '') {
        res.writeHead(404);
        res.end();
        return;
    }
    
    // get the requested page name or the default page name
    let page = url;
    if(pageMap[page]) page = pageMap[page];
    if(!fs.existsSync('page' + page)) page = pageMap['default'];
    
    // get the mime type
    const pageType = mimeTypes[(page.match(/\..+$/g) || ['default'])[0]] || mimeTypes['default'];
    
    // respond with the page content
    res.writeHead(200, {'Content-Type': [pageType]});
    const content = fs.readFileSync('page' + page);
    res.write(content);
    res.end();
    
});

server.listen(port, host, () => {
    console.log(`server is running on port ${port}`);
});