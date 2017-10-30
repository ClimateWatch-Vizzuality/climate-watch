export const initialState = {
  data: null
};

const countryTimelineAction = (state, { payload }) => ({
  ...state,
  data: payload
});

export default {
  countryTimelineAction
};
