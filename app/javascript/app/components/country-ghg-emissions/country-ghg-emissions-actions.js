import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import qs from 'query-string';

const fetchCountryGhgEmissionsInit = createAction(
  'fetchCountryGhgEmissionsInit'
);
const fetchCountryGhgEmissionsFail = createAction(
  'fetchCountryGhgEmissionsFail'
);

const fetchCountryGhgEmissionsDataReady = createAction(
  'fetchCountryGhgEmissionsDataReady'
);
const fetchCountryGhgEmissionsData = createThunkAction(
  'fetchCountryGhgEmissionsData',
  filters => dispatch => {
    dispatch(fetchCountryGhgEmissionsInit());
    fetch(`/api/v1/emissions?${qs.stringify(filters)}`)
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(data => {
        dispatch(fetchCountryGhgEmissionsDataReady(data));
      })
      .catch(error => {
        console.warn(error);
        dispatch(fetchCountryGhgEmissionsFail());
      });
  }
);

export default {
  fetchCountryGhgEmissionsInit,
  fetchCountryGhgEmissionsFail,
  fetchCountryGhgEmissionsData,
  fetchCountryGhgEmissionsDataReady
};
