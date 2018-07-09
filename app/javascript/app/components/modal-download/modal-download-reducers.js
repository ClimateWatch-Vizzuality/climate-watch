export const initialState = {
  isOpen: false,
  downloadUrl: '',
  size: ''
};

const setModalDownloadParams = (state, { payload }) => ({
  ...state,
  isOpen: payload.open,
  downloadUrl: payload.downloadUrl,
  size: payload.size
});

const toggleModalDownload = (state, { payload }) => ({
  ...state,
  isOpen: payload.open
});

export default {
  setModalDownloadParams,
  toggleModalDownload
};
