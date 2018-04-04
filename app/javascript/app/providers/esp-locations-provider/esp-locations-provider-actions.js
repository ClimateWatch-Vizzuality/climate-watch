import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const getEspLocationsInit = createAction('getEspLocationsInit');
const getEspLocationsReady = createAction('getEspLocationsReady');
const getEspLocationsWithScenarioReady = createAction(
  'getEspLocationsWithScenarioReady'
);
const getEspLocationsFail = createAction('getEspLocationsFail');
const { ESP_API } = process.env;

const getEspLocations = createThunkAction(
  'getEspLocations',
  ({ withTimeSeries, scenarioId }) => (dispatch, state) => {
    const { espLocations } = state();
    if (
      (espLocations.data &&
        isEmpty(espLocations.data) &&
        !espLocations.loading) ||
      (scenarioId &&
        espLocations.scenarios &&
        !espLocations.scenarios[scenarioId]) ||
      espLocations.error
    ) {
      dispatch(getEspLocationsInit());
      const scenarioParam = scenarioId ? `?scenario=${scenarioId}` : '';
      const withTimeSeriesParam =
        withTimeSeries && !scenarioId ? '?time_series=true' : '';
      fetch(`${ESP_API}/locations${withTimeSeriesParam}${scenarioParam}`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
            if (scenarioId) {
              dispatch(getEspLocationsWithScenarioReady({ data, scenarioId }));
            } else {
              dispatch(getEspLocationsReady(data));
            }
          } else {
            dispatch(getEspLocationsReady({}));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(getEspLocationsFail());
        });
    }
  }
);

export default {
  getEspLocations,
  getEspLocationsInit,
  getEspLocationsReady,
  getEspLocationsWithScenarioReady,
  getEspLocationsFail
};
