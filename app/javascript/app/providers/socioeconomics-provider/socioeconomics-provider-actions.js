import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const fetchSocioeconomicsInit = createAction('fetchSocioeconomicsInit');
const fetchSocioeconomicsReady = createAction('fetchSocioeconomicsReady');
const fetchSocioeconomicsFail = createAction('fetchSocioeconomicsFail');

const fetchSocioeconomics = createThunkAction(
  'fetchSocioeconomics',
  locations => (dispatch, state) => {
    const { socioeconomics } = state();
    const promises = [];
    const locationsWithPromise = [];
    const sanitizedLocations = [];
    locations.forEach(location => {
      if (location !== '') sanitizedLocations.push(location);
    });
    sanitizedLocations.forEach(iso => {
      if (
        socioeconomics.data &&
        isEmpty(socioeconomics.data[iso]) &&
        !socioeconomics.loading
      ) {
        promises.push(
          fetch(`/api/v1/locations/${iso}/socioeconomics/latest`).then(
            response => {
              if (response.ok) return response.json();
              throw Error(response.statusText);
            }
          )
        );
        locationsWithPromise.push(iso);
      }
      dispatch(fetchSocioeconomicsInit());
      Promise.all(promises)
        .then(response => {
          const locationData = {};
          locationsWithPromise.forEach((l, index) => {
            if (response[index]) {
              locationData[l] = response[index];
            }
          });
          dispatch(fetchSocioeconomicsReady(locationData));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchSocioeconomicsFail());
        });
    });
  }
);

export default {
  fetchSocioeconomics,
  fetchSocioeconomicsInit,
  fetchSocioeconomicsReady,
  fetchSocioeconomicsFail
};
