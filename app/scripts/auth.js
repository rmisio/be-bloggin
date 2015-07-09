
define([
  'app'
], function (app) {
    'use strict';

    var ref
      , init
      , user = null
      , signInOauth
      , signInFb
      , signInGoogle
      , getUser;

    init = function() {
      app.ref = new Firebase('https://bebloggin.firebaseio.com');

      app.ref.onAuth(function (authData) {
        if (authData) {
          console.log('login son');
          user = authData;
        } else {
          user = null;
        }
      });
    };

    signInOauth = function (type) {
      app.ref.authWithOAuthPopup(type, function(error, authData) {
        if (error) {
          console.log('Login Failed!', error);
        } else {
          console.log('Authenticated successfully with payload:', authData);
        }
      });
    };

    signInFb = function() {
      return signInOauth('facebook');
    };

    signInGoogle = function() {
      return signInOauth('google');
    };

    getUser = function() {
      return user;
    };

    return {
      init: init,
      signInFb: signInFb,
      signInGoogle: signInGoogle,
      getUser: getUser
    }
});
