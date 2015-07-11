/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'app',
  'templates',
  'views/BaseView',
  'collections/Stories'
], function ($, _, Backbone, app, JST, BaseView, StoriesCollection) {
  'use strict';

  var AppViewView = BaseView.extend({
      template: JST['app/scripts/templates/storyFeedView.ejs'],

      className: '',

      events: {
      },

      initialize: function (options) {
        var self = this;

        if (!options.collection || !options.collection instanceof StoriesCollection) {
          throw new Error('Please provide a Stories collection.');
        }

        this.listenToOnce(this.collection, 'sync', function() {
          self.render();

          self.listenTo(self.collection, 'add', function() {
            this.newStories += 1;
            app.eventEmitter.trigger('new-story', this.newStories);
          });
        });

        // this.listenTo(this.collection, 'all', function(type) {
        //   console.log('hey-' + type);
        //   window['hey-' + type] = arguments;
        // });
      },

      render: function() {
        this.$el.html(this.template({
          stories: this.collection
        }));

        this.newStories = 0;

        return this;
      }
  });

  return AppViewView;
});
