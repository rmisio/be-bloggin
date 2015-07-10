/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'medium-editor',
    'auth',
    'templates'
], function ($, _, Backbone, MediumEditor, auth, JST) {
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
          var val = this.$editor.html();

          return !(val.length && val !== '<p><br></p>');
        },

        onEditorFocus: function() {
          this.$el.addClass('placeholder-off');
          console.log(this.$editor.html());
        },

        onEditorBlur: function() {
          if (this.isEditorEmpty()) {
            this.$el.removeClass('placeholder-off');
          }
        },

        render: function () {
          var user = auth.getUser();

          this.$el.html(this.template({
            user: user
          }));

          this.$editor = this.$('#editor');

          if (user) {
            this.editor = new MediumEditor(this.$editor[0], {
              placeholder: {
                text: 'Get your write on...'
              },
              toolbar: {
                buttons: ['bold', 'italic', 'underline', 'anchor', 'h1', 'h2', 'h3', 'quote']
              }
            });
          }

          return this;
        }
    });

    return StoryEditorView;
});
