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
    }
  },
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap'
  }
});

require([
  'jquery',
  'backbone',
  'app',
  'routes/app',
  'views/appView'
], function ($, Backbone, app, AppRouter, AppView) {
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
  new AppView().render();

  Backbone.history.start({ pushState: true });
});
