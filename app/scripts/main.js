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
    bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',
    firebase: '../bower_components/firebase/firebase',
    backbonefire: '../bower_components/backbonefire/dist/backbonefire',
    'medium-editor': '../bower_components/medium-editor/dist/js/medium-editor',
    'velocity': '../bower_components/velocity/velocity'
  }
});

require([
  'jquery',
  'backbone',
  'firebase',
  'backbonefire',
  'bootstrap',
  'velocity',
  'app',
  'auth',
  'routes/app',
  'views/AppView'
], function ($, Backbone, Firebase, backbonefire, bootstrap, velocity, app, auth, AppRouter, AppView) {
  // TODO: move into appView
  // prevent relative link clicks from requesting a new page
  // i.e. let our router handle them
  $(document).on('click', 'a:not([data-bypass])', function (evt) {
      var href = $(this).attr('href'),
          protocol = this.protocol + '//';

      // ignore absolute links
      if (href.slice(0, 4) === 'http') {
          return;
      }

      if (href.slice(protocol.length) !== protocol) {
        evt.preventDefault();
        app.router.navigate(href, true);
      }
  });

  app.router = new AppRouter();
  app.eventEmitter = _.extend({}, Backbone.Events);
  auth.init();
  app.appView = new AppView().attach($('#main'));

  Backbone.history.start({ pushState: true });
});
