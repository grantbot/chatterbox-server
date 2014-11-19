/* Import node's http module: */
var http = require("http");
var fs = require("fs");
var path = require("path");
var requestHandler = require("./request-handler.js").requestHandler;
var url = require('url');

// Every server needs to listen on a port with a unique number. The
// standard port for HTTP servers is port 80, but that port is
// normally already claimed by another server and/or not accessible
// so we'll use a standard testing port like 3000, other common development
// ports are 8080 and 1337.
var port = 3000;

// For now, since you're running this server on your local machine,
// we'll have it listen on the IP address 127.0.0.1, which is a
// special address that always refers to localhost.
var ip = "127.0.0.1";



// We use node's http module to create a server.
//
// The function we pass to http.createServer will be used to handle all
// incoming requests.
//
// After creating the server, we will tell it to listen on the given port and IP. */


var sendFile = function(filePath, fileType) {
  return function(req, res) {
    var serverPath = path.join(__dirname, filePath);
    fileType = fileType || 'text/html';

    fs.readFile(serverPath, function(err, data){
      res.writeHead(200, fileType);
      res.end(data);
    });
  };
};

var router = {
  '/': requestHandler,
  '/client': sendFile('/../client/index.html'),
  '/bower_components/jquery/jquery.min.js': sendFile('/../client/bower_components/jquery/jquery.min.js'),
  '/bower_components/underscore/underscore-min.js': sendFile('/../client/bower_components/underscore/underscore-min.js'),
  '/env/config.js': sendFile('/../client/env/config.js'),
  '/scripts/app.js': sendFile('/../client/scripts/app.js'),
  '/images/spiffygif_46x46.gif': sendFile('/../client/images/spiffygif_46x46.gif'),
  '/styles/styles.css': sendFile('/../client/styles/styles.css', 'text/css'),
  '/bower_components/underscore/underscore-min.map': sendFile('/../client/bower_components/underscore/underscore-min.map')
};

var server = http.createServer(function(req, res) {
  var URL = url.parse(req.url);
  // console.log('SERVING URL', req.url);

  if (URL.pathname === '/client' && URL.query !== null) {
    router['/client'](req, res);
  }
  else if (router[req.url] ) {
    router[req.url](req, res);
  } else {
    requestHandler(req, res);
  }
});

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.

