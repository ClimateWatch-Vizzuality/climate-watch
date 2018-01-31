import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

import countryCodes from 'data/country-codes';

const requestLocationInit = createAction('requestLocationInit');
const requestLocationReady = createAction('requestLocationReady');
const requestLocationError = createAction('requestLocationError');

const requestLocation = createThunkAction(
  'requestLocation',
  locationProvider => dispatch => {
    // eslint-disable-line
    dispatch(requestLocationInit());

    fetch(locationProvider)
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(data => {
        const iso3 = countryCodes[data.country_code] || '';
        const dataWithISO3 = {
          ...data,
          iso3
        };
        dispatch(requestLocationReady(dataWithISO3));
      })
      .catch(error => {
        dispatch(requestLocationError(error));
        console.info(error);
      });
  }
);

export default {
  requestLocation,
  requestLocationInit,
  requestLocationReady,
  requestLocationError
};
