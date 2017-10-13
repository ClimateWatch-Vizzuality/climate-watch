export const initialState = {
  data: null
};

const ndcSdgAction = (state, { payload }) => ({
  ...state,
  data: payload
});

export default {
  ndcSdgAction
};
