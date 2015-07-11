/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'firebase',
  'backbonefire',
  'app',
  'models/Story'
], function ($, _, Backbone, Firebase, backbonefire, app, StoryModel) {
  'use strict';

  var StoriesCollection = Backbone.Firebase.Collection.extend({
    model: StoryModel,

    comparator: function (story) {
      return -story.get('createdAt');
    },

    constructor: function() {
      var origCreate = this.create
        , newCreate;

      this.url = new Firebase(app.fbBaseUrl + '/stories');
      Backbone.Firebase.Collection.prototype.constructor.apply(this, arguments);

      // monkey patch to account for broken inheritance, ugh!
      newCreate = this.create;
      this.create = function() {
        var args = origCreate.apply(this, arguments);

        console.log('---> ' + JSON.stringify(args) + ' <--');

        // if validations are successful, origCreate with
        // return nothing
        if (!args[1].validationError) {
          newCreate.apply(this, args);
        }
      }
    },

    create: function (model, options) {
      var title = ''
        , $body;

      console.log('Boom [' + $(model.body).text() + ']');

      options = options || {};
      options.invalid = typeof options.invalid === 'function' ?
        options.invalid : function() {};

      model = model || {};
      $body = $(model.body);

      if (!model.body || !$body.text().length) {
        options.validationError = 'The story must contain some text.'
        options.invalid.call(this, options.validationError);
      } else {
        $('<div/>').append($body)
          .find('*')
          .each(function (i, el) {
            if ((title = $(el).text()).length) {
              model.title = title.substring(0,300);
              return false;
            }
        });
      }

      return arguments;
    },

    initialize: function() {
    }
  });

  return StoriesCollection;
});
