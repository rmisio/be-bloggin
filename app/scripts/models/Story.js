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
      console.log('must you always be in such need of constant validation?');
      // Backbone.Model.prototype.validate.apply(this, arguments);
    },

    save: function() {
      console.log('save the date');
      // Backbone.Model.prototype.save.apply(this, arguments);
    },

    parse: function(response, options)  {
      return response;
    }
  });

  return StoryModel;
});
