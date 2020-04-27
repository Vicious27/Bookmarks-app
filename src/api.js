import store from './store';
import bookmark from './bookmarks';

const baseURL = 'https://thinkful-list-api.herokuapp.com/raul/bookmarks';

// fetches the api and provides errors based on response
function listApiFetch(...args) {
  let error;

  return fetch(...args)

    .then((response) => {
      if (!response.ok) {
        error = { code: response.status };
        store.setError(error);
        bookmark.renderError();

        if (!response.headers.get('content-type').includes('json')) {
          error.message = response.statusText;
          store.setError(error);
          bookmark.renderError();

          return Promise.reject(error);
        }
      }
      return response.json();
    })

    .then((data) => {
      if (error) {
        error.message = data.message;
        store.setError(error);
        bookmark.renderError();

        return Promise.reject(error);
      }
      return data;
    });
}

