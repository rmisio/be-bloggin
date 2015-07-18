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

      this.url = new Firebase(app.fbBaseUrl + '/stories').limitToLast(250);
      Backbone.Firebase.Collection.prototype.constructor.apply(this, arguments);

      // monkey patch to account for broken inheritance, ugh!
      newCreate = this.create;
      this.create = function() {
        var args = origCreate.apply(this, arguments);

        if (!args[1].validationError) {
          return newCreate.apply(this, args);
        }
      }
    },

    create: function (model, options) {
      var title = ''
        , preview = ''
        , fields
        , $body
        , $wrappedBody
        , $title
        , $preview;

      options = options || {};
      options.invalid = typeof options.invalid === 'function' ?
        options.invalid : function() {};

      model = model || {};
      $body = $(model.body);

      if (!model.body || !$body.text().length) {
        options.validationError = 'The story must contain some text.'
        options.invalid.call(this, options.validationError);
      } else {
        $wrappedBody = $('<div/>').append($body);

        // TODO: should probably leave truncating to the views.

        // to find title, get the text of the first tag
        $wrappedBody
          .find('*')
          .each(function (i, el) {
            var $el = $(el);

            if ((title = $el.text()).length) {
              $title = $el;

              if (title.length > 100) {
                title = title.substring(0,100) + '...';
              }

              model.title = title;
              return false;
            }
        });

        // to create the preview, find the first p element
        $preview = $wrappedBody.find('p:first-of-type');
        if ($preview.length && $title[0] !== $preview[0] && (preview = $preview.text()).length) {
          model.preview = preview.length > 150 ?
            preview.substring(0, 150) + '...' :
              preview;
        } else {
          model.preview = '';
        }
      }

      return arguments;
    },

    initialize: function() {
    }
  });

  return StoriesCollection;
});
