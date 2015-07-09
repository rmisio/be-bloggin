/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'app',
    'auth',
    'views/BaseView',
    'views/Header',
    'views/StoryEditor'
], function ($, _, Backbone, JST, app, auth, BaseView, HeaderView, StoryEditorView) {
    'use strict';

    var AppViewView = BaseView.extend({
        template: JST['app/scripts/templates/appView.ejs'],

        className: '',

        events: {
          'click .welcome-intro .btn-facebook': auth.signInFb,
          'click .welcome-intro .btn-google': auth.signInGoogle
        },

        initialize: function () {
          var $html = $('html')
            , self = this;

          app.ref.onAuth(function (authData) {
            if (self.headerView) {
              self.headerView.render();
            }

            if (self.storyEditorView) {
              self.storyEditorView.render();
            }

            if (authData) {
              $html.removeClass('user-logged-out')
                .addClass('user-logged-in');
            } else {
              $html.removeClass('user-logged-in')
                .addClass('user-logged-out');
            }
          });

          $html.on('click', '[href="/logout"]', this.onLogout);
        },

        onLogout: function (e) {
          console.log('logout request');
          app.ref.unauth();

          return false;
        },

        render: function() {
          this.headerView = new HeaderView();
          this.storyEditorView = new StoryEditorView();

          this.registerChild(this.headerView);
          this.registerChild(this.storyEditorView);
          this.$el.html(this.template());

          this.$('#main-header').append(
            this.headerView.render().el
          );

          this.$('#editor-container').append(
            this.storyEditorView.render().el
          );

          return this;
        }
    });

    return AppViewView;
});
