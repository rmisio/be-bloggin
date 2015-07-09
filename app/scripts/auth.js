
define([
  'app'
], function (app) {
    'use strict';

    var ref
      , init
      , authData = null
      , signInOauth
      , signInFb
      , signInGoogle
      , getUser;

    init = function() {
      app.ref = new Firebase('https://bebloggin.firebaseio.com');

      app.ref.onAuth(function (data) {
        if (data) {
          console.log('login son');
          window.son = data;
          authData = data;
        } else {
          authData = null;
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

    getUser = function(options) {
      options = options || {};
      options.includeAuthWrapper =
        typeof options.includeAuthWrapper === 'undefined' ?
          false : true;

      if (!options.includeAuthWrapper && authData) {
        return authData[authData.provider];
      } else {
        return authData;
      }
    };

    return {
      init: init,
      signInFb: signInFb,
      signInGoogle: signInGoogle,
      getUser: getUser
    }
});
