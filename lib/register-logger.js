var config = require('./config');

var registerLogger = function (server) {
  var options = {
    opsInterval: config.log.opsInterval,
    reporters: [{
      reporter: require('good-console'),
      args:[{ log: '*', request: '*' }]
    }]
  };

  server.pack.register({
    plugin: require('good'),
    options: options
  }, function (err) {
   if (err) {
    console.log(err);
    return;
   }
  });
};

module.exports = registerLogger;
