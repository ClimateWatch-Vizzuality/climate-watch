import { createAction, createThunkAction } from 'redux-tools';
import { get } from 'js-lenses';
import find from 'lodash/find';
import { EPAPI, CWAPI } from 'services/api';

import { actions as visActions } from 'components/my-climate-watch/my-visualisations';

import { $datasets } from './viz-creator-lenses';

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
    EPAPI.get('locations', 'time_series=true').then(d =>
      dispatch(gotLocations(d))
    );
  }
);

export const fetchVisualisations = createThunkAction(
  'fetchVisualisations',
  payload => (dispatch, getState) => {
    const datasets = get($datasets, getState().vizCreator);
    // const visualisations = flatMapVis(
    const visualisations = find(datasets.data, { id: payload });
    const spec = visualisations['viz-types'] || {};
    dispatch(gotVisualisations(spec));
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
        .join(',')}&location=${location}&time_series=true`
    ).then(d => {
      const categories = uniqueById(d.map(i => i.category));
      const subcategories = uniqueById(d.map(i => i.subcategory));

      dispatch(gotIndicators(uniqueById(d)));
      dispatch(gotCategories(categories));
      dispatch(gotSubCategories(subcategories));
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
    const flatIndicators = indicators.map(s => s.value).join(',') || false;

    EPAPI.get(
      'time_series_values',
      `location=${locations}&scenario=${flatScenarios}&indicator=${flatIndicators}`
    ).then(d => dispatch(gotTimeseries(d)));
  }
);

export const openCreator = createAction('openCreator');
export const closeCreator = createAction('closeCreator');

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
export const selectSubcategory = createAction('selectSubcategory');

export const gotTimeseries = createAction('gotTimeseries');

export const updateVisualisationName = createAction('updateVisualisationName');

export const clearVisualisation = createAction('clearVisualisation');
export const getVisualisationInit = createAction('getVisualisationInit');
export const getVisualisationReady = createAction('getVisualisationReady');
export const getVisualisationFail = createAction('getVisualisationFail');
export const saveVisualisationInit = createAction('saveVisualisationInit');
export const saveVisualisationReady = createAction('saveVisualisationReady');
export const saveVisualisationFail = createAction('saveVisualisationFail');

export const getVisualisation = createThunkAction(
  'getVisualisation',
  VisualisationId => dispatch => {
    dispatch(getVisualisationInit());
    CWAPI.get(`my_cw/visualizations/${VisualisationId}`)
      .then(Visualisation => {
        dispatch(getVisualisationReady(Visualisation));
      })
      .catch(e => {
        console.warn(e);
        dispatch(getVisualisationFail());
      });
  }
);

export const saveVisualisation = createThunkAction(
  'saveVisualisation',
  ({ id = '' }) => (dispatch, getState) => {
    dispatch(saveVisualisationInit());
    const { vizCreator } = getState();
    const visualisation = {
      visualization: {
        title: vizCreator.title,
        json_body: vizCreator.datasets
      }
    };

    const handleResponse = () => {
      // dispatch(saveVisualisationReady(response));
      dispatch(visActions.fetchVisualisations());
      dispatch(closeCreator());
    };
    if (id) {
      CWAPI.patch(`my_cw/visualizations/${id}`, visualisation)
        .then(handleResponse)
        .catch(e => {
          console.warn(e);
          dispatch(saveVisualisationFail());
        });
    } else {
      CWAPI.post('my_cw/visualizations', visualisation)
        .then(handleResponse)
        .catch(e => {
          console.warn(e);
          dispatch(saveVisualisationFail());
        });
    }
  }
);
