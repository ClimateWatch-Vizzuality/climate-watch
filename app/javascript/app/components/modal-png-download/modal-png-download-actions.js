import { createAction } from 'redux-actions';

const setModalPngDownloadParams = createAction('setModalPngDownloadParams');
const toggleModalPngDownload = createAction('toggleModalPngDownload');

export default {
  setModalPngDownloadParams,
  toggleModalPngDownload
};
