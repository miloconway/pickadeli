var React = require('react');
var ReactFireMixin = require('reactfire');
var path = require('path');
var clientConfig = require('./client-config');
var userId = require('./user-id');

var App = React.createClass({
  mixins: [ ReactFireMixin ],
  componentWillMount: function() {
    this.bindAsArray(new Firebase(path.join(clientConfig.url, userId, 'rooms')), 'rooms');
  },
  render: function () {
    return (
      <div></div>
    );
  }
});
