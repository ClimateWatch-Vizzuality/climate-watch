import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';
import { apiWithCache } from 'services/api';

export const fetchIPCountryInit = createAction('fetchIPCountryInit');
export const fetchIPCountryReady = createAction('fetchIPCountryReady');
export const fetchIPCountryFail = createAction('fetchIPCountryFail');

export const fetchIPCountry = createThunkAction(
  'fetchIPCountry',
  () => (dispatch, state) => {
    const { lse } = state();
    if (lse && isEmpty(lse.data) && !lse.loading) {
      dispatch(fetchIPCountryInit());
      apiWithCache
        .get('//ip-country-endpoint') // Use endpoint for the country here
        .then(response => {
          if (response.data) return response.data;
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(fetchIPCountryReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchIPCountryFail());
        });
    }
  }
);

export default {
  fetchIPCountry,
  fetchIPCountryInit,
  fetchIPCountryReady,
  fetchIPCountryFail
};
