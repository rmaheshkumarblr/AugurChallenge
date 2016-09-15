// Express Middleware -- http://expressjs.com/en/api.html
var express = require('express');
var app = express();
// Package to generate a uniqueID -- https://www.npmjs.com/package/shortid
var shortid = require('shortid');

// To serve static pages from the server --  https://expressjs.com/en/starter/static-files.html
app.use('/',express.static('public'));
app.use('/bower_components',express.static('bower_components'));


app.get('/getUniqueID', function (req, res) {
  res.send(shortid.generate());
  console.log(shortid.generate());
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   console.log(req)
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
