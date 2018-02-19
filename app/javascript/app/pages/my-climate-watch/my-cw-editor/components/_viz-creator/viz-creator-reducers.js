import isNull from 'lodash/isNull';
import { assign } from 'app/utils';
import * as actions from './viz-creator-actions';

const toggleSelect = (state, key, value) =>
  !isNull(value) && value === state[key] ? null : value;

const fetchData = (key, state) => ({
  ...state,
  [key]: {
    ...state[key],
    loading: true
  }
});

const gotData = (key, data, state) => ({
  ...state,
  [key]: {
    ...state.datasets[key],
    data,
    loading: false
  }
});

const setData = (key, value, state) => assign(state, { [key]: value });

const selectData = (key, data, state) =>
  setData(key, toggleSelect(state, key, data), state);
const resetData = (key, state) => setData(key, null, state);

const fetchFilter = (key, state) => ({
  ...state,
  filters: {
    ...state.filters,
    [key]: {
      ...state.filters[key],
      loading: true
    }
  }
});

const setFilterKey = (filter, key, value, state) => ({
  ...state,
  filters: {
    ...state.filters,
    [filter]: {
      ...state.filters[filter],
      [key || 'data']: value
    }
  }
});

const gotFilterData = (key, data, state) =>
  setFilterKey(key, 'loading', false, setFilterKey(key, 'data', data, state));

const selectFilter = ({ label, type, value, values }, state) => ({
  ...state,
  filters: {
    ...state.filters,
    [type]: {
      ...state.filters[type],
      selected: values || { label, value }
    }
  }
});

const resetFilter = (filter, state) =>
  setFilterKey(filter, 'data', [], gotFilterData(filter, null, state));

export default {
  [actions.fetchDatasets]: state => fetchData('datasets', state),
  [actions.fetchLocations]: state => fetchFilter('locations', state),
  [actions.fetchModels]: state => fetchFilter('models', state),
  [actions.fetchScenarios]: state => fetchFilter('scenarios', state),
  [actions.fetchIndicators]: state => fetchFilter('indicators', state),
  [actions.fetchTopEmmiters]: state => fetchFilter('topEmitters', state),

  [actions.gotDatasets]: (state, { payload }) =>
    gotData('datasets', payload, state),
  [actions.gotLocations]: (state, { payload }) =>
    gotFilterData('locations', payload, state),
  [actions.gotModels]: (state, { payload }) =>
    gotFilterData('models', payload, state),
  [actions.gotScenarios]: (state, { payload }) =>
    gotFilterData('scenarios', payload, state),
  [actions.gotCategories]: (state, { payload }) =>
    gotFilterData('categories', payload, state),
  [actions.gotIndicators]: (state, { payload }) =>
    gotFilterData('indicators', payload, state),
  [actions.gotTimeseries]: (state, { payload }) =>
    gotData('timeseries', payload, state),
  [actions.gotTopEmmiters]: (state, { payload }) =>
    gotData('topEmmiters', payload, state),

  [actions.selectDataset]: (state, { payload }) =>
    resetData('visualisation', selectData('dataset', payload, state)),
  [actions.selectViz]: (state, { payload }) =>
    setFilterKey(
      'locations',
      'selected',
      null,
      resetFilter('models', selectData('visualisation', payload, state))
    ),
  [actions.selectFilter]: (state, { payload }) => selectFilter(payload, state)
};
