import find from 'lodash/find';
import { createAction } from 'redux-actions';
import { createThunkAction } from 'app/utils/redux';

const API = (endpoint, params) =>
  // `https://www.emissionspathways.org/api/v1/${endpoint}${params ? `?${params}` : ''}`;
  `/mocks/${endpoint}.json${params ? `?${params}` : ''}`;

export const gotDatasets = createAction('gotDatasets');
export const selectDataset = createAction('selectDataset');

export const gotLocations = createAction('gotLocations');
export const gotModels = createAction('gotModels');
export const gotScenarios = createAction('gotScenarios');
export const gotIndicators = createAction('gotIndicators');
export const gotCategories = createAction('gotCategories');
export const gotSubCategories = createAction('gotSubCategories');

export const selectViz = createAction('selectViz');
export const selectFilter = createAction('selectFilter');

export const fetchDatasets = createThunkAction(
  'fetchDatasets',
  () => dispatch => {
    fetch(API('datasets'))
      .then(d => d.json())
      .then(d => dispatch(gotDatasets(d)));
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
