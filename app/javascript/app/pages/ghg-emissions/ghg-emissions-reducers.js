export const initialState = {
  data: null
};

const ghgEmissionsAction = (state, { payload }) => ({
  ...state,
  data: payload
});

export default {
  ghgEmissionsAction
};
