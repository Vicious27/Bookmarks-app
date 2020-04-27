/* global $ */
import store from './store';
import api from './api';

function render(bookId, expandedView) {
  renderError();

  if (store.addingBook) {
    $('main').html(generateAddBookmarkView());
    let view = 'addingBook';
    generateCodeBlock(view);
  }

  else if (store.filterBook !== 0 && !bookId) {
    let html = [generateInitialView(), generateFilteredResults(store.filterBook)].join('');
    $('main').html(html);
    let view = 'filterBook';
    generateCodeBlock(view);
  }

  else if (store.editBook) {
    let html = generateEditView(bookId);
    $('main').html(html);
    let view = 'editingBook';
    generateCodeBlock(view);
  }

  else if (expandedView !== undefined) {
    let html = generateExpandedView(bookId, expandedView);
    $(expandedView).html(html);
    let view = 'expandedBookView';
    generateCodeBlock(view);
  }

  else {
    let html = [generateInitialView(), generateBook()].join('');
    $('main').html(html);
    let view = 'initialView';
    generateCodeBlock(view);
  }
}

function renderError() {
  if (store.error.code) {
    $('div.error-container').html(`${store.error.message}`);
    let view = 'error';
    generateCodeBlock(view);
  }
  else {
    $('div.error-container').empty();
  }
}


