import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const getEspLocationsInit = createAction('getEspLocationsInit');
const getEspLocationsReady = createAction('getEspLocationsReady');

const getEspLocations = createThunkAction(
  'getEspLocations',
  () => (dispatch, state) => {
    const { espLocations } = state();
    if (espLocations && isEmpty(espLocations.data)) {
      dispatch(getEspLocationsInit());
      fetch('https://emissionspathways.org/api/v1/locations')
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(getEspLocationsReady(data));
        })
        .catch(error => {
          console.info(error);
        });
    }
  }
);

export default {
  getEspLocations,
  getEspLocationsInit,
  getEspLocationsReady
};
