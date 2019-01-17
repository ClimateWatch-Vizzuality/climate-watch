import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const fetchAgricultureCountriesContextsInit = createAction(
  'fetchAgricultureCountriesContextsInit'
);
const fetchAgricultureCountriesContextsReady = createAction(
  'fetchAgricultureCountriesContextsReady'
);
const fetchAgricultureCountriesContextsFail = createAction(
  'fetchAgricultureCountriesContextsFail'
);

const BASE_URL = '/api/v1/data/agriculture_profile/country_contexts';

const fetchAgricultureCountriesContexts = createThunkAction(
  'fetchAgricultureCountriesContexts',
  (country, year) => (dispatch, state) => {
    console.log('inside fetch', country, year);
    const { agricultureCountriesContexts } = state();
    // const query = false ? `?location_id=${1}&year=${1993}` : `?location_id=${1}`;
    const query = false ? `?location_id=${1}&year=${1993}` : '';
    if (isEmpty(agricultureCountriesContexts.data) && !agricultureCountriesContexts.loading) {
      dispatch(fetchAgricultureCountriesContextsInit());
      fetch(`${BASE_URL}${query}`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
            dispatch(fetchAgricultureCountriesContextsReady(data));
          } else {
            dispatch(fetchAgricultureCountriesContextsReady([]));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchAgricultureCountriesContextsFail());
        });
    }
  }
);

export default {
  fetchAgricultureCountriesContexts,
  fetchAgricultureCountriesContextsInit,
  fetchAgricultureCountriesContextsReady,
  fetchAgricultureCountriesContextsFail
};
