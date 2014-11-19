var fs = require('fs');
var path = require("path");

var logFile = 'data-storage.json';

//Global data object
var serverPath = path.join(__dirname, logFile);
var rooms = {
  '/classes/messages': [{username: 'abc', message:'sup', objectId:-1}],
  '/classes/room1': [],
};

//Persistent message logging
var data = fs.readFileSync(serverPath).toString();
rooms = data !== "" ? JSON.parse(fs.readFileSync(serverPath) ) : rooms;

var uniqueId = 0;

var getGETStatusCode = function(url) {
  if (!rooms[url]) {
    return 404;
  } else {
    return 200;
  }
};

var getData = function(url) {
  return rooms[url];
};

var getPOSTStatusCode = function (dataObj) {
  if (dataObj.username && dataObj.message) {
    return 201;
  } else {
    return 400;
  }
};

var setData = function (dataObj, url) {
  var serverPath = path.join(__dirname, logFile)

  if (!rooms[url]) {
    rooms[url] = [];
  }
  dataObj.objectId = uniqueId++;
  rooms[url].push(dataObj);

  fs.writeFile(serverPath, JSON.stringify(rooms), function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
  });


};

exports.getGETStatusCode = getGETStatusCode;
exports.getPOSTStatusCode = getPOSTStatusCode;

exports.getData = getData;
exports.setData = setData;
