export const initialState = {
  isOpen: false,
  header: '',
  description: ''
};

const setModalPngDownloadParams = (state, { payload }) => ({
  ...state,
  isOpen: payload.open,
  header: 'download me',
  description: 'this is your chart'
});

const toggleModalPngDownload = (state, { payload }) => ({
  ...state,
  isOpen: payload.open
});

export default {
  setModalPngDownloadParams,
  toggleModalPngDownload
};
