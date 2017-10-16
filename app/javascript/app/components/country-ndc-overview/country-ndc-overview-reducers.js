export const initialState = {
  data: null
};

const countryNdcOverviewAction = (state, { payload }) => ({
  ...state,
  data: payload
});

export default {
  countryNdcOverviewAction
};
