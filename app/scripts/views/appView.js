/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'medium',
    'templates',
    'app',
    'auth',
    'views/BaseView',
    'views/header'
], function ($, _, Backbone, Medium, JST, app, auth, BaseView, HeaderView) {
    'use strict';

    var AppViewView = BaseView.extend({
        template: JST['app/scripts/templates/appView.ejs'],

        className: '',

        events: {
          'click .welcome-intro .btn-facebook': auth.signInFb,
          'click .welcome-intro .btn-google': auth.signInGoogle
        },

        initialize: function () {
          var $html = $('html');

          app.ref.onAuth(function (authData) {
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
          app.ref.unauth();

          return false;
        },

        render: function() {
          var headerView = new HeaderView();

          this.registerChild(headerView);
          this.$el.html(this.template());

          this.$('#main-header').empty()
            .append(
              headerView.render().$el
            );

          new Medium({
            element: this.$('#editor')[0]
          });

          return this;
        }
    });

    return AppViewView;
});
