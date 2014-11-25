var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;

var before = lab.before;
var after = lab.after;
var describe = lab.experiment;
var it = lab.test;

var logger = require('../lib/logger');

describe('logger', function () {
  it('should be able to log with info()', function (done) {
    expect(logger)
      .to.exist.and
      .to.have.property('info').and
        .to.be.an.instanceof(Function);
    done();
  });
});
