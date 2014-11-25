var _ = require('lodash');
var uuid = require('uuid');
var store = require('store');
var request = require('superagent');

var storageKey = 'pickadeli';

var localInfo = store.get(storageKey);
var shouldPersist = false;

if (!_.isPlainObject(localInfo)) {
  localInfo = {};
  shouldPersist = true;
}

var id = localInfo.id;

if (!_.isString(id) || _.size(id) === 0) {
  localInfo.id = id = uuid.v4();
  shouldPersist = true;
}

if (shouldPersist) {
  store.set(storageKey, localInfo);
}

// register the user
console.log('requesting??')
request
  .post('/api/user/' + localInfo.id)
  .send({})
  .end(function (err, res) {
    console.log('registered user?');
  });

module.exports = localInfo.id;
