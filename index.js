// Express Middleware -- http://expressjs.com/en/api.html
var express = require('express');
var app = express();
// Package to generate a uniqueID -- https://www.npmjs.com/package/shortid
var shortid = require('shortid');

// To serve static pages from the server --  https://expressjs.com/en/starter/static-files.html
app.use('/',express.static('public'));
app.use('/bower_components',express.static('bower_components'));



var ipToUniqueIDMapping = {}
var uniqueIDToipMapping = {}

app.get('/getUniqueID', function (req, res) {
  // Based on https://www.chromium.org/Home/chromium-security/client-identification-mechanisms
  // http://www.web-caching.com/mnot_tutorial/how.html#CACHE-CONTROL
  // HTML5 client-side storage mechanisms - Cached objects

  // console.log(req.ip);
  // console.log(req.headers);
  // console.log(req.root);

  // Populating the IP as key and generating a new value for it, which is Unique 
  if(! ( req.ip in ipToUniqueIDMapping ) )
  {
  	ipToUniqueIDMapping[req.ip] = shortid.generate(); 
  }

  console.log(ipToUniqueIDMapping)
  console.log(uniqueIDToipMapping)

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

  // Populating the uniqueID as key and IP is the value
	if ( ! (req.params.uniqueID in uniqueIDToipMapping) )
	{
  		uniqueIDToipMapping[req.params.uniqueID] = req.ip;
  	}

  	// Case 1
  	// IP address changes but the UniqueID is the same
  	// We need to update the IP in the ipToUniqueIDMapping
  	// Find the key for which the value is the UniqueID see if the current requested IP is the same else remove that key and add new key
	
  	// https://stackoverflow.com/questions/9907419/javascript-object-get-key-by-value
  	// Objects have issue when used in NodeJS hence creating a function ( https://github.com/npm/npm/issues/11515 )
	function getKeyGivenValue( objectName, value ) 
	{
		for( var prop in objectName ) 
		{
    		if( objectName.hasOwnProperty( prop ) ) 
    		{
    		    if( objectName[ prop ] === value )
    		    {
    		             return prop;
    		    }
    		}
    	}
    }


	var ipInTheExistingDict = getKeyGivenValue(ipToUniqueIDMapping,req.params.uniqueID)
	if (  ipInTheExistingDict != req.ip )
	{
		delete ipToUniqueIDMapping[ipInTheExistingDict];
		ipToUniqueIDMapping[req.ip] = req.params.uniqueID 
	}

	// Case 2
	// Unique ID changes from the same IP (Must normally never happen so ignoring it)

	var uniqueID = req.params.uniqueID;
	console.log(uniqueID)
	return res.status(200).send(req.params.uniqueID);
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
