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
        const iso3 = countryCodes[data.countryCode] || '';
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

    // const handleSucess = (position) => {
    //   console.info(position);
    //   dispatch(requestLocationReady(position));
    // };

    // const handleError = (positionError) => {
    //   dispatch(requestLocationError(positionError));
    //   console.info(positionError);
    // };

    // if (locationProvider && locationProvider.getCurrentPosition) {
    //   locationProvider.getCurrentPosition(
    //     handleSucess,
    //     handleError,
    //     options
    //   );
    // } else {
    //   console.warn('Location provider not valid');
    // }
  }
);

export default {
  requestLocation,
  requestLocationInit,
  requestLocationReady,
  requestLocationError
};
