/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/


var getGETStatusCode = require('./data.js').getGETStatusCode;
var getPOSTStatusCode = require('./data.js').getPOSTStatusCode;

var getData = require('./data.js').getData;
var setData = require('./data.js').setData;

var requestHandler = function(request, response) {
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "json";

  if (request.method === "GET") {
    handleGETRequest(request, response, headers);
  } else if (request.method === "POST") {
    handlePOSTRequest(request, response, headers);
  } else {
    handleBadRequest(request, response, headers);
  }

};

var handleGETRequest = function(request, response, headers) {
  var statusCode = getGETStatusCode(request.url);
  response.writeHead(statusCode, headers);

  if (statusCode === 200) {
    //"results" key necessary
    response.end(JSON.stringify({"results": getData(request.url)}));
  } else {
    response.end(JSON.stringify({}));
  }
};

var handlePOSTRequest = function(request, response, headers) {
  request.on('data', function(data) {
    var dataObj = JSON.parse(data.toString());
    var statusCode = getPOSTStatusCode(dataObj);
    response.writeHead(statusCode, headers);

    if (statusCode === 201) {
      setData(dataObj, request.url);
    }

    response.end();
  });
};

var handleBadRequest = function(request, response, headers) {
  var statusCode = 405;
  response.writeHead(statusCode);

  response.end();
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;

