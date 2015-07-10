
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
      app.fbBaseUrl = 'https://bebloggin.firebaseio.com';
      app.ref = new Firebase(app.fbBaseUrl);

      app.ref.onAuth(function (data) {
        if (data) {
          authData = data;
        } else {
          authData = null;
        }
      });
    };

    signInOauth = function (type) {
      // TODO: return promise so callers can handle errors
      app.ref.authWithOAuthPopup(type, function(error, authData) {
        if (error) {
          console.log('Login Failed!', error);
        } else {
          // console.log('Authenticated successfully with payload:', authData);
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
