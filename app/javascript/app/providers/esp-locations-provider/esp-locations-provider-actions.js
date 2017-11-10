import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const getESPLocationsInit = createAction('getESPLocationsInit');
const getESPLocationsReady = createAction('getESPLocationsReady');

const getESPLocations = createThunkAction(
  'getESPLocations',
  () => (dispatch, state) => {
    const { ESPLocations } = state();
    if (ESPLocations && isEmpty(ESPLocations.data)) {
      dispatch(getESPLocationsInit());
      fetch('https://emissionspathways.org/api/v1/locations')
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(getESPLocationsReady(data));
        })
        .catch(error => {
          console.info(error);
        });
    }
  }
);

export default {
  getESPLocations,
  getESPLocationsInit,
  getESPLocationsReady
};
