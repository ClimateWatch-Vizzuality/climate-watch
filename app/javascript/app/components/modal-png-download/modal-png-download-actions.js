import { createAction } from 'redux-actions';

const setModalPngDownloadParams = createAction('setModalPngDownloadParams');
const setModalPngDownload = createAction('toggleModalPngDownload');

export default {
  setModalPngDownloadParams,
  setModalPngDownload
};
