var Firebase = require('firebase');
var config = require('./config');

var firebaseRef = new Firebase(config.firebase.url);

var rooms = {};

// get the room associated with the id
// TODO: options validation
rooms.getRoom = function (options) {
  var userId = options.userId;
  var roomId = options.roomId;
};

// generate a new room
// TODO: options validation
rooms.makeRoom = function (options) {
  var userId = options.userId;
  var room = {
    voters: {},
    name: 'A Nameless Room',
    places: {}
  };
  room.voters[userId] = true;
  room.owner = userId;

  var firebaseRooms = firebaseRef.child('rooms');

  return room;
};

module.exports = rooms;
