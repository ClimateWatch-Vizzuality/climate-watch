import * as actions from './my-visualisations-actions';

export default {
  [actions.fetchVisualisations]: state => ({ ...state, loading: true }),
  [actions.gotVisualisations]: (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    data: payload
  })
};
