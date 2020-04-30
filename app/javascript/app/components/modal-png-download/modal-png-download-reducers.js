export const initialState = {
  isOpen: false,
  header: 'Save as image (PNG)',
  title: 'Global historical emissions'
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
