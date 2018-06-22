import { get } from 'js-lenses';
import { assign } from 'app/utils';
import find from 'lodash/find';
import filter from 'lodash/filter';
import uniqBy from 'lodash/uniqBy';
import isEmpty from 'lodash/isEmpty';
import initialState from './viz-creator-initial-state';
import * as actions from './viz-creator-actions';
import {
  updateIn,
  mapFilter,
  getCachedSelectedProperty,
  buildChildLense,
  filterLocationsByMultipleModels,
  filterModelsByLocations,
  filterLocationsByModel,
  getCoverage
} from './viz-creator-utils';
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
  $years,
  $timeseries
} from './viz-creator-lenses';

const unfail = (title, state) => {
  const failures = filter(
    state.creationStatus.fields,
    ({ field }) => field !== title
  );
  return {
    ...state,
    creationStatus: {
      fields: failures,
      failed: Boolean(failures.length)
    }
  };
};

export default {
  [actions.openCreator]: (state, { payload }) =>
    (!payload
      ? {
        ...state,
        id: null,
        description: initialState.description,
        title: initialState.title,
        datasets: initialState.datasets,
        creatorIsOpen: true,
        creatorIsEditing: true
      }
      : {
        ...state,
        creatorIsOpen: true,
        id: payload.id || null,
        title: payload.title || initialState.title,
        description: payload.description || initialState.description,
        datasets: payload.datasets || initialState.datasets
      }),
  [actions.closeCreator]: state => ({
    ...state,
    creatorIsOpen: false,
    creatorIsEditing: false
  }),
  [actions.editVisualisationData]: state => ({
    ...state,
    creatorIsEditing: false
  }),
  [actions.updateVisualisationName]: (state, { payload }) =>
    unfail('title', assign(state, { title: payload })),
  [actions.updateVisualisationDescription]: (state, { payload }) =>
    unfail('description', assign(state, { description: payload })),
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
  [actions.selectLocation]: (state, { payload }) => {
    const child = buildChildLense($models, payload, state, initialState);
    return updateIn(
      $locations,
      { selected: payload, child, loaded: !isEmpty(payload) },
      state
    );
  },

  // Models
  [actions.fetchModels]: state => updateIn($models, { loading: true }, state),
  [actions.gotModels]: (state, { payload }) => {
    const locations = get($locations, state);
    const filteredModels = filterModelsByLocations(payload, locations.selected);
    const filteredLocations = filterLocationsByMultipleModels(
      locations.data,
      filteredModels,
      true
    );
    const selected = getCachedSelectedProperty(
      get($models, state),
      filteredModels
    );
    const child = buildChildLense($scenarios, selected, state, initialState);
    const newState = updateIn($locations, { data: filteredLocations }, state);
    return updateIn(
      $models,
      {
        loading: false,
        loaded: true,
        data: filteredModels,
        selected,
        child
      },
      newState
    );
  },
  [actions.selectModel]: (state, { payload }) => {
    const modelsData = get($models, state).data;
    const locations = get($locations, state);
    const modelSelectedCoverage = getCoverage(modelsData, payload);
    const filteredLocations = filterLocationsByModel(
      locations.data,
      modelSelectedCoverage
    );
    const newState = updateIn($locations, { data: filteredLocations }, state);
    const child = { ...get($scenarios, state), loaded: false, loading: false };
    return updateIn($models, { selected: payload, child }, newState);
  },

  // Scenarios
  [actions.fetchScenarios]: state =>
    updateIn($scenarios, { loading: true }, state),
  [actions.gotScenarios]: (state, { payload }) => {
    const selected = getCachedSelectedProperty(get($scenarios, state), payload);
    const child = buildChildLense($categories, selected, state, initialState);
    const scenarios = {
      loading: false,
      loaded: true,
      data: payload,
      selected,
      child
    };
    const filters = filtersSelector(state);
    const scenariosFilter = find(filters, { name: 'scenarios' });
    if (
      isEmpty(selected) &&
      scenariosFilter &&
      scenariosFilter.selected === 'all'
    ) {
      scenarios.selected = mapFilter(payload);
    }
    return updateIn($scenarios, scenarios, state);
  },
  [actions.selectScenario]: (state, { payload }) => {
    const child = { ...get($categories, state), loaded: false, loading: false };
    const newState = updateIn($scenarios, { selected: payload, child }, state);
    return newState;
  },

  // Categories
  [actions.fetchCategories]: state =>
    updateIn($categories, { loading: true }, state),
  [actions.gotCategories]: (state, { payload }) => {
    const selected = getCachedSelectedProperty(
      get($categories, state),
      payload
    );
    const child = buildChildLense(
      $subcategories,
      selected,
      state,
      initialState
    );
    return updateIn(
      $categories,
      {
        loading: false,
        loaded: true,
        data: payload,
        selected,
        child
      },
      state
    );
  },
  [actions.selectCategory]: (state, { payload }) => {
    const child = {
      ...get($subcategories, state),
      loaded: false,
      loading: false
    };
    return updateIn($categories, { selected: payload, child }, state);
  },

  // Subategories
  [actions.fetchSubCategories]: state =>
    updateIn($subcategories, { loading: true }, state),
  [actions.gotSubCategories]: (state, { payload }) => {
    const selected = getCachedSelectedProperty(
      get($subcategories, state),
      payload
    );
    const child = buildChildLense($indicators, selected, state, initialState);
    return updateIn(
      $subcategories,
      {
        loading: false,
        loaded: true,
        data: payload,
        selected,
        child
      },
      state
    );
  },
  [actions.selectSubcategory]: (state, { payload }) => {
    const child = { ...get($indicators, state), loaded: false, loading: false };
    return updateIn($subcategories, { selected: payload, child }, state);
  },

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
    const selected = getCachedSelectedProperty(
      get($indicators, state),
      payload
    );
    const child = buildChildLense($years, selected, state, initialState);
    const indicators = {
      loading: false,
      loaded: true,
      data: payload,
      selected,
      child
    };
    if (indicatorsFilter && indicatorsFilter.selected === 'all') {
      indicators.selected = mapFilter(payload);
    }

    return updateIn($indicators, indicators, state);
  },
  [actions.selectIndicator]: (state, { payload }) => {
    const child = { ...get($years, state), loaded: false, loading: false };
    return updateIn($indicators, { selected: payload, child }, state);
  },

  // Years
  [actions.fetchYears]: state =>
    updateIn(
      $years,
      {
        loading: true
      },
      state
    ),
  [actions.gotYears]: (state, { payload }) => {
    const filters = filtersSelector(state);
    const yearsFilter = find(filters, { name: 'years' });
    const selected = getCachedSelectedProperty(get($years, state), payload);
    const years = {
      loading: false,
      loaded: true,
      data: payload,
      selected,
      child: {
        ...get($timeseries, initialState),
        loaded: false,
        loading: false
      }
    };
    if (isEmpty(selected) && yearsFilter && yearsFilter.selected === 'all') {
      years.selected = mapFilter(payload);
    }
    return updateIn($years, years, state);
  },
  [actions.selectYear]: (state, { payload }) => {
    const child = {
      ...get($timeseries, initialState),
      loaded: false,
      loading: false
    };
    return updateIn($years, { selected: payload, child }, state);
  },

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
