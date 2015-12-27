define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/appView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<header id="main-header"></header>\n\n<div class="main-content">\n  <div class="welcome-intro">\n    <h1>Welcome to BeBloggin</h1>\n    <p>Sign in to write something cool.</p>\n    <div class="button-set">\n      <button class="btn-facebook">Sign in with Facebook</button>\n      <button class="btn-google">Sign in with Google</button>\n    </div>\n  </div>\n\n  <div id="editor-container"></div>\n\n  <div id="story-feed-container"></div>\n\n  <a class="github-banner" href="https://github.com/rmisio/be-bloggin" target="_blank"></a>\n</div>';

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
'" />\n  <span class="display-name">' +
((__t = ( user.displayName )) == null ? '' : __t) +
'</span>\n  <span class="instructions">Make a text selection to see additional styling options.</span>\n</div>\n<div id="editor"></div>\n<div class="button-set">\n  <button class="btn-publish btn-highlight">Publish</button>\n</div>\n';
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

 for (var i=0; i < stories.length; i++) {
      var story = stories.at(i);
;
__p += '\n  <div class="story-preview">\n    <article>\n      <div class="user-tag-line">\n        <img class="avatar" src="' +
((__t = ( stories.at(i).get('user').profileImageURL )) == null ? '' : __t) +
'" />\n        <div>\n          <div class="display-name">' +
((__t = ( story.get('user').displayName )) == null ? '' : __t) +
'</div>\n          <div class="time-ago">' +
((__t = ( moment(story.get('createdAt')).fromNow() )) == null ? '' : __t) +
'</div>\n        </div>\n      </div>\n      <h2>' +
((__t = ( story.get('title') )) == null ? '' : __t) +
'</h2>\n      <p class="preview">\n        ' +
((__t = ( story.get('preview') )) == null ? '' : __t) +
'\n      </p>\n    </article>\n    <a href="#" class="read-more">Read more &#65515;</a>\n  </div>\n</a>\n';
 } ;
__p += '\n';

}
return __p
};

  return this["JST"];

});