/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/header'
], function ($, _, Backbone, JST, HeaderView) {
    'use strict';

    var AppViewView = Backbone.View.extend({
        template: JST['app/scripts/templates/appView.ejs'],

        el: '#main',

        className: '',

        events: {},

        initialize: function () {
          // this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
          new HeaderView().render();
          this.$el.html(this.template());

          return this;
        }
    });

    return AppViewView;
});
