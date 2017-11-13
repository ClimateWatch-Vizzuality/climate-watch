import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const getEspTimeSeriesInit = createAction('getEspTimeSeriesInit');
const getEspTimeSeriesReady = createAction('getEspTimeSeriesReady');

const getEspTimeSeries = createThunkAction(
  'getEspTimeSeries',
  (location, model, scenario) => (dispatch, state) => {
    const { espTimeSeries } = state();
    if (
      espTimeSeries &&
      isEmpty(espTimeSeries.data) &&
      !espTimeSeries.loading
    ) {
      dispatch(getEspTimeSeriesInit());
      const query = `location=${location}${model
        ? `&model=${model}`
        : ''}${scenario ? `&scenario=${scenario}` : ''}`;
      fetch(`https://emissionspathways.org/api/v1/time_series_values?${query}`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(getEspTimeSeriesReady(data));
        })
        .catch(error => {
          console.info(error);
        });
    }
  }
);

export default {
  getEspTimeSeries,
  getEspTimeSeriesInit,
  getEspTimeSeriesReady
};
