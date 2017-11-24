import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const getIndicatorsTrendDataInit = createAction('IndicatorsTrendDataInit');
const getIndicatorsTrendDataReady = createAction('IndicatorsTrendDataReady');
const { ESP_API } = process.env;

const getIndicatorsTrendData = createThunkAction(
  'getIndicatorsTrendData',
  (locationId, scenarioId) => (dispatch, state) => {
    const { espIndicatorsTrend } = state();
    if (
      espIndicatorsTrend &&
      (!espIndicatorsTrend.data[scenarioId] ||
        isEmpty(espIndicatorsTrend.data[scenarioId]))
      // || isEmpty(espIndicatorsTrend.data[scenarioId][locationId])
    ) {
      dispatch(getIndicatorsTrendDataInit());
      fetch(
        `${ESP_API}/locations/${locationId}/time_series_values?scenario=${scenarioId}`
      )
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(
            getIndicatorsTrendDataReady({ locationId, scenarioId, data })
          );
        })
        .catch(error => {
          console.info(error);
          dispatch(getIndicatorsTrendDataReady({}));
        });
    }
  }
);

export default {
  getIndicatorsTrendData,
  getIndicatorsTrendDataInit,
  getIndicatorsTrendDataReady
};
