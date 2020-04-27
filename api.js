import store from './store';
import bookmarks from './bookmarks';

const baseURL = 'https://thinkful-list-api.herokuapp.com/raul/bookmarks';

// fetches the api and provides errors based on response
function listApiFetch(...args) {
  let error;

  return fetch(...args)

    .then((response) => {
      if (!response.ok) {
        error = { code: response.status };
        store.setError(error);
        bookmarks.renderError();

        if (!response.headers.get('content-type').includes('json')) {
          error.message = response.statusText;
          store.setError(error);
          bookmarks.renderError();

          return Promise.reject(error);
        }
      }
      return response.json();
    })

    .then((data) => {
      if (error) {
        error.message = data.message;
        store.setError(error);
        bookmarks.renderError();

        return Promise.reject(error);
      }
      return data;
    });

}

//gets all bookmarks, and CRUD functions
function getBookmarks() {
  return listApiFetch(`${baseURL}`);
}

function createBookmark(myBookData) {
  return listApiFetch(`${baseURL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: myBookData
  });
}

function deleteBookmark(bookId) {
  return listApiFetch(`${baseURL}/${bookId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

function updateBookmark(bookId, newBookData) {
  return listApiFetch(`${baseURL}/${bookId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newBookData
  });
}

export default {
  getBookmarks,
  createBookmark,
  deleteBookmark,
  updateBookmark
};

