
var config = {};

// for yelp API
config.yelp = {
  consumer_key: 'rlm-bHN4rJU7lmhq_AhsCg',
  consumer_secret: 'GcAt39iGZf4s5M1YBpq3Fpporjc',
  token: 'MAeeMz6IXEyOi_nRBTfwqOD9ELGs0i7R',
  token_secret: 'kYTJgE1rFnwoIrVGoIBCluJTGYQ'
};

// for server
config.server = {
  host: 'localhost',
  port: 3000
};

// for logging
config.log = {
  opsInterval: 15000
};

// firebase configuration
config.firebase = {
  url: 'https://pickadeli.firebaseio.com/',
  secret: 'YYACLJe3bVKSdzL0W6DBOHqYFVRAQliGfguGmX1d'
};

module.exports = config;
