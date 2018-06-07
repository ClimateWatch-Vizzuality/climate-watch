import * as actions from './my-insights-actions';

export default {
  [actions.fetchInsightsInit]: state => ({ ...state, loading: true }),
  [actions.fetchInsightsReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    data: payload
  }),
  [actions.fetchInsightsFail]: state => ({
    ...state,
    loading: false,
    error: true
  })
};
