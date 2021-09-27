export const initialState = {
  modalIdOpen: null
};

const setModalPngDownload = (state, { payload }) => ({
  ...state,
  modalIdOpen: payload.open
});

export default {
  setModalPngDownload
};
