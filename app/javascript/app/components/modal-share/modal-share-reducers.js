export const initialState = {
  isOpen: false,
  sharePath: null
};

const setShareModal = (state, { payload }) => ({
  ...state,
  isOpen: payload.open,
  sharePath: payload.sharePath
});

export default {
  setShareModal
};
