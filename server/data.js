//Global data object
var rooms = {
  '/classes/messages': [],
  '/classes/room1': [],
};

var uniqueId = 0;

//Access Methods/////////////////
//Status Code Handling
//Depending on type of request, take a URL, parse it, check for its existence in the rooms object.
//GET: nonexistence -> 404
//POST: -> 304 if lacking any properties, 200
//Properties:
//Message, username, room, createdAt,

//PUT: -> 400 (bad request, hey don't do that)

var getStatusCode = function(request) {
  var method = request.method;

  //MAY HAVE TO EXTRACT SUBSTRING
  var url = request.url;
  // console.log(url)

  //If GET and URL is not found in rooms, return 404

  if (method === "POST") {
    //NOT SURE IF .data HERE IS RIGHT

    var message = typeof request._postData === 'string' ?
      JSON.parse(request._postData) :
      request._postData;

    console.log("PRE CRASH");
    if (!message) console.log("BODY2", request);
    message = message || JSON.parse(request.body);
    console.log("POST CRASH");

    //Bad input
    if (message.username && message.message) {
      return 201;
    } else {
      return 400;
    }
  }
  if (method === "GET") {
    //Room not found
    if (!rooms[url]) {
      return 404;
    } else {
      return 200;
    }
  }
  //Method not allowed
  return 405;
};

var getData = function(request) {
  if (request.method !== "GET") {
    return;
  } else {
    return rooms[request.url];
  }
};

var setData = function (request) {
  if (!rooms[request.url]) {
    rooms[request.url] = [];
  }

  rooms[request.url].push(request._postData);
};

exports.getStatusCode = getStatusCode;
exports.getData = getData;
exports.setData = setData;
