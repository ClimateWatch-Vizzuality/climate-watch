import { createAction } from 'redux-actions';

const setModalDownloadParams = createAction('setModalDownloadParams');
const toggleModalDownload = createAction('toggleModalDownload');

export default {
  setModalDownloadParams,
  toggleModalDownload
};
