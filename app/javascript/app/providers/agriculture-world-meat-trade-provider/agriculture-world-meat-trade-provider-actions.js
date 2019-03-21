import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const fetchWorldMeatTradeInit = createAction('fetchWorldMeatTradeInit');
const fetchWorldMeatTradeReady = createAction('fetchWorldMeatTradeReady');
const fetchWorldMeatTradeFail = createAction('fetchWorldMeatTradeFail');

const BASE_URL = '/api/v1/data/agriculture_profile/meat_trades';

const fetchWorldMeatTrade = createThunkAction(
  'fetchWorldMeatTrade',
  ({ year }) => (dispatch, state) => {
    const { meatWorldTrade } = state();
    const query = `?iso_code3=WORLD&year=${year}`;
    if (year && !meatWorldTrade.loading) {
      dispatch(fetchWorldMeatTradeInit());
      fetch(`${BASE_URL}${query}`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
            const d = data.data && data.data[0];
            const parsedData = { data: d || {}, meta: data.meta };
            dispatch(fetchWorldMeatTradeReady(parsedData));
          } else {
            dispatch(fetchWorldMeatTradeReady([]));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchWorldMeatTradeFail());
        });
    }
  }
);

export default {
  fetchWorldMeatTrade,
  fetchWorldMeatTradeInit,
  fetchWorldMeatTradeReady,
  fetchWorldMeatTradeFail
};
