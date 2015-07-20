/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'moment',
  'app',
  'templates',
  'views/BaseView',
  'collections/Stories'
], function ($, _, Backbone, moment, app, JST, BaseView, StoriesCollection) {
  'use strict';

  var AppViewView = BaseView.extend({
      template: JST['app/scripts/templates/storyFeedView.ejs'],

      className: '',

      events: {
        'click .read-more': 'onReadMore'
      },

      initialize: function (options) {
        var self = this;

        if (!options.collection || !options.collection instanceof StoriesCollection) {
          throw new Error('Please provide a Stories collection.');
        }

        this.listenToOnce(this.collection, 'sync', function() {
          self.render();
        });

        // this.listenTo(this.collection, 'all', function(type) {
        //   console.log('hey-' + type);
        //   window['hey-' + type] = arguments;
        // });
      },

      getNewStoryCount: function() {
        return this.collection.length - this.storiesAtRender;
      },

      onReadMore: function() {
        alert('show full blog post');

        return false;
      },

      render: function() {
        this.$el.html(this.template({
          stories: this.collection,
          moment: moment
        }));

        this.storiesAtRender = this.collection.length;

        return this;
      }
  });

  return AppViewView;
});
