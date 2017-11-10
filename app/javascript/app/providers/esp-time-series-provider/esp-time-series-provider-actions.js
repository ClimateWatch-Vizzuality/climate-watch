import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const getESPTimeSeriesInit = createAction('getESPTimeSeriesInit');
const getESPTimeSeriesReady = createAction('getESPTimeSeriesReady');

const getESPTimeSeries = createThunkAction(
  'getESPTimeSeries',
  (location, scenario) => (dispatch, state) => {
    const { ESPTimeSeries } = state();
    if (
      ESPTimeSeries &&
      (isEmpty(ESPTimeSeries.data) || !ESPTimeSeries.data[location.value])
    ) {
      dispatch(getESPTimeSeriesInit());
      fetch(
        `https://emissionspathways.org/api/v1/time_series_values?location=${location.id}&scenario=${scenario}`
      )
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(getESPTimeSeriesReady(data));
        })
        .catch(error => {
          console.info(error);
        });
    }
  }
);

export default {
  getESPTimeSeries,
  getESPTimeSeriesInit,
  getESPTimeSeriesReady
};
