/*  global $ */

import store from './store';
import api from './api';
import bookmarks from './bookmarks';

function main() {
  $(() => {
    $('body').before(`<div>${new Date()}</div>`);
  });

  api.getBookmarks()
    .then((books) => {
      books.forEach((book) => store.addBook(book));
      bookmarks.render();
      bookmarks.renderError();
    });
  bookmarks.render();
  bookmarks.renderError();
}

$(main);