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
  [actions.fetchSectionMetadataInit]: state => ({
    ...state,
    metadataLoading: true
  }),
  [actions.fetchSectionMetadataReady]: (state, { payload }) => ({
    ...state,
    metadataLoading: false,
    metadata: { ...state.metadata, ...payload.metadata },
    error: false
  }),
  [actions.fetchSectionMetadataFail]: state => ({
    ...state,
    metadataLoading: false,
    error: true
  }),
  [actions.fetchMetadataInit]: state => ({
    ...state,
    metadataLoading: true
  }),
  [actions.fetchMetadataReady]: (state, { payload }) => ({
    ...state,
    metadataLoading: false,
    metadata: { ...state.metadata, ...{ [payload.section]: payload.metadata } },
    error: false
  }),
  [actions.fetchMetadataFail]: state => ({
    ...state,
    metadataLoading: false,
    error: true
  })
};
