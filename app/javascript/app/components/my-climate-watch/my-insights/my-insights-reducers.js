import * as actions from './my-insights-actions';

export default {
  [actions.fetchStories]: state => ({ ...state, loading: true }),
  [actions.gotStories]: (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    data: payload
  })
};
