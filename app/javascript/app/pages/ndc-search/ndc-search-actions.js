import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const fetchSearchResultsInit = createAction('fetchSearchResultsInit');
const fetchSearchResultsReady = createAction('fetchSearchResultsReady');
const fetchSearchResultsFail = createAction('fetchSearchResultsFail');

const fetchSearchResults = createThunkAction(
  'fetchSearchResults',
  search => dispatch => {
    if (!isEmpty(search) && search.searchBy && search.query) {
      dispatch(fetchSearchResultsInit());
      fetch(
        `/api/v1/ndcs/text?${search.searchBy}=${encodeURIComponent(
          search.query
        )}`
      )
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(fetchSearchResultsReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchSearchResultsFail());
        });
    }
  }
);

export default {
  fetchSearchResults,
  fetchSearchResultsInit,
  fetchSearchResultsReady,
  fetchSearchResultsFail
};
