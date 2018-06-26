import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const getEspTimeSeriesInit = createAction('getEspTimeSeriesInit');
const getEspLocationsFail = createAction('getEspLocationsFail');
const getEspTimeSeriesReady = createAction('getEspTimeSeriesReady');
const { ESP_API } = process.env;

const getEspTimeSeries = createThunkAction(
  'getEspTimeSeries',
  ({ location, model }) => (dispatch, state) => {
    const { espTimeSeries } = state();
    if (espTimeSeries && !espTimeSeries.loading) {
      dispatch(getEspTimeSeriesInit());
      const query = `location=${location}${model ? `&model=${model}` : ''}`;
      fetch(`${ESP_API}/time_series_values?${query}`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(getEspTimeSeriesReady(data));
        })
        .catch(error => {
          console.info(error);
          dispatch(getEspLocationsFail());
        });
    }
  }
);

export default {
  getEspTimeSeries,
  getEspTimeSeriesInit,
  getEspTimeSeriesReady
};
