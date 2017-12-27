import * as actions from './my-cw-editor-actions';

export const initialState = {
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  insight: {},
  error: false
};

export default {
  [actions.clearInsight]: () => initialState,
  [actions.getInsightInit]: state => ({ ...state, loading: true }),
  [actions.getInsightReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    insight: payload
  }),
  [actions.getInsightFail]: state => ({
    ...state,
    loading: false,
    error: true
  }),
  [actions.saveInsightInit]: state => ({ ...state, saving: true }),
  [actions.saveInsightReady]: (state, { payload }) => ({
    ...state,
    saving: false,
    saved: true,
    insight: payload
  }),
  [actions.saveInsightFail]: state => ({ ...state, saving: false, error: true })
};
