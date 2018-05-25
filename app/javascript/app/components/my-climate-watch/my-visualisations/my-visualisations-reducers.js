import * as actions from './my-visualisations-actions';

export default {
  [actions.fetchVisualisationsInit]: state => ({ ...state, loading: true }),
  [actions.fetchVisualisationsFail]: state => ({
    ...state,
    loading: false,
    error: true
  }),
  [actions.fetchVisualisationsReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    data: payload
  })
};
