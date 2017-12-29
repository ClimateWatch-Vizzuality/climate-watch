import { get } from 'js-lenses';
import { assign } from 'app/utils';
import initialState from './viz-creator-initial-state';
import * as actions from './viz-creator-actions';
import { updateIn } from './viz-creator-utils';

import {
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
  [actions.updateVisualisationName]: (state, { payload }) =>
    assign(state, { title: payload }),
  [actions.fetchDatasets]: state => assign(state, { loading: true }),
  [actions.gotDatasets]: (state, { payload }) =>
    assign(state, { loading: false, data: payload, loaded: true }),
  [actions.selectDataset]: (state, { payload }) =>
    assign(state, {
      selected: payload,
      child: get($visualisations, initialState)
    }),

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
  [actions.selectModel]: (state, { payload }) =>
    updateIn(
      $models,
      { selected: payload, child: get($scenarios, initialState) },
      state
    ),

  // Scenarios
  [actions.fetchScenarios]: state =>
    updateIn($scenarios, { loading: true }, state),
  [actions.gotScenarios]: (state, { payload }) =>
    updateIn(
      $scenarios,
      {
        loading: false,
        loaded: true,
        data: payload
      },
      state
    ),
  [actions.selectScenario]: (state, { payload }) =>
    updateIn(
      $scenarios,
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
  [actions.gotIndicators]: (state, { payload }) =>
    updateIn(
      $indicators,
      {
        loading: false,
        loaded: true,
        data: payload
      },
      state
    ),
  [actions.selectIndicator]: (state, { payload }) =>
    updateIn($indicators, { selected: payload }, state),

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
  [actions.selectCategory]: (state, { payload }) =>
    updateIn(
      $categories,
      { selected: payload, child: get($subcategories, initialState) },
      state
    ),

  // Categories
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
  [actions.selectSubCategory]: (state, { payload }) =>
    updateIn(
      $subcategories,
      { selected: payload, child: get($timeseries, initialState) },
      state
    ),

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
    )
};
