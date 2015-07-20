/*global require*/
'use strict';

require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    firebase: {
      exports: 'Firebase'
    },
    bootstrap: {
      deps: [
        'jquery'
      ]
    },
    backbonefire: {
      deps: [
        'backbone', 'firebase'
      ]
    }
  },
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.min',
    firebase: '../bower_components/firebase/firebase',
    backbonefire: '../bower_components/backbonefire/dist/backbonefire',
    'medium-editor': '../bower_components/medium-editor/dist/js/medium-editor',
    'moment': '../bower_components/moment/moment'
  }
});

require([
  'jquery',
  'backbone',
  'firebase',
  'backbonefire',
  'bootstrap',
  'app',
  'auth',
  'routes/app',
  'views/AppView'
], function ($, Backbone, Firebase, backbonefire, bootstrap, app, auth, AppRouter, AppView) {
  if (!window.config || !window.config.fbBaseUrl) {
    throw new Error('Please provide a fbBaseUrl attribute on window.config.');
  } else {
    app.config = window.config;
  }

  app.router = new AppRouter();
  app.eventEmitter = _.extend({}, Backbone.Events);
  auth.init();
  app.appView = new AppView().attach($('#main'));

  Backbone.history.start({ pushState: true });
});
