

const bookmarks = [];
let addingBook = false;
let filterBook = 0;
let error = {};
let editBook = false;

// filter books
function ratingBookFilter(rating) {
  let filteredBooks = this.bookmarks.filter(book => book.rating >= rating);

  return filteredBooks;
}

// collapse and expanded views
function expandedView(bookId) {
  return this.bookmarks.find(book => book.bookId === bookId).expandedView = true;
}

function collapseView(bookId) {
  return this.bookmarks.find(book => book.bookId === bookId).expandedView = false;
}
// 
function findById(bookId) {
  return this.bookmarks.find(currentBook => currentBook.bookId === bookId);
}

function findAndDelete(bookId) {
  return this.bookmarks = this.bookmarks.filter(currentBook => currentBook.bookId !== bookId);
}

function findAndUpdateBook(bookId, newFormData) {
  const currentBook = this.findById(bookId);
  let obj = JSON.parse(newFormData);
  Object.assign(currentBook, obj);
}

function addBook(newBook) {
  !newBook.expanded;
  !newBook.editing;
  this.bookmarks.push(newBook);
}

function setError(error) {
  this.error = error;
}



export default {
  bookmarks,
  editBook,
  addingBook,
  filterBook,
  error,
  ratingBookFilter,
  expandedView,
  collapseView,
  findById,
  findAndDelete,
  addBook,
  findAndUpdateBook,
  setError
};










// const books = {
//   bookmarks: [
//     {
//       id: 'x56w',
//       title: 'Title 1',
//       rating: 3,
//       url: 'http://www.title1.com',
//       description: 'lorem ipsum dolor sit',
//       expanded: false
//     },
//     {
//       id: '6ffw',
//       title: 'Title 2',
//       rating: 5,
//       url: 'http://www.title2.com',
//       description: 'dolorum tempore deserunt',
//       expanded: false
//     }

//   ],
//   adding: false,
//   error: null,
//   filter: 0
// };