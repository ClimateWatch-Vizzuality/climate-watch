import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const fetchSearchResultsInit = createAction('fetchSearchResultsInit');
const fetchSearchResultsReady = createAction('fetchSearchResultsReady');
const fetchSearchResultsFail = createAction('fetchSearchResultsFail');

const fetchSearchResults = createThunkAction(
  'fetchSearchResults',
  query => (dispatch, state) => {
    const { ndcs } = state();
    if (ndcs && isEmpty(ndcs.data)) {
      dispatch(fetchSearchResultsInit());
      fetch(`/api/v1/ndcs/full?query=${query}`)
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
