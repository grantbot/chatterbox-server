//Global data object
var rooms = {
  messages: [],
  room1: []
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

  //NOT SURE IF .data HERE IS RIGHT
  var message = JSON.parse(request.data);

  //If GET and URL is not found in rooms, return 404


  if (method === "POST") {
    //Bad input
    if (message.username && message.text && message.roomname) {
      return 201;
    } else {
      return 400;
    }
  }

  if (method === "GET") {
    //Room not found
    if (!rooms.url) {
      return 404;
    } else {
      return 200;
    }
  }

  //Method not allowed
  return 405;

}



  username: app.username,
        text: app.$message.val(),
        roomname: app.roomname || 'lobby'
