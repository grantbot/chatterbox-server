//Global data object
var rooms = {
  '/classes/messages': [],
  '/classes/room1': [],
};

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
  if (!rooms[url]) {
    rooms[url] = [];
  }
  rooms[url].push(dataObj);
};

exports.getGETStatusCode = getGETStatusCode;
exports.getPOSTStatusCode = getPOSTStatusCode;

exports.getData = getData;
exports.setData = setData;
