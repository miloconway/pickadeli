// mounts hapi paths
var router = function (server) {
  server.log(['debug'], 'mounting routes...');
  // base view
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      var context = {
        title: 'Pick-A-Deli',
        company: 'Sneekers',
        year: '2014'
      };
      reply.view('index', context);
    }
  });
  // register a new user
  server.route({
    method: 'POST',
    path: '/api/user/{id}',
    handler: function (request, reply) {
      request.log(['log'], request.params);
      reply({});
    }
  });
  // serving static
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public',
        listing: true
      }
    }
  });
  server.log(['debug'], 'finished mounting routes');

  return;
};

module.exports = router;
