var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;

var beforeEach = lab.beforeEach;
var afterEach = lab.afterEach;
var before = lab.before;
var after = lab.after;
var describe = lab.experiment;
var it = lab.test;

var MockFirebase = require('mockfirebase').MockFirebase;
var AmpersandState = require('ampersand-state');
var proxyquire = require('proxyquire');

var MockModel = AmpersandState.extend({
  idAttribute: 'mockId'
});

describe('Firebase DAO', function () {

  before(function (done) {
    var self = this;
    var FirebaseDao = proxyquire('../lib/firebase-dao', {
      firebase: function (url) {
        self.testFirebase = new MockFirebase(url);
        return self.testFirebase;
      }
    });
    this.testDao = new FirebaseDao({
      modelClass: MockModel,
      name: 'mock'
    });
    done();
  });

  after(function (done) {
    delete this.testDao;
    delete this.testFirebase;
    done();
  });

  describe('#create', function () {
    beforeEach(function (done) {
      var self = this;
      this.testDao.create(function (err, newModel) {
        expect(err).to.not.exist();
        self.model = newModel;
        done();
      });
      self.testFirebase.flush();
      self.testFirebase.flush();
    });

    afterEach(function (done) {
      var self = this;
      this.testDao.remove(this.model, function (err) {
        expect(err).to.not.exist();
        delete self.model;
        done();
      });
      self.testFirebase.flush();
    });

    it('should make new model with id', function (done) {
      expect(this.model)
        .to.have.property('mockId').and
        .to.be.a('string');
      done();
    });

    it('should have some non-zero number of children', function (done) {
      expect(this.testDao.count()).to.be.above(0);
      done();
    });
  });
});
