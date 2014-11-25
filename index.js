var path = require('path');
var hapi = require('hapi');
var config = require('./lib/config');
var router = require('./lib/router');
var registerLogger = require('./lib/register-logger');

var server = new hapi.Server(config.server.host, config.server.port);

server.views({
  engines: {
    hbs: require('handlebars')
  },
  basePath: __dirname,
  path: './views',
  layoutPath: './views/layout',
  helpersPath: './views/helpers'
});

registerLogger(server);

router(server);

server.start(function () {
  server.log(['info'], 'Server running at: ' + server.info.uri);
});
