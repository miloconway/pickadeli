/** @jsx React.DOM */
var React = require('react');  // Browserify!
 
var hello = React.createClass({  // Create a component, HelloMessage.
  render: function() {
    return <div>Hello {this.props.name}</div>;  // Display a property.
  }
});

module.exports = hello;
