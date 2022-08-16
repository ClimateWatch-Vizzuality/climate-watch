import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import qs from 'query-string';
import sortBy from 'lodash/sortBy';
import { apiWithCache } from 'services/api';

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
    const promises = [
      apiWithCache
        .get(`/api/v1/emissions?${qs.stringify(filters)}`)
        .then(response => {
          if (response.data) return response.data;
          throw Error(response.statusText);
        }),
      apiWithCache
        .get(`/api/v1/quantifications?location=${filters.location}`)
        .then(response => {
          if (response.data) return response.data;
          throw Error(response.statusText);
        })
    ];

    Promise.all(promises)
      .then(data => {
        let quantifications;
        if (data[1].length) {
          quantifications = sortBy(data[1], 'year');
        }
        dispatch(
          fetchCountryGhgEmissionsDataReady({ data: data[0], quantifications })
        );
      })
      .catch(error => {
        console.warn(error);
        console.info('eee', error);
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
