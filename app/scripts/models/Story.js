/*global define*/

define([
  'underscore',
  'backbone',
  'firebase'
], function (_, Backbone, Firebase) {
  'use strict';

  var StoryModel = Backbone.Model.extend({
    initialize: function() {
    },

    defaults: {
      createdAt: Firebase.ServerValue.TIMESTAMP
    },

    validate: function(attrs, options) {
    },

    save: function() {
    },

    parse: function(response, options)  {
      return response;
    }
  });

  return StoryModel;
});
