import find from 'lodash/find';
import { createAction } from 'redux-actions';
import { createThunkAction } from 'app/utils/redux';

import { groupDataByScenario } from 'utils/graphs';

const API = (endpoint, params) =>
  `https://www.emissionspathways.org/api/v1/${endpoint}${params ? `?${params}` : ''}`;
  // `/mocks/${endpoint}.json${params ? `?${params}` : ''}`;

export const gotDatasets = createAction('gotDatasets');
export const selectDataset = createAction('selectDataset');

export const gotLocations = createAction('gotLocations');
export const gotModels = createAction('gotModels');
export const gotScenarios = createAction('gotScenarios');
export const gotIndicators = createAction('gotIndicators');
export const gotCategories = createAction('gotCategories');
export const gotSubCategories = createAction('gotSubCategories');
export const gotTimeseries = createAction('gotTimeseries');

export const selectViz = createAction('selectViz');
export const selectFilter = createAction('selectFilter');

export const fetchDatasets = createThunkAction(
  'fetchDatasets',
  () => dispatch => {
    fetch('/mocks/datasets.json')
      .then(d => d.json())
      .then(d => dispatch(gotDatasets(d)));
  }
);

const getValue = (key, data) => data[key].selected.value;

export const fetchTimeseries = createThunkAction(
  'fetchTimeseries',
  (filters) => dispatch => {
    const location = getValue('locations', filters);
    const indicator = getValue('indicators', filters);
    const scenarios = filters.scenarios.selected.map(s => s.value).join(',');

    fetch(API('time_series_values', `location=${location}&scenario=${scenarios}&indicator=${indicator}`))
      .then(d => d.json())
      .then(d => dispatch(gotTimeseries(d)));
  }
);

export const fetchLocations = createThunkAction(
  'fetchLocations',
  () => dispatch => {
    fetch(API('locations'))
      .then(d => d.json())
      .then(d => dispatch(gotLocations(d)));
  }
);

export const fetchModels = createThunkAction(
  'fetchModels',
  countryId => dispatch => {
    fetch(API('models', `country=${countryId}`))
      .then(d => d.json())
      .then(d => dispatch(gotModels(d)));
  }
);

export const fetchScenarios = createThunkAction(
  'fetchScenarios',
  modelId => dispatch => {
    fetch(API('scenarios', `model=${modelId}`))
      .then(d => d.json())
      .then(d => dispatch(gotScenarios(d)));
  }
);

const uniqueById = data =>
  data.reduce(
    (res, current) =>
      (current &&
        (find(res, { id: current.id }) ? res : res.concat([current]))) ||
      res,
    []
  );

export const fetchIndicators = createThunkAction(
  'fetchIndicators',
  ({ location, scenarios }) => dispatch => {
    fetch(
      API(
        'indicators',
        `scenario=${scenarios
          .map(s => s.value)
          .join(',')}&location=${location.value}`
      )
    )
      .then(d => d.json())
      .then(d => {
        const categories = uniqueById(d.map(i => i.category));

        dispatch(gotCategories(categories));
        dispatch(gotIndicators(uniqueById(d)));
      });
  }
);
