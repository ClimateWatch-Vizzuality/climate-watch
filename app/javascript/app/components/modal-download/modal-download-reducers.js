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
  const requiredFields = ['firstName', 'lastName', 'organization'];
  const isFieldRequiredEmpty = requiredFields.some(
    f => !payload[f] || payload[f] === ''
  );
  return {
    ...state,
    requiredError: isFieldRequiredEmpty
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
