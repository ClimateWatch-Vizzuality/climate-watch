export const initialState = {
  isOpen: false,
  downloadUrl: ''
};

const setModalDownloadParams = (state, { payload }) => ({
  ...state,
  isOpen: payload.open,
  downloadUrl: payload.downloadUrl
});

const toggleModalDownload = (state, { payload }) => ({
  ...state,
  isOpen: payload.open
});

export default {
  setModalDownloadParams,
  toggleModalDownload
};
