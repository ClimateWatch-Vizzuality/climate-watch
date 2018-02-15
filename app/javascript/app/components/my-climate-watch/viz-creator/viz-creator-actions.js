import { createAction, createThunkAction } from 'redux-tools';
import { get } from 'js-lenses';
import find from 'lodash/find';
import uniqBy from 'lodash/uniqBy';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import { EPAPI, CWAPI } from 'services/api';

import { actions as visActions } from 'components/my-climate-watch/my-visualisations';
import { $datasets } from './viz-creator-lenses';

const mapResource = (resource, key) =>
  (isArray(resource) ? resource : [resource]).map(r => r[key]);
const mapResourceValue = resource => mapResource(resource, 'value');
const mapResourceLabel = resource => mapResource(resource, 'label');

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
    const visualisations = find(datasets.data, { id: payload });
    const spec = visualisations['viz-types'] || {};
    dispatch(gotVisualisations(spec));
  }
);

export const fetchModels = createThunkAction(
  'fetchModels',
  locations => dispatch => {
    EPAPI.get(
      'models',
      `location=${mapResourceValue(locations)}&time_series=true`
    ).then(d => dispatch(gotModels(d)));
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

export const fetchCategories = createThunkAction(
  'fetchCategories',
  ({ scenarios, locations }) => dispatch => {
    EPAPI.get(
      'categories',
      `scenario=${mapResourceValue(scenarios).join(
        ','
      )}&location=${mapResourceValue(locations)}&time_series=true`
    ).then(d => {
      const categories = d.map(({ id, name }) => ({ id, name }));
      dispatch(gotCategories(categories));
    });
  }
);

export const fetchSubCategories = createThunkAction(
  'fetchSubCategories',
  ({ scenarios, locations, category }) => dispatch => {
    EPAPI.get(
      'subcategories',
      `scenario=${mapResourceValue(scenarios).join(
        ','
      )}&location=${mapResourceValue(
        locations
      )}&category=${category.value}&time_series=true`
    ).then(d => dispatch(gotSubCategories(d)));
  }
);

export const fetchIndicators = createThunkAction(
  'fetchIndicators',
  ({ locations, scenarios, subcategory }) => dispatch => {
    EPAPI.get(
      'indicators',
      `scenario=${mapResourceValue(scenarios).join(
        ','
      )}&location=${mapResourceValue(
        locations
      )}&time_series=true&subcategory=${subcategory}`
    ).then(d => {
      const indicators = uniqBy(d, 'id');
      dispatch(gotIndicators(indicators));
    });
  }
);

export const fetchYears = createThunkAction(
  'fetchYears',
  ({ locations, indicators, scenarios }) => dispatch => {
    const flatScenarios = mapResourceValue(scenarios).join(',') || false;
    const flatIndicators = mapResourceValue(indicators).join(',') || false;
    EPAPI.get(
      'time_series_values/years',
      `location=${mapResourceValue(
        locations
      )}&scenario=${flatScenarios}&indicator=${flatIndicators}&time_series=true`
    ).then(d =>
      dispatch(gotYears(d.years.map(y => ({ value: y, label: `${y}` }))))
    );
  }
);

export const fetchTimeseries = createThunkAction(
  'fetchTimeseries',
  ({ locations, indicators, scenarios, years }) => dispatch => {
    const flatScenarios = mapResourceValue(scenarios).join(',') || false;
    const flatIndicators = mapResourceValue(indicators).join(',') || false;
    const ys = mapResourceLabel(years).sort();
    EPAPI.get(
      'time_series_values',
      `location=${mapResourceValue(
        locations
      )}&scenario=${flatScenarios}&indicator=${flatIndicators}&time_series=true&years=${ys.join(
        ','
      )}`
    ).then(d => dispatch(gotTimeseries(d)));
  }
);

export const fetchVisualisation = createThunkAction(
  'fetchVisualisation',
  VisualisationId => dispatch => {
    dispatch(fetchVisualisationInit());
    CWAPI.get(`my_cw/visualizations/${VisualisationId}`)
      .then(Visualisation => {
        dispatch(gotVisualization(Visualisation));
      })
      .catch(e => {
        console.warn(e);
        dispatch(gotVisualizationFail());
      });
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
export const gotYears = createAction('gotYears');
export const selectYear = createAction('selectYear');

export const updateVisualisationName = createAction('updateVisualisationName');
export const updateVisualisationDescription = createAction(
  'updateVisualisationDescription'
);

export const clearVisualisation = createAction('clearVisualisation');

export const fetchVisualisationInit = createAction('fetchVisualisationInit');
export const gotVisualization = createAction('gotVisualization');
export const gotVisualizationFail = createAction('fetchVisualisationFail');

export const saveVisualisationReady = createAction('saveVisualisationReady');
export const saveVisualisationFail = createAction('saveVisualisationFail');

export const deleteVisualisationReady = createAction(
  'deleteVisualisationReady'
);
export const deleteVisualisationFail = createAction('deleteVisualisationFail');

export const saveVisualisation = createThunkAction(
  'saveVisualisation',
  ({ id = '' }) => (dispatch, getState) => {
    const { vizCreator } = getState();
    let failed = false;
    if (isEmpty(vizCreator.title)) {
      failed = true;
      dispatch(
        saveVisualisationFail({
          field: 'title',
          message: 'Title cannot be empty.'
        })
      );
    }
    if (isEmpty(vizCreator.description)) {
      failed = true;
      dispatch(
        saveVisualisationFail({
          field: 'description',
          message: 'Description cannot be empty.'
        })
      );
    }

    if (failed) return;
    const payload = {
      visualization: {
        title: vizCreator.title,
        json_body: vizCreator.datasets,
        description: vizCreator.description
      }
    };

    const handleResponse = () => {
      dispatch(visActions.fetchVisualisations());
      dispatch(saveVisualisationReady());
      dispatch(closeCreator());
    };

    const verb = id ? 'patch' : 'post';
    const query = id ? `/${id}` : '';
    CWAPI[verb](`my_cw/visualizations${query}`, payload)
      .then(handleResponse)
      .catch(e => {
        console.warn(e);
        dispatch(saveVisualisationFail());
      });
  }
);

export const deleteVisualisation = createThunkAction(
  'deleteVisualisation',
  ({ id = '' }) => dispatch => {
    const handleResponse = () => {
      dispatch(deleteVisualisationReady());
      dispatch(closeCreator());
      dispatch(visActions.fetchVisualisations());
    };

    CWAPI.delete(`my_cw/visualizations/${id}`)
      .then(handleResponse)
      .catch(e => {
        console.warn(e);
        dispatch(deleteVisualisationFail());
      });
  }
);
