import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const fetchWorldMeatConsumptionInit = createAction(
  'fetchWorldMeatConsumptionInit'
);
const fetchWorldMeatConsumptionReady = createAction(
  'fetchWorldMeatConsumptionReady'
);
const fetchWorldMeatConsumptionFail = createAction(
  'fetchWorldMeatConsumptionFail'
);

const BASE_URL = '/api/v1/data/agriculture_profile/meat_consumptions';

const fetchWorldMeatConsumption = createThunkAction(
  'fetchWorldMeatConsumption',
  ({ year }) => (dispatch, state) => {
    const { meatWorldConsumption } = state();
    const query = `?iso_code3=WORLD&year=${year}`;
    if (year && !meatWorldConsumption.loading) {
      dispatch(fetchWorldMeatConsumptionInit());
      fetch(`${BASE_URL}${query}`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
            const d = data.data && data.data[0];
            const parsedData = { data: d || {}, meta: data.meta };
            dispatch(fetchWorldMeatConsumptionReady(parsedData));
          } else {
            dispatch(fetchWorldMeatConsumptionReady([]));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchWorldMeatConsumptionFail());
        });
    }
  }
);

export default {
  fetchWorldMeatConsumption,
  fetchWorldMeatConsumptionInit,
  fetchWorldMeatConsumptionReady,
  fetchWorldMeatConsumptionFail
};
