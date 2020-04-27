/* global $ */
import api from './api.js';
import bookmark from './bookmarks.js';
import store from './store.js';

function main() {


  api.getBookmarks()
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      bookmark.render();
      bookmark.renderError();
    });
  bookmark.render();
  bookmark.renderError();
}

$(main); 