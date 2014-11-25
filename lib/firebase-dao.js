var Hoek = require('hoek');
var _ = require('lodash');
var Firebase = require('firebase');
var config = require('./config');
var logger = require('./logger');

var firebaseRef = new Firebase(config.firebase.url);

// a thin glue layer to translate from our models,
// represented as ampersand state, and the backend
// data storage - in this case firebase

// the constructor
var FirebaseDao = function (options) {
  this.options = options || {};
  Hoek.assert(_.isFunction(this.options.modelClass), 'should be given a model');
  Hoek.assert(_.isString(this.options.name), 'should be given a name');

  var self = this;
  this._fb = firebaseRef.child(this.options.name);
  this._fb.on('value', function (snapshot) {
    logger.debug('setting %s snapshot', self.options.name);
    self._fbSnapshot = snapshot;
  });
};

var proto = FirebaseDao.prototype;

// provides a new model
proto.create = function (callback) {
  var self = this;
  var model = new this.options.modelClass();
  var fbRef = null;
  var onCreate = function (fbErr) {
    if (fbErr) {
      callback(fbErr);
      return;
    }
    model[model.idAttribute] = fbRef.key();
    logger.info('create', { modelName: self.options.name, id: model.getId() });
    self.update(model, callback);
  };
  fbRef = this._fb.push(model.toJSON(), onCreate);
};

// get model
proto.retrieve = proto.get = function (id, callback) {
  Hoek.assert(id, 'given an id');
};

// update model
proto.update = function (model, callback) {
  this._modelHasId(model);

  var self = this;
  var attrsToLog = { id: model.getId() };
  var modelJson = model.toJSON();
  var onUpdate = function (err) {
    return callback(err, model);
  };
  this._fb
    .child(model.getId())
    .set(modelJson, this._genLogThenCallback('update', attrsToLog, onUpdate));
};

// remove model
proto.delete = proto.remove = function (model, callback) {
  this._modelHasId(model);

  var attrsToLog = { id: model.getId() };
  this._fb
    .child(model.getId())
    .remove(this._genLogThenCallback('remove', attrsToLog, callback));
};

proto.count = function () {
  if (!this._fbSnapshot) {
    logger.debug('%s snapshot not ready yet', this.options.name);
    return 0;
  }
  return this._fbSnapshot.numChildren();
};

proto._modelHasId = function (model) {
  var id = model && model.getId && model.getId();
  Hoek.assert(id, 'has id');
};

proto._genLogThenCallback = function (event, baseAttrs, callback) {
  return function () {
    var logAttrs = _.extend({
      modelName: this.options.name
    }, baseAttrs);
    logger.info(event, logAttrs);
    callback.apply(null, arguments);
  }.bind(this);
};

module.exports = FirebaseDao;
