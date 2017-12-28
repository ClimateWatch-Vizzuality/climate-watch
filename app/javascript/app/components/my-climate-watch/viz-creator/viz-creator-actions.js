import { createAction, createThunkAction } from 'redux-tools';

import find from 'lodash/find';
import { EPAPI } from 'services/api';
// import { flatMapVis } from './viz-creator-utils';

export const fetchDatasets = createThunkAction(
  'fetchDatasets',
  () => dispatch => {
    EPAPI.get('datasets', null, true).then(d => {
      dispatch(gotDatasets(d));
    });
  }
);

export const fetchLocations = createThunkAction(
  'fetchLocations',
  () => dispatch => {
    // REMOVE MOCK WHEN ESP ACCEPTS CORSS
    EPAPI.get('locations', 'time_series=true', true).then(d =>
      dispatch(gotLocations(d))
    );
  }
);

export const fetchVisualisations = createThunkAction(
  'fetchVisualisations',
  payload => (dispatch, getState) => {
    const state = getState();
    // const visualisations = flatMapVis(
    const visualisations = find(state.vizCreator.data, { id: payload })[
      'viz-types'
    ];
    dispatch(gotVisualisations(visualisations));
  }
);

export const fetchModels = createThunkAction(
  'fetchModels',
  countryId => dispatch => {
    EPAPI.get('models', `country=${countryId}&time_series=true`).then(d =>
      dispatch(gotModels(d))
    );
  }
);

export const fetchScenarios = createThunkAction(
  'fetchScenarios',
  modelId => dispatch => {
    EPAPI.get('scenarios', `model=${modelId}&time_series=true`).then(d =>
      dispatch(gotScenarios(d))
    );
  }
);

export const fetchIndicators = createThunkAction(
  'fetchIndicators',
  ({ location, scenarios }) => dispatch => {
    EPAPI.get(
      'indicators',
      `scenario=${scenarios
        .map(s => s.value)
        .join(',')}&location=${location.value}&time_series=true`
    ).then(d => {
      const categories = uniqueById(d.map(i => i.category));

      dispatch(gotCategories(categories));
      dispatch(gotIndicators(uniqueById(d)));
    });
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

export const fetchTimeseries = createThunkAction(
  'fetchTimeseries',
  ({ locations, indicators, scenarios }) => dispatch => {
    const flatScenarios = scenarios.map(s => s.value).join(',') || false;

    EPAPI.get(
      'time_series_values',
      `location=${locations}&scenario=${flatScenarios}&indicator=${indicators}`
    ).then(d => dispatch(gotTimeseries(d)));
  }
);

export const gotDatasets = createAction('gotDatasets');
export const selectDataset = createAction('selectDataset');

export const gotVisualisations = createAction('gotVisualisations');
export const selectVisualisation = createAction('selectVisualisation');

export const gotLocations = createAction('gotLocations');
export const selectLocation = createAction('selectLocation');

export const gotModels = createAction('gotModels');
export const selectModel = createAction('selectModel');

export const gotScenarios = createAction('gotScenarios');
export const selectScenario = createAction('selectScenario');

export const gotIndicators = createAction('gotIndicators');
export const selectIndicator = createAction('selectIndicator');

export const gotCategories = createAction('gotCategories');
export const selectCategory = createAction('selectCategory');

export const gotSubCategories = createAction('gotSubCategories');
export const selectSubCategory = createAction('selectSubCategory');

export const gotTimeseries = createAction('gotTimeseries');
