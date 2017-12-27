import * as actions from './my-cw-editor-actions';

export const initialState = {
  saving: false,
  saved: false,
  insight: {},
  error: false
};

export default {
  [actions.clearInsight]: () => initialState,
  [actions.saveInsightInit]: state => ({ ...state, saving: true }),
  [actions.saveInsightReady]: (state, { payload }) => ({
    ...state,
    saving: false,
    saved: true,
    insight: payload
  }),
  [actions.saveInsightFail]: state => ({ ...state, saving: false, error: true })
};
