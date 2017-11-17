import * as actions from './viz-creator-actions';

const toggleSelect = (state, key, value) => (value === state[key] ? null : value);

export default {
  [actions.fetchDatasets]: state => ({
    ...state,
    loading: true
  }),
  [actions.gotDatasets]: (state, { payload }) => ({
    ...state,
    ...payload,
    loading: false
  }),
  [actions.selectDataset]: (state, { payload }) => ({
    ...state,
    dataset: toggleSelect(state, 'dataset', payload)
  }),
  [actions.selectViz]: (state, { payload }) => ({
    ...state,
    visualization: toggleSelect(state, 'visualization', payload)
  })
};
