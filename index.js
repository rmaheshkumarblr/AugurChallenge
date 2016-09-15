// Express Middleware -- http://expressjs.com/en/api.html
var express = require('express');
var app = express();
// Package to generate a uniqueID -- https://www.npmjs.com/package/shortid
var shortid = require('shortid');

// To serve static pages from the server --  https://expressjs.com/en/starter/static-files.html
app.use('/',express.static('public'));
app.use('/bower_components',express.static('bower_components'));



var ipToUniqueIDMapping = {}


app.get('/getUniqueID', function (req, res) {
  // Based on https://www.chromium.org/Home/chromium-security/client-identification-mechanisms
  // http://www.web-caching.com/mnot_tutorial/how.html#CACHE-CONTROL
  // HTML5 client-side storage mechanisms - Cached objects

  // console.log(req.ip);
  // console.log(req.headers);
  // console.log(req.root);

  if(! ( req.ip in ipToUniqueIDMapping ) )
  {
  	ipToUniqueIDMapping[req.ip] = shortid.generate(); 
  }

  console.log(ipToUniqueIDMapping)

  if (req.headers['if-modified-since']) 
  {
  	console.log('Not Modified')
	return res.status(304).end();
  }

  // https://stackoverflow.com/questions/1046966/whats-the-difference-between-cache-control-max-age-0-and-no-cache
  // We want to use cache but we want to check at each instance when the URL is hit. Hence we set max-age=0
  res.set({
  	'Cache-Control': 'max-age=0',
  	'Last-Modified': new Date(),
  })

  res.status(200).send(ipToUniqueIDMapping[req.ip]);  
  
});

app.get('/sendUniqueID/:uniqueID', function(req, res) {
  var uniqueID = req.params.uniqueID;
  console.log(uniqueID)
  return res.status(304).end();
});



app.listen(3000, '0.0.0.0', function () {
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
