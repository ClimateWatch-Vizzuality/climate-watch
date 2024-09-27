export const initialState = {
  data: null
};

const fetchCountryTimelineDataReady = (state, { payload }) => ({
  ...state,
  data: payload
});

export default {
  fetchCountryTimelineDataReady
};
