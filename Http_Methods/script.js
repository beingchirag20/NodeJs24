const http = require('http');
const fs = require('fs')
const url = require('url');

const myServer = http.createServer((req, res) => {
    if(req.url === "/favicon.ico") return res.end(); 
    const log = `${Date.now()}:${req.method}  ${req.url} New Req Received\n`;
    const myurl = url.parse(req.url);

    fs.appendFile('log.txt', log , (err, data) => {
        switch(req.url){
            case'/':res.end('Home Page')
            break
            case'/about':res.end('Chirag Rane')
            break
            default:
                res.end('404 Not Found')
        }
    });
});
myServer.listen(8000, () => console.log("Server Started"))