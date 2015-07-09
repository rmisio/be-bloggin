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

        events: {},

        initialize: function () {
          var self = this;

          this.on('attach', function() {
            this._attached = true;
            this.initPopover();
          });

          app.ref.onAuth(function (authData) {
            self.render();
          });
        },

        initPopover: function() {
          this.$('.btn-avatar').popover({
            content: this.$('.avatar-popover-content').html(),
            placement: 'auto bottom',
            trigger: 'focus',
            html: true
          });
        },

        getAvatarUrl: function() {
          var user = auth.getUser();

          if (user) {
            return user[user.provider]['profileImageURL'];
          }
        },

        render: function () {
          var self = this;

          this.$el.html(this.template({
            avatarUrl: this.getAvatarUrl() || ''
          }));

          if (this._attached) {
            this.initPopover();
          }

          return this;
        }
    });

    return HeaderView;
});
