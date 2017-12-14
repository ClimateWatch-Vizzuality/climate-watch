import * as actions from './my-visualisations-actions';

export default {
  [actions.openCreator]: state => ({ ...state, creatorIsOpen: true }),
  [actions.closeCreator]: state => ({ ...state, creatorIsOpen: false }),

  [actions.fetchVisualisations]: state => ({ ...state, loading: true }),
  [actions.gotVisualisations]: (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    data: payload
  })
};
