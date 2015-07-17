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
          'blur #editor, .btn-publish': 'onEditorBlur',
          'click .btn-publish': 'onPublish'
        },

        initialize: function() {
          this.$body = $('body');
        },

        onPublish: function() {
          this.trigger('publish', {
            data: {
              body: this.$editor.html()
            }
          });
        },

        isEditorEmpty: function() {
          var val = this.$editor.html();

          return !(val.length && val !== '<p><br></p>');
        },

        onEditorFocus: function() {
          this.placeholderOff();
        },

        onEditorBlur: function() {
          var self = this;

          if (this.isEditorEmpty()) {
            setTimeout(function () {
              var $focus = $(':focus');

              if (
                (!$focus.length ||
                  $.inArray(self.el, $focus.parents()) === -1) &&
                $focus[0] !== self.el
              ) {
                self.placeholderOn();
              }
            }, 0);
          }
        },

        placeholderOn: function() {
          this.$editor.empty();
          this.$editor.addClass('medium-editor-placeholder');
          this.$el.removeClass('placeholder-off');
        },

        placeholderOff: function() {
          this.$el.addClass('placeholder-off');
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
