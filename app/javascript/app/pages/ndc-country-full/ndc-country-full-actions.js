import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const fetchCountryNDCFullInit = createAction('fetchCountryNDCFullInit');
const fetchCountryNDCFullReady = createAction('fetchCountryNDCFullReady');
const fetchCountryNDCFullFailed = createAction('fetchCountryNDCFullFailed');

const fetchCountryNDCFull = createThunkAction(
  'fetchCountryNDCFull',
  iso => dispatch => {
    dispatch(fetchCountryNDCFullInit());
    fetch(`/api/v1/ndcs/${iso}/full`)
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
  fetchCountryNDCFullFailed
};
