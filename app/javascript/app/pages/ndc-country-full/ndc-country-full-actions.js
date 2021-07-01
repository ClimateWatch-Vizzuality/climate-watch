import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const fetchCountryNDCFullInit = createAction('fetchCountryNDCFullInit');
const fetchCountryNDCFullReady = createAction('fetchCountryNDCFullReady');
const fetchCountryNDCFullFailed = createAction('fetchCountryNDCFullFailed');
const clearCountryNDCFull = createAction('clearCountryNDCFull');

const fetchCountryNDCFull = createThunkAction(
  'fetchCountryNDCFull',
  ({ search = {}, iso }) => dispatch => {
    const url = search.searchBy
      ? `/api/v1/ndcs/${iso}/text?${search.searchBy}=${encodeURIComponent(
        search.query
      )}`
      : `/api/v1/ndcs/${iso}/text`;
    dispatch(fetchCountryNDCFullInit(iso));
    fetch(url)
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(data => {
        dispatch(fetchCountryNDCFullReady(data));
      })
      .catch(error => {
        dispatch(fetchCountryNDCFullFailed(iso));
        console.info(error);
      });
  }
);

export default {
  fetchCountryNDCFull,
  fetchCountryNDCFullInit,
  fetchCountryNDCFullReady,
  fetchCountryNDCFullFailed,
  clearCountryNDCFull
};
