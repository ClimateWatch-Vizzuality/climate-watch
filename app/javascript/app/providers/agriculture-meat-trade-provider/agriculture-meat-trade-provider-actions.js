import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const fetchMeatTradeInit = createAction('fetchMeatTradeInit');
const fetchMeatTradeReady = createAction('fetchMeatTradeReady');
const fetchMeatTradeFail = createAction('fetchMeatTradeFail');

const BASE_URL = '/api/v1/data/agriculture_profile/meat_trades';

const fetchMeatTrade = createThunkAction(
  'fetchMeatTrade',
  ({ country, year }) => (dispatch, state) => {
    const { meatTrade } = state();
    const query = `?iso_code3=${country}&year=${year}`;
    if (country && year && !meatTrade.loading) {
      dispatch(fetchMeatTradeInit());
      fetch(`${BASE_URL}${query}`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
            const d = data.data && data.data[0];
            const parsedData = { data: d || {}, meta: data.meta };
            dispatch(fetchMeatTradeReady(parsedData));
          } else {
            dispatch(fetchMeatTradeReady([]));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchMeatTradeFail());
        });
    }
  }
);

export default {
  fetchMeatTrade,
  fetchMeatTradeInit,
  fetchMeatTradeReady,
  fetchMeatTradeFail
};
