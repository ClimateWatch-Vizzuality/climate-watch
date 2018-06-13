import * as actions from './data-explorer-provider-actions';

export default {
  [actions.fetchDataExplorerInit]: state => ({ ...state, loading: true }),
  [actions.fetchDataExplorerReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload,
    error: false
  }),
  [actions.fetchDataExplorerFail]: state => ({
    ...state,
    loading: false,
    error: true
  })
};
