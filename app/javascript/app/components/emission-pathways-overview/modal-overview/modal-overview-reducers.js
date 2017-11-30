export const initialState = {
  isOpen: false
};

const toggleModalOverview = (state, { payload }) => ({
  ...state,
  isOpen: payload.open
});

export default {
  toggleModalOverview
};
