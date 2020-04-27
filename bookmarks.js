/* eslint-disable quotes */
/* global $ */
import store from './store';
import api from './api';


//render and renderError functions, along with conditionals for all states

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
    let view = 'editBook';
    generateCodeBlock(view);
  }

  else if (expandedView !== undefined) {
    let html = generateExpandedView(bookId, expandedView);
    $(expandedView).html(html);
    let view = 'expandedView';
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


//========== GENERATION TEMPLATE FUNCTIONS==========//  

function generateAddBookmarkView() {
  return `<div class="error-container"></div>
    <div class="title-container">
      <h1>My Bookmarks</h1>
    </div>
    <div class="url-and-title">
    <form id="new-bookmark-form" action="#">
      <label for="name">Bookmark URL</label>
        <input type="url" id="new-bookmark-input" class="new-bookmark" name="url" placeholder="Add website url" required>
      <label for="name">Bookmark name</label>
        <input type="text" id="new-bookmark-title" class="new-bookmark" name="title" placeholder="Site Name" required>
        <select id="rating" name="site-rating">
        <option value="1">⭐+</option>
        <option value="2">⭐⭐+</option>
        <option value="3">⭐⭐⭐+</option>
        <option value="4">⭐⭐⭐⭐+</option>
        <option value="5">⭐⭐⭐⭐⭐</option>
    </div>
        </select>
      <div class="rescription-container">
        <input type="text" id="new-bookmark-description" class="new-bookmark" name="description" placeholder="Describe website!">
      </div>
        <button id="cancel-new-bookmark" type="reset">Cancel</button>
        <button type="submit" id="add-new-bookmark">Add</button>
      </form>`;
}


function generateBook(bookId) {
  const htmlArray = [];
  let bookArray = store.bookmarks;
  for (let i = 0; bookArray.length; i++) {
    htmlArray.push(`<li class="bookmark-data" data-bookId="${bookArray[i].bookId}"> 
    ${bookArray.title}
    <span class="star-rating">
    <form id="${bookArray[i].bookId}">
    ${generateBookRatings(bookArray[i].bookId)}
    </form><button id="delete-bookmark"></button>
    </span>
    </li>`);
  }
  return htmlArray.join(' ');
}


function generateFilteredResults(filterBook) {
  const htmlArray = [];
  let itemArray = store.ratingBookFilter(filterBook);
  for (let i = 0; i < itemArray.length; i++) {
    htmlArray.push(`<li class="bookmark-data"  data-item-id="${itemArray[i].bookId}">
    ${itemArray[i].title}
    <span class="star-rating"><form id="${itemArray[i].bookId}">
    ${generateBookRatings(itemArray[i].bookId)}
    </form><button id="delete-bookmark"></button>
    </span>
    </li>`);
  }
  return htmlArray.join(' ');
}


function generateExpandedView(bookId, expandedView) {
  let book = store.findById(bookId);

  if (book.expandedView === true) {
    store.collapseView(bookId);
    $(expandedView).find('.expanded-bookmark-data').remove();
    return `${book.title} 
    <span class="star-rating"><form id="${book.id}">
    ${generateBookRatings(bookId)}
    </form><button id="delete-bookmark"></button>
    </span>`;
  }
  else {
    store.expandedView(bookId);

    return `<li class="expanded-bookmark-data"  data-item-id="${book.id}">
      ${book.title}   
      <span class="star-rating"><form id="${book.id}">
      ${generateBookRatings(bookId)}
      </form></span>  
      <div class="description-container">
        Description: ${book.description} 
        URL: <a class="link" href ="${book.url}">Checkout this site</a></div>
      <button id="delete-bookmark"></button> 
      <button id="edit-bookmark"></button>
      </li>`;
  }
}


function generateBookRatings(bookId) {
  let array = [];
  let book = store.findById(bookId);
  let rating = [book.rating];

  for (let i = 0; i < 5; i++) {
    array.push(`<input type="checkbox" name="rating" value="${i}"
    ${rating > i ? 'checked' : ''}></input>`);
  }
  return array.join(' ');
}

function generateEditView(bookId) {
  let book = store.findById(bookId);
  return `
  <div class="error-container"></div>
    <div class="title-container">
      <h1>My Bookmarks</h1>
  </div>
  <div class="url-and-title">
  <form class="edit-bookmark-form" data-book-id="${book.id}" action="#">
      <label for="name">Bookmark URL</label>
      <input type="url" id="new-bookmark-input" class="edit-bookmark" name="url" value="${book.url}" 
      required>
      <label for="name">Bookmark name</label>
      <input type="text" id="new-bookmark-title" class="edit-bookmark" name="title" value="${book.title}" required>
      <select name="rating" class="rating-select">
        <input type="text" id="new-bookmark-title" class="new-bookmark" name="title" placeholder="Site Name" required>
        <select id="rating" name="site-rating">
        <option value="1">⭐+</option>
        <option value="2">⭐⭐+</option>
        <option value="3">⭐⭐⭐+</option>
        <option value="4">⭐⭐⭐⭐+</option>
        <option value="5">⭐⭐⭐⭐⭐</option>
    </div>
        </select>
      <div class="rescription-container">
        <input type="text" id="new-bookmark-description" class="new-bookmark" name="description" placeholder="Describe website!">
      </div>
        <button id="cancel-edit" type="reset">Cancel</button>
        <button type="submit" id="add-new-bookmark">Submit</button>
      </form>`;
}

function generateCodeBlock(view) {
  if (view === 'initial') {
    $('code').html(`'initial store state'
    let bookmarks = [];
    let addingBook = false;
    let error = {};
    let filterBook = 0;
    let editBook = false;
    `);
  }

  if (view === 'expandedView') {
    $('code').html(`'expanded view store state' 
    const bookmarks = [
      {
        id: 'x56w',
        title: 'Title 1'
        rating: 3,
        url: 'http://www.title.com',
        description: 'lorem ipsum dolor sit et kbar',
        expanded: true
      }
    ];
    let addingBook = flase;
    let error = null;
    let filterBook = 0;
    let editBook = false;
    `);
  }

  if (view === 'editBook') {
    $('code').html(`'edit bookmark view store state' 
    const bookmarks = [. . .];
    let addingBook = false;
    let error = null;
    let filterBook = 0;
    let editBook = true;
    `);
  }

  if (view === 'filterBook') {
    $('code').html(`'filter bookmark view store state' 
    const bookmarks = [. . .];
    let addingBook = false;
    let error = null;
    let filterBook = ${store.filterBook};
    let editBook = false;
    `);
  }

  if (view === 'error') {
    $('code').html(`'edit bookmark view store state'
    const bookmarks = [. . .];
    let addingBook = false;
    let error = ${store.error.message};
    let filterBook = 0;
    let editBook = false;
    `);
  }
}

function generateInitialView() {
  return `
  <div class='error-container></div>
  <div class="title-container">
    <h1>My Bookmarks</h1>
      <div class="title-button-container">
        <button class="new-bookmark-button" id="new-bookmark">New Bookmark 📘</button>
        <select name="Filtered By 🚩" class="filter-select">
        <option value="0">Minimum Rating</option>
        <option value="1">⭐+</option>
        <option value="2">⭐⭐+</option>
        <option value="3">⭐⭐⭐+</option>
        <option value="4">⭐⭐⭐⭐+</option>
        <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
      </div>
    </div>`;
}




//================== EVENT LISTENERS ====================//

function handleNewBookmark() {
  $('main').on('click', '#new-bookmark', event => {
    store.addingBook = true;
    render();
  });
}

function handleFilterSelect() {
  $('main').on('change', '.filter-select', event => {
    store.filterBook = $('.filter-select').val();
    render();
  });
}

function serializeJson(form) {
  const formData = new FormData(form);
  const obj = {};
  formData.forEach((val, name) => obj[name] = val);
  return JSON.stringify(obj);
}

function handleCreateBook() {
  $('main').on('submit', '#new-bookmark-form', event => {
    event.preventDefault();

    let formElement = document.querySelector("#new-bookmark-form");
    const myFormData = serializeJson(formElement);

    api.createBookmark(myFormData)
      .then((newBook) => {
        store.addBook(newBook);
        render();
      });
    store.addingBook = false;
  });
}

function handleDeleteBook() {
  $('main').on('click', '#delete-bookmark', event => {
    event.preventDefault();

    const bookId = getBookId(event.currentTarget);
    api.deleteBookmark(bookId)
      .then(() => {
        store.findAndDelete(bookId);
        render();
      });
  });
}

function handleCancelCreate() {
  $('main').on('click', '#cancel-new-bookmark', event => {
    event.preventDefault();
    store.addingBook = false;
    render();
  });
}

function handleCancelEdit() {
  $('main').on('click', '#cancel-edit', event => {
    event.preventDefault();

    store.editBook = false;
    render();
  });
}

function handleClickLink() {
  $('main').on('click', '.link', event => {
    event.preventDefault();

    let link = $(event.currentTarget);
    window.open(link.attr("href"), event.currentTarget);
  });
}

function handleSubmitEdit() {
  $('main').on('submit', '.edit-bookmark-form', event => {
    event.preventDefault();

    const bookId = $(event.currentTarget).data('book-id');
    let formElement = document.querySelector(".edit-bookmark-form");
    const newFormData = serializeJson(formElement);

    api.updateBookmark(bookId, newFormData)
      .then(() => {
        store.findAndUpdateBook(bookId, newFormData);
        render();
      });
    store.editBook = false;
  });
}

function handleExpandedView() {
  $('main').on('click', '.bookmark-data', event => {
    event.preventDefault();

    const bookId = getBookId(event.currentTarget);
    let book = event.currentTarget;
    render(bookId, book);
  });
}

function getBookId(book) {
  return $(book)
    .closest('.bookmark-data')
    .data('book-id');
}



//=============== BIND ALL EVENT LISTENERS=============//

function bindEventListeners() {
  handleNewBookmark();
  handleFilterSelect();
  handleCreateBook();
  handleDeleteBook();
  handleCancelCreate();
  handleClickLink();
  handleSubmitEdit();
  handleCancelEdit();
  handleExpandedView();
}

$(bindEventListeners);


export default {
  render,
  renderError,
  bindEventListeners
};