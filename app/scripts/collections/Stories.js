/*global define*/

define([
  'underscore',
  'backbone',
  'backbonefire',
  'app',
  'models/Story'
], function (_, Backbone, backbonefire, app, StoryModel) {
  'use strict';

  var StoriesCollection = Backbone.Firebase.Collection.extend({
    model: StoryModel,

    constructor: function() {
      this.url = app.fbBaseUrl + '/stories';
      Backbone.Firebase.Collection.prototype.constructor.apply(this, arguments);
    },

    initialize: function() {
    }
  });

  return StoriesCollection;
});
