const http = require('http');

const requestListener = (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    const { method, url } = req;
    if (url === '/') {
        if (method == 'GET') {
            res.statusCode = 200
            res.end('home');
        } else {
            res.statusCode = 404
            res.end('page not found')
        }
    } else if (url === '/about') {
        if (method === 'GET') {
            res.end('about');
        } else if (method === 'POST') {
            let body = [];

            req.on('data', (chunk) => {
                body.push(chunk);
            })

            req.on('end', () => {
                body = Buffer.concat(body).toString()
                res.statusCode = 201;
                const { name } = JSON.parse(body);
                res.end(`${name}`);
            })
        } else {
            res.statusCode = 404
            res.end('page not found');
        }
    } else {
        res.end('page not found')
    }
}

const server = http.createServer(requestListener);

const port = 3000;
const host = 'localhost';
server.listen(port, host, () => {
    console.log(`sever running on port ${port} `)
})