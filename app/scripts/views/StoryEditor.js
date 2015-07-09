/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'medium',
    'auth',
    'templates'
], function ($, _, Backbone, Medium, auth, JST) {
    'use strict';

    var StoryEditorView = Backbone.View.extend({
        template: JST['app/scripts/templates/storyEditor.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {
          'focus #editor': 'onEditorFocus',
          'blur #editor': 'onEditorBlur'
        },

        initialize: function() {
        },

        isEditorEmpty: function() {
          var val = this.editor.value();

          return !(val.length && val !== '<p>&nbsp;</p>' && val !== '<p><br></p>');
        },

        onEditorFocus: function() {
          this.$el.addClass('editor-focus');
        },

        onEditorBlur: function() {
          this.$el.removeClass('editor-focus');
        },

        render: function () {
          var user = auth.getUser();

          this.$el.html(this.template({
            user: user
          }));

          if (user) {
            this.editor = new Medium({
              element: this.$('#editor')[0],
              placeholder: 'Get your write on here...',
              autoHR: false,
              mode: Medium.richMode
            });
          }

          return this;
        }
    });

    return StoryEditorView;
});
