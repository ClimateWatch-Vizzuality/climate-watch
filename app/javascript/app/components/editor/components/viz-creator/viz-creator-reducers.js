import isNull from 'lodash/isNull';
import * as actions from './viz-creator-actions';

const toggleSelect = (state, key, value) =>
  (!isNull(value) && value === state[key] ? null : value);

export default {
  [actions.fetchDatasets]: state => ({
    ...state,
    datasets: {
      ...state.datasets,
      loading: true
    }
  }),
  [actions.gotDatasets]: (state, { payload }) => ({
    ...state,
    datasets: {
      ...state.datasets,
      data: payload,
      loading: false
    }
  }),
  [actions.selectDataset]: (state, { payload }) => ({
    ...state,
    dataset: toggleSelect(state, 'dataset', payload)
  }),
  [actions.selectViz]: (state, { payload }) => ({
    ...state,
    visualisation: toggleSelect(state, 'visualisation', payload)
  }),
  [actions.selectFilter]: (state, { payload: { label, type, values } }) => ({
    ...state,
    filters: {
      ...state.filters,
      [type]: {
        ...state.filters[type],
        selected: { label, values }
      }
    }
  }),
  [actions.fetchLocations]: state => ({
    ...state,
    filters: {
      ...state.filters,
      locations: {
        loading: true,
        data: []
      }
    }
  }),
  [actions.gotLocations]: (state, { payload }) => ({
    ...state,
    filters: {
      ...state.filters,
      locations: {
        loading: false,
        data: payload
      }
    }
  })
};
