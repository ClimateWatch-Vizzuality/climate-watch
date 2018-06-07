import * as actions from './my-cw-vis-graph-actions';

export default {
  [actions.fetchVisualisationInit]: state => ({ ...state, loading: true }),
  [actions.fetchVisualisationFail]: state => ({
    ...state,
    loading: false,
    error: true
  }),
  [actions.fetchVisualisationReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    data: payload
  })
};
