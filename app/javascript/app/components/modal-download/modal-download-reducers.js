export const initialState = {
  isOpen: false,
  requiredError: false,
  downloadUrl: '',
  downloadSize: ''
};

const setModalDownloadParams = (state, { payload }) => ({
  ...state,
  isOpen: payload.open,
  downloadUrl: payload.downloadUrl,
  downloadSize: payload.size
});

const setRequiredFieldsError = (state, { payload }) => {
  let isFieldRequiredEmpty = 0;
  ['firstName', 'lastName', 'organization'].forEach(f => {
    if (!payload[f] || payload[f] === '') {
      isFieldRequiredEmpty += 1;
    }
  });
  return {
    ...state,
    requiredError: isFieldRequiredEmpty > 0
  };
};

const toggleModalDownload = (state, { payload }) => ({
  ...state,
  isOpen: payload.open
});

export default {
  setModalDownloadParams,
  setRequiredFieldsError,
  toggleModalDownload
};
