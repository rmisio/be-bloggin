define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/appView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<header id="main-header"></header>\n\n<div class="main-content">\n  <div class="welcome-intro">\n    <h1>Welcome to BeBloggin</h1>\n    <p>Sign in to write something cool.</p>\n    <div class="button-set">\n      <button class="btn-facebook">Sign in with Facebook</button>\n      <button class="btn-google">Sign in with Google</button>\n    </div>\n  </div>\n\n  <div id="editor-container"></div>\n\n  <div id="story-feed-container"></div>\n</div>\n\n<!--\n<h1>Testing the funky funky waters of antiquity</h1>\n<p>\n  Donec a bibendum purus. Cras ut tortor vel metus <a href="http://www.espn.com">commodo tristique</a> in vitae nisl. In commodo tellus sit amet aliquet porttitor. Sed id velit elementum, pharetra nunc vel, pellentesque libero. Nam elit justo, venenatis id facilisis at, fringilla at ex. Duis fermentum, orci id tristique pretium, lectus lectus porta est, vel semper nunc metus quis est. Proin ac molestie libero, eu luctus lorem. Aenean eu ligula et ipsum interdum posuere at sit amet urna. Curabitur tristique consequat malesuada. Integer ut est blandit, dignissim ipsum at, posuere eros. Nulla volutpat risus nec ante ultricies, sit amet gravida nisl ornare. Quisque aliquet sem vel odio accumsan accumsan. Nunc consequat gravida vehicula.\n</p>\n<p>This is best illustrated as so:</p>\n<ul>\n  <li>\n    Duis fermentum, orci id tristique pretium, lectus lectus porta est, vel semper nunc metus quis est. Proin ac molestie libero, eu luctus lorem. Aenean eu ligula et ipsum interdum posuere at sit amet urna\n  </li>\n  <li>\n    Praesent quis fermentum nisi, quis vehicula dolor.\n  </li>\n  <li>\n    Aliquam sit amet justo dictum, mattis quam vitae, imperdiet orci.\n  </li>\n  <li>\n    Morbi a dignissim leo, id aliquam ante. Nullam sodales aliquet semper.\n  </li>\n</ul>\n<p>\n  Praesent nec nunc at nulla consequat finibus at ac eros. Nam et odio tellus. Quisque justo arcu, tincidunt at tincidunt scelerisque, ultricies sed nibh. Aliquam sit amet justo dictum, mattis quam vitae, imperdiet orci. Nulla mi sapien, dignissim vel iaculis vitae, aliquam et nulla. Morbi a dignissim leo, id aliquam ante. Nullam sodales aliquet semper. Mauris ac nisi imperdiet est maximus lacinia. Aenean vehicula, mi ut sodales fringilla, mi velit volutpat ipsum, eget ornare mauris velit eu lectus. Aliquam lorem urna, viverra a suscipit eu, ultricies id massa.\n</p>\n\n -->\n';

}
return __p
};

this["JST"]["app/scripts/templates/header.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<a href="/" class="logo">BeBloggin</a>\n<nav>\n  ';
 if (newStories) { ;
__p += '\n  <button class="btn-new-stories">' +
((__t = ( newStories )) == null ? '' : __t) +
'</button>\n  ';
 } ;
__p += '\n  ';
 if (!user) { ;
__p += '\n  <!-- <a class="btn btn-login" href="/login">Sign In</a> -->\n  ';
 } else { ;
__p += '\n  <button class="btn-avatar">\n    <img src="' +
((__t = ( user.profileImageURL )) == null ? '' : __t) +
'" />\n  </button>\n  ';
 } ;
__p += '\n</nav>\n<div class="avatar-popover-content">\n  <ul class="list-unstyled">\n    <li>\n      <a href="/logout">Sign Out</a>\n    </li>\n  </ul>\n</div>\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/storyEditor.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if (user) { ;
__p += '\n<div class="user-tag-line">\n  <img class="avatar" src="' +
((__t = ( user.profileImageURL )) == null ? '' : __t) +
'" />\n  <span>' +
((__t = ( user.displayName )) == null ? '' : __t) +
'</span>\n</div>\n<div id="editor"></div>\n<div class="button-set">\n  <button class="btn-publish btn-highlight">Publish</button>\n</div>\n';
 } ;
__p += '\n';

}
return __p
};

this["JST"]["app/scripts/templates/storyFeedView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!-- <div class="spinner-loader">\n  Loading…\n</div> -->\n';
 for (var i=0; i < stories.length; i++) { ;
__p += '\n<article>\n  ' +
((__t = ( stories.at(i).get('body') )) == null ? '' : __t) +
'\n</article>\n';
 } ;
__p += '\n';

}
return __p
};

  return this["JST"];

});