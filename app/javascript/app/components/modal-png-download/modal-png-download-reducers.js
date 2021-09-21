export const initialState = {
  isOpen: false
};

const setModalPngDownloadParams = (state, { payload }) => ({
  ...state,
  isOpen: payload.open
});

const setModalPngDownload = (state, { payload }) => ({
  ...state,
  isOpen: payload.open
});

export default {
  setModalPngDownloadParams,
  setModalPngDownload
};
