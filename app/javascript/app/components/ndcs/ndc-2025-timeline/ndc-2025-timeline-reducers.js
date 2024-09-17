export const initialState = {
  data: null
};

const ndc2025TimelineAction = (state, { payload }) => ({
  ...state,
  data: payload
});

export default {
  ndc2025TimelineAction
};
