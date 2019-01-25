import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const fetchAgricultureEmissionsInit = createAction(
  'fetchAgricultureEmissionsInit'
);
const fetchAgricultureEmissionsReady = createAction(
  'fetchAgricultureEmissionsReady'
);
const fetchAgricultureEmissionsFail = createAction(
  'fetchAgricultureEmissionsFail'
);

const BASE_URL = '/api/v1/data/agriculture_profile/emissions';

const fetchAgricultureEmissions = createThunkAction(
  'fetchAgricultureEmissions',
  isoCode3 => (dispatch, state) => {
    const { agricultureEmissions } = state();
    const query = isoCode3 && `?iso_code3=${isoCode3}`;
    if (!agricultureEmissions.loading || query) {
      dispatch(fetchAgricultureEmissionsInit());
      fetch(`${BASE_URL}${query}`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
            dispatch(fetchAgricultureEmissionsReady(data));
          } else {
            dispatch(fetchAgricultureEmissionsReady([]));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchAgricultureEmissionsFail());
        });
    }
  }
);

export default {
  fetchAgricultureEmissions,
  fetchAgricultureEmissionsInit,
  fetchAgricultureEmissionsReady,
  fetchAgricultureEmissionsFail
};
