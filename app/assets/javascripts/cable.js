// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.
//
//= require action_cable
//= require_self
//= require_tree ./channels

(function () {
  this.App || (this.App = {}); // eslint-disable-line no-unused-expressions

  App.cable = ActionCable.createConsumer(); // eslint-disable-line no-undef
}.call(this));
