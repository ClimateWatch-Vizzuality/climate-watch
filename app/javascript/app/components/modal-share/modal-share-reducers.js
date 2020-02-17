export const initialState = {
  isOpen: false
};

const setShareModal = (state, { payload }) => ({
  ...state,
  isOpen: payload.open
});

export default {
  setShareModal
};
