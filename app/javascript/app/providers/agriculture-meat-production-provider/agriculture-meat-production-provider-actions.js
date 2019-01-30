import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const fetchMeatProductionInit = createAction('fetchMeatProductionInit');
const fetchMeatProductionReady = createAction('fetchMeatProductionReady');
const fetchMeatProductionFail = createAction('fetchMeatProductionFail');

const BASE_URL = '/api/v1/data/agriculture_profile/meat_productions';

const fetchMeatProduction = createThunkAction(
  'fetchMeatProduction',
  ({ country, year }) => (dispatch, state) => {
    const { meatProduction } = state();
    const query = `?iso_code3=${country}&year=${year}`;
    if (country && year && !meatProduction.loading) {
      dispatch(fetchMeatProductionInit());
      fetch(`${BASE_URL}${query}`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
            const d = data.data && data.data[0];
            const parsedData = { data: d || {}, meta: data.meta };
            dispatch(fetchMeatProductionReady(parsedData));
          } else {
            dispatch(fetchMeatProductionReady([]));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchMeatProductionFail());
        });
    }
  }
);

export default {
  fetchMeatProduction,
  fetchMeatProductionInit,
  fetchMeatProductionReady,
  fetchMeatProductionFail
};
