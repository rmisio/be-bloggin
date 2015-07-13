/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'auth',
    'templates',
    'views/BaseView'
], function ($, _, Backbone, app, auth, JST, BaseView) {
    'use strict';

    var HeaderView = BaseView.extend({
        template: JST['app/scripts/templates/header.ejs'],

        tagName: 'div',

        className: '',

        events: {
          'click .btn-new-stories': 'onBtnNewStoriesClick'
        },

        initialize: function () {
          var self = this;

          this.on('attach', function() {
            this._attached = true;
            this.initPopover();
          });

          this.newStories = 0;
        },

        initPopover: function() {
          this.$('.btn-avatar').popover({
            content: this.$('.avatar-popover-content').html(),
            placement: 'auto bottom',
            trigger: 'focus',
            html: true
          });
        },

        setNewStoryCount: function (count) {
          if ($.isNumeric(count)) {
            this.newStories = count;
            this.render();
          }
        },

        onBtnNewStoriesClick: function() {
          app.eventEmitter.trigger('header-btn-new-stories-click');
          this.newStories = 0;
          this.render();
        },

        render: function() {
          var self = this;

          this.$el.html(this.template({
            user: auth.getUser(),
            newStories: this.newStories
          }));

          if (this._attached) {
            this.initPopover();
          }

          return this;
        }
    });

    return HeaderView;
});
