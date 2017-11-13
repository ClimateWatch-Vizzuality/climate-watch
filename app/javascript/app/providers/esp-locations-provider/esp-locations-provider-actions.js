import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const getEspLocationsInit = createAction('getEspLocationsInit');
const getEspLocationsReady = createAction('getEspLocationsReady');
const getEspLocationsFail = createAction('getEspLocationsFail');
const { ESP_API } = process.env;

const getEspLocations = createThunkAction(
  'getEspLocations',
  () => (dispatch, state) => {
    const { espLocations } = state();
    if (
      espLocations.data &&
      isEmpty(espLocations.data) &&
      !espLocations.loading
    ) {
      dispatch(getEspLocationsInit());
      fetch(`${ESP_API}/locations`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
            dispatch(getEspLocationsReady(data));
          } else {
            dispatch(getEspLocationsReady({}));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(getEspLocationsFail());
        });
    }
  }
);

export default {
  getEspLocations,
  getEspLocationsInit,
  getEspLocationsReady
};
