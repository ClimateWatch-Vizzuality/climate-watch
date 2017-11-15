import * as actions from './widget-picker-actions';

export default {
  [actions.fetchMyViz]: state => ({
    ...state,
    loading: true
  }),
  [actions.gotMyViz]: (state, { payload }) => ({
    ...state,
    visualisations: payload,
    loading: false
  })
};
