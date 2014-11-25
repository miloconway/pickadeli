var AmpState = require('ampersand-state');

// represents a user
var User = AmpState.extend({
  props: {
    id: 'string'
  }
});

module.exports = User;
