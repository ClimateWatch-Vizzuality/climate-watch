import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const fetchWorldMeatProductionInit = createAction(
  'fetchWorldMeatProductionInit'
);
const fetchWorldMeatProductionReady = createAction(
  'fetchWorldMeatProductionReady'
);
const fetchWorldMeatProductionFail = createAction(
  'fetchWorldMeatProductionFail'
);

const BASE_URL = '/api/v1/data/agriculture_profile/meat_productions';

const fetchWorldMeatProduction = createThunkAction(
  'fetchWorldMeatProduction',
  ({ year }) => (dispatch, state) => {
    const { meatWorldProduction } = state();
    const query = `?iso_code3=WORLD&year=${year}`;
    if (year && !meatWorldProduction.loading) {
      dispatch(fetchWorldMeatProductionInit());
      fetch(`${BASE_URL}${query}`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
            const d = data.data && data.data[0];
            const parsedData = { data: d || {}, meta: data.meta };
            dispatch(fetchWorldMeatProductionReady(parsedData));
          } else {
            dispatch(fetchWorldMeatProductionReady([]));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchWorldMeatProductionFail());
        });
    }
  }
);

export default {
  fetchWorldMeatProduction,
  fetchWorldMeatProductionInit,
  fetchWorldMeatProductionReady,
  fetchWorldMeatProductionFail
};
