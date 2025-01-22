import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

import { apiWithCache } from 'services/api';

const getCountryEmissionsInit = createAction('getCountryEmissionsInit');
const getCountryEmissionsReady = createAction('getCountryEmissionsReady');
const getCountryEmissionsFail = createAction('getCountryEmissionsFail');

const getCountryEmissions = createThunkAction(
  'getCountryEmissions',
  () => dispatch => {
    dispatch(getCountryEmissionsInit());

    apiWithCache
      .get('/api/v1/data/ndc_content/country_emissions')
      .then(response => {
        dispatch(getCountryEmissionsReady(response.data));
      })
      .catch(error => {
        console.warn(error);
        dispatch(getCountryEmissionsFail());
      });
  }
);

export default {
  getCountryEmissions,
  getCountryEmissionsInit,
  getCountryEmissionsReady,
  getCountryEmissionsFail
};
