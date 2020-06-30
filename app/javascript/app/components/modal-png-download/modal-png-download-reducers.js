export const initialState = {
  isOpen: false,
  header: 'Save as image (PNG)',
  title: 'Historical GHG emissions'
};

const setModalPngDownloadParams = (state, { payload }) => ({
  ...state,
  isOpen: payload.open,
  header: payload.header,
  description: payload.description
});

const setModalPngDownload = (state, { payload }) => ({
  ...state,
  isOpen: payload.open
});

export default {
  setModalPngDownloadParams,
  setModalPngDownload
};
