import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const fetchCountryNDCInit = createAction('fetchCountryNDCInit');
const fetchCountryNDCReady = createAction('fetchCountryNDCReady');

const fetchCountryNDC = createThunkAction(
  'fetchCountryNDC',
  iso => dispatch => {
    dispatch(fetchCountryNDCInit());
    fetch(`/api/v1/ndcs?location=${iso}&filter=summary`)
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(data => {
        dispatch(fetchCountryNDCReady(data));
      })
      .catch(error => {
        console.info(error);
      });
  }
);

export default {
  fetchCountryNDC,
  fetchCountryNDCInit,
  fetchCountryNDCReady
};
