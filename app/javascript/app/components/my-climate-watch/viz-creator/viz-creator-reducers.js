import { get } from 'js-lenses';
import { assign } from 'app/utils';
import find from 'lodash/find';
import uniqBy from 'lodash/uniqBy';
import initialState from './viz-creator-initial-state';
import * as actions from './viz-creator-actions';
import { updateIn, mapFilter } from './viz-creator-utils';
import { filtersSelector } from './viz-creator-selectors';

import {
  $datasets,
  $visualisations,
  $locations,
  $models,
  $scenarios,
  $indicators,
  $categories,
  $subcategories,
  $timeseries
} from './viz-creator-lenses';

export default {
  [actions.openCreator]: (state, { payload }) => ({
    ...state,
    creatorIsOpen: true,
    id: payload.id || null,
    title: payload.title || initialState.title,
    description: payload.description || initialState.description,
    datasets: payload.datasets || initialState.datasets
  }),
  [actions.closeCreator]: state => ({ ...state, creatorIsOpen: false }),
  [actions.updateVisualisationName]: (state, { payload }) =>
    assign(state, { title: payload }),
  [actions.updateVisualisationDescription]: (state, { payload }) =>
    assign(state, { description: payload }),
  [actions.fetchDatasets]: state =>
    updateIn($datasets, { loading: true }, state),
  [actions.gotDatasets]: (state, { payload }) =>
    updateIn(
      $datasets,
      {
        loading: false,
        loaded: true,
        data: payload
      },
      state
    ),
  [actions.selectDataset]: (state, { payload }) =>
    updateIn(
      $datasets,
      { selected: payload, child: get($locations, initialState) },
      state
    ),

  // Visualisations
  [actions.fetchVisualisations]: state =>
    updateIn($visualisations, { loading: true }, state),
  [actions.gotVisualisations]: (state, { payload }) =>
    updateIn(
      $visualisations,
      {
        loading: false,
        loaded: true,
        data: payload
      },
      state
    ),
  [actions.selectVisualisation]: (state, { payload }) =>
    updateIn(
      $visualisations,
      { selected: payload, child: get($locations, initialState) },
      state
    ),

  // Locations
  [actions.fetchLocations]: state =>
    updateIn($locations, { loading: true }, state),
  [actions.gotLocations]: (state, { payload }) =>
    updateIn(
      $locations,
      {
        loading: false,
        loaded: true,
        data: payload
      },
      state
    ),
  [actions.selectLocation]: (state, { payload }) =>
    updateIn(
      $locations,
      { selected: payload, child: get($models, initialState) },
      state
    ),

  // Models
  [actions.fetchModels]: state => updateIn($models, { loading: true }, state),
  [actions.gotModels]: (state, { payload }) =>
    updateIn(
      $models,
      {
        loading: false,
        loaded: true,
        data: payload
      },
      state
    ),
  [actions.selectModel]: (state, { payload }) => {
    const child = get($scenarios, initialState);
    const filters = filtersSelector(state);
    const scenariosFilter = find(filters, { name: child.name });
    if (scenariosFilter && scenariosFilter.selected === 'all') {
      child.selected = mapFilter(child.data);
    }
    return updateIn($models, { selected: payload, child }, state);
  },

  // Scenarios
  [actions.fetchScenarios]: state =>
    updateIn($scenarios, { loading: true }, state),
  [actions.gotScenarios]: (state, { payload }) => {
    const scenarios = {
      loading: false,
      loaded: true,
      data: payload
    };
    const filters = filtersSelector(state);
    const scenariosFilter = find(filters, { name: 'scenarios' });
    if (scenariosFilter && scenariosFilter.selected === 'all') {
      scenarios.selected = mapFilter(payload);
    }
    return updateIn($scenarios, scenarios, state);
  },
  [actions.selectScenario]: (state, { payload }) => {
    const newState = updateIn(
      $scenarios,
      { selected: payload, child: get($indicators, initialState) },
      state
    );
    return newState;
  },

  // Categories
  [actions.gotCategories]: (state, { payload }) =>
    updateIn(
      $categories,
      {
        loading: false,
        loaded: true,
        data: payload
      },
      state
    ),

  // SubCategories
  [actions.gotSubCategories]: (state, { payload }) =>
    updateIn(
      $subcategories,
      {
        loading: false,
        loaded: true,
        data: payload
      },
      state
    ),

  [actions.selectCategory]: (state, { payload }) =>
    updateIn(
      $categories,
      { selected: payload, child: get($subcategories, initialState) },
      state
    ),

  // Subategories
  [actions.gotSubCategories]: (state, { payload }) =>
    updateIn(
      $subcategories,
      {
        loading: false,
        loaded: true,
        data: payload
      },
      state
    ),
  [actions.selectSubcategory]: (state, { payload }) =>
    updateIn(
      $subcategories,
      { selected: payload, child: get($indicators, initialState) },
      state
    ),

  // Indicators
  [actions.fetchIndicators]: state =>
    updateIn(
      $indicators,
      {
        loading: true
      },
      state
    ),

  [actions.gotIndicators]: (state, { payload }) => {
    const filters = filtersSelector(state);
    const indicatorsFilter = find(filters, { name: 'indicators' });
    const indicators = {
      loading: false,
      loaded: true,
      data: payload,
      selected:
        indicatorsFilter && indicatorsFilter.selected === 'all'
          ? mapFilter(payload)
          : [],
      child: get($timeseries, initialState)
    };

    return updateIn($indicators, indicators, state);
  },
  [actions.selectIndicator]: (state, { payload }) =>
    updateIn($indicators, { selected: payload }, state),

  // Timeseries
  [actions.fetchTimeseries]: state =>
    updateIn(
      $timeseries,
      {
        loading: true
      },
      state
    ),
  [actions.gotTimeseries]: (state, { payload }) =>
    updateIn(
      $timeseries,
      {
        loading: false,
        loaded: true,
        data: payload
      },
      state
    ),

  [actions.saveVisualisationFail]: (state, { payload }) => ({
    ...state,
    creationStatus: {
      failed: true,
      fields: uniqBy(
        state.creationStatus.fields.concat([
          {
            field: payload.field,
            message: payload.message
          }
        ]),
        'field'
      )
    }
  }),
  [actions.saveVisualisationReady]: state => ({
    ...state,
    creationStatus: initialState.creationStatus
  })
};
