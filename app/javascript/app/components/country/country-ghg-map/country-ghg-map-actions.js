import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import qs from 'query-string';

const fetchGhgEmissionsMapInit = createAction('fetchGhgEmissionsMapInit');
const fetchGhgEmissionsMapFail = createAction('fetchGhgEmissionsMapFail');

const fetchGhgEmissionsMapDataReady = createAction(
  'fetchGhgEmissionsMapDataReady'
);
const fetchGhgEmissionsMapData = createThunkAction(
  'fetchGhgEmissionsMapData',
  filters => dispatch => {
    dispatch(fetchGhgEmissionsMapInit());
    fetch(
      `https://www.climatewatchdata.org/api/v1/emissions?${qs.stringify(
        filters
      )}`
    )
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(data => {
        dispatch(fetchGhgEmissionsMapDataReady(data));
      })
      .catch(error => {
        console.warn(error);
        dispatch(fetchGhgEmissionsMapFail());
      });
  }
);

export default {
  fetchGhgEmissionsMapInit,
  fetchGhgEmissionsMapFail,
  fetchGhgEmissionsMapData,
  fetchGhgEmissionsMapDataReady
};
