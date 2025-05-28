import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

import { apiWithCache } from 'services/api';

const getGlobalEmissionsInit = createAction('getGlobalEmissionsInit');
const getGlobalEmissionsReady = createAction('getGlobalEmissionsReady');
const getGlobalEmissionsFail = createAction('getGlobalEmissionsFail');

const getGlobalEmissions = createThunkAction(
  'getGlobalEmissions',
  () => dispatch => {
    dispatch(getGlobalEmissionsInit());

    apiWithCache
      .get('/api/v1/data/ndc_content/global_emissions')
      .then(response => {
        dispatch(getGlobalEmissionsReady(response.data?.data));
      })
      .catch(error => {
        console.warn(error);
        dispatch(getGlobalEmissionsFail());
      });
  }
);

export default {
  getGlobalEmissions,
  getGlobalEmissionsInit,
  getGlobalEmissionsReady,
  getGlobalEmissionsFail
};
