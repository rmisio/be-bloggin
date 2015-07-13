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
    'views/StoryEditor',
    'views/StoryFeedView',
    'collections/Stories'
], function ($, _, Backbone, JST, app, auth, BaseView, HeaderView, StoryEditorView, StoryFeedView, StoriesCollection) {
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

          this.listenTo(app.eventEmitter, 'header-btn-new-stories-click', function() {
            if (self.storyFeedView) {
              self.storyFeedView.render();
            }
          });
        },

        onLogout: function (e) {
          app.ref.unauth();

          return false;
        },

        render: function() {
          var self = this;

          // Todo: remove() child views if they exist.
          this.headerView = new HeaderView();

          this.storyEditorView = new StoryEditorView();
          this.listenTo(this.storyEditorView, 'publish', function (e) {
            var user = auth.getUser()
              , data;


            data = {
              body: e.data.body,
              user: {
                displayName: user.displayName,
                profileImageURL: user.profileImageURL
              }
            };

            self.lastPublished = data;
            self.storiesCollection.create(data, {
              invalid: function(error) {
                alert(error);
              },
              success: function() {
                self.storyEditorView.placeholderOn();
                self.storyFeedView.render();
              },
              error: function() {
                alert('So sorry. There was an error. Please try again.');
              }
            });
          });

          this.storiesCollection = new StoriesCollection();

          this.storyFeedView = new StoryFeedView({
            collection: this.storiesCollection
          });

          this.listenToOnce(this.storiesCollection, 'sync', function() {
            self.storyFeedView.render();

            self.listenTo(self.storiesCollection, 'add', function(model, collection, objects) {
              var count = 0;

              // If the added one is not the one the user just published,
              // we'll increment the new story count in the header. Otherwise,
              // we'll reset the count.
              if (!self.lastPublished || self.lastPublished.id !== model.id) {
                count = self.storyFeedView.getNewStoryCount();
              }

              self.headerView.setNewStoryCount(count);
            });
          });


          this.registerChild(this.headerView);
          this.registerChild(this.storyEditorView);
          this.$el.html(this.template());

          this.$('#main-header').append(
            this.headerView.render().el
          );

          this.$('#editor-container').append(
            this.storyEditorView.render().el
          );

          this.$('#story-feed-container').append(
            this.storyFeedView.el
          );

          return this;
        }
    });

    return AppViewView;
});
