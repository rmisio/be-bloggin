/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/BaseView',
  'collections/Stories'
], function ($, _, Backbone, JST, BaseView, StoriesCollection) {
  'use strict';

  var AppViewView = BaseView.extend({
      template: JST['app/scripts/templates/storyFeedView.ejs'],

      className: 'initial-syncing',

      events: {
      },

      initialize: function (options) {
        var self = this;

        if (!options.collection || !options.collection instanceof StoriesCollection) {
          throw new Error('Please provide a Stories collection.');
        }

        this.listenToOnce(this.collection, 'sync', function() {
          self.$el.removeClass('initial-syncing');
          self.render();

          self.listenTo(self.collection, 'add', function() {
            console.log('gotta adder');

            // this.newStories += 1;
            // this.$btnNewStories.text(
            //     this.newStories + ' new stor' + (this.newStories === 1 ? 'y' : 'ies')
            //   ).velocity('stop')
            //   .velocity('slideDown', { duration: 300 });

          });
        });

        window.moo = function() {
            self.newStories += 1;

            self.$newStoriesIndicator.find('button')
              .text(
                self.newStories + ' new stor' + (self.newStories === 1 ? 'y' : 'ies')
              );

            self.$newStoriesIndicator.velocity('stop', true)
              .velocity({ opacity: 1 }, {
                duration: 500
              }).velocity({ opacity: 0 }, {
                delay: 2000,
                duration: 1000
              });
        }

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
        this.$newStoriesIndicator = this.$('.new-stories-indicator');

        return this;
      }
  });

  return AppViewView;
});
