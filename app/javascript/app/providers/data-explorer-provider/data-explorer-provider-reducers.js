import * as actions from './data-explorer-provider-actions';

export const initialState = {
  loading: false,
  metadataLoading: false,
  loaded: false,
  error: false,
  data: {},
  metadata: {}
};
export default {
  [actions.fetchDataExplorerInit]: state => ({ ...state, loading: true }),
  [actions.fetchDataExplorerReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: { ...state.data, ...{ [payload.section]: payload.data } },
    error: false
  }),
  [actions.fetchDataExplorerFail]: state => ({
    ...state,
    loading: false,
    error: true
  }),
  [actions.fetchInitialMetadataInit]: state => ({
    ...state,
    metadataLoading: true
  }),
  [actions.fetchInitialMetadataReady]: (state, { payload }) => ({
    ...state,
    metadataLoading: false,
    metadata: { ...state.metadata, ...payload.metadata },
    error: false
  }),
  [actions.fetchInitialMetadataFail]: state => ({
    ...state,
    metadataLoading: false,
    error: true
  })
};
