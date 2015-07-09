
define([
  'backbone'
], function (Backbone) {
    'use strict';

  var BaseView = Backbone.View.extend({
    constructor: function (options) {
      Backbone.View.prototype.constructor.apply(this, arguments);
      this._childViews = [];
    },

    registerChild: function (childView) {
      if (this._childViews.indexOf(childView) === -1) {
        this._childViews.push(childView);
        childView._parentView = this;
      }
    },

    unregisterChild: function (childView) {
      var index;

      if ((index = this._childViews.indexOf(childView)) !== -1) {
        this._childViews.splice(index, 1);
        childView._parentView = null;
      }
    },

    remove: function () {
      for (var i=0; i < this._childViews.length; i++) {
        this._childViews[i].remove();
      }

      this._parentView.unregisterChild(this);

      Backbone.View.prototype.remove.apply(this, arguments);
    },

    attach: function ($container, options) {
      if (!$container || !$container.length) {
        throw new Error('Provide a $container to attach the view into.');
      }

      options = options || {};
      options.render = typeof options.render === 'undefined' ?
        true : options.render;

      if (options.render) {
        $container.empty().append(this.render().$el);
      } else {
        $container.empty().append(this.$el);
      }

      for (var i=0; i < this._childViews.length; i++) {
        this._childViews[i].trigger('attach');
      }
    }
  });

  return BaseView;
});
