var User = require('./user');
var FirebaseDao = require('./firebase-dao');

var userDao = new FirebaseDao({
  modelClass: User,
  name: 'user'
});

module.exports = userDao;
