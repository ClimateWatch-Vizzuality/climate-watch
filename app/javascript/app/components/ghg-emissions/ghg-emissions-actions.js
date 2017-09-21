import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';
import qs from 'query-string';

const fetchGhgEmissionsInit = createAction('fetchGhgEmissionsInit');
const fetchGhgEmissionsFail = createAction('fetchGhgEmissionsFail');

const fetchGhgEmissionsMetaReady = createAction('fetchGhgEmissionsMetaReady');
const fetchGhgEmissionsMeta = createThunkAction(
  'fetchGhgEmissionsMeta',
  () => (dispatch, state) => {
    const { ghgEmissions } = state();
    if (ghgEmissions && isEmpty(ghgEmissions.meta)) {
      dispatch(fetchGhgEmissionsInit());
      fetch('/api/v1/emissions/meta')
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(fetchGhgEmissionsMetaReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchGhgEmissionsFail());
        });
    }
  }
);

const fetchGhgEmissionsDataReady = createAction('fetchGhgEmissionsDataReady');
const fetchGhgEmissionsData = createThunkAction(
  'fetchGhgEmissionsData',
  filters => dispatch => {
    dispatch(fetchGhgEmissionsInit());
    fetch(`/api/v1/emissions${qs.stringify(filters)}`)
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(data => {
        dispatch(fetchGhgEmissionsDataReady(data));
      })
      .catch(error => {
        console.warn(error);
        dispatch(fetchGhgEmissionsFail());
      });
  }
);

export default {
  fetchGhgEmissionsMeta,
  fetchGhgEmissionsInit,
  fetchGhgEmissionsMetaReady,
  fetchGhgEmissionsFail,
  fetchGhgEmissionsData,
  fetchGhgEmissionsDataReady
};
