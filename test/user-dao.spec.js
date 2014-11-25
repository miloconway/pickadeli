var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;

var beforeEach = lab.beforeEach;
var afterEach = lab.afterEach;
var before = lab.before;
var after = lab.after;
var describe = lab.experiment;
var it = lab.test;

var userDao = require('../lib/user-dao');

describe('User DAO', function () {
  describe('#create', function () {
    before(function (done) {
      var self = this;
      userDao.create(function (err, newUser) {
        expect(err).to.not.exist();
        self.user = newUser;
        done();
      });
    });

    after(function (done) {
      var self = this;
      userDao.remove(this.user, function (err) {
        expect(err).to.not.exist();
        delete self.user;
        done();
      });
    });

    it('should make new user with id', function (done) {
      expect(this.user)
        .to.have.property('id').and
        .to.be.a('string');
      done();
    });

    it('should have some non-zero number of children', function (done) {
      expect(userDao.count()).to.be.above(0);
      done();
    });
  });
});
