import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

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
  () => (dispatch, state) => {
    const { agricultureCountriesContexts } = state();
    if (!agricultureCountriesContexts.loading) {
      dispatch(fetchAgricultureCountriesContextsInit());
      fetch(`${BASE_URL}`)
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
