import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const fetchMeatConsumptionInit = createAction('fetchMeatConsumptionInit');
const fetchMeatConsumptionReady = createAction('fetchMeatConsumptionReady');
const fetchMeatConsumptionFail = createAction('fetchMeatConsumptionFail');

const BASE_URL = '/api/v1/data/agriculture_profile/meat_consumptions';

const fetchMeatConsumption = createThunkAction(
  'fetchMeatConsumption',
  ({ country, year }) => (dispatch, state) => {
    const { meatConsumption } = state();
    const query = `?iso_code3=${country}&year=${year}`;
    if (country && year && !meatConsumption.loading) {
      dispatch(fetchMeatConsumptionInit());
      fetch(`${BASE_URL}${query}`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
            const d = data.data && data.data[0];
            const parsedData = { data: d, meta: data.meta };
            dispatch(fetchMeatConsumptionReady(parsedData));
          } else {
            dispatch(fetchMeatConsumptionReady([]));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchMeatConsumptionFail());
        });
    }
  }
);

export default {
  fetchMeatConsumption,
  fetchMeatConsumptionInit,
  fetchMeatConsumptionReady,
  fetchMeatConsumptionFail
};
