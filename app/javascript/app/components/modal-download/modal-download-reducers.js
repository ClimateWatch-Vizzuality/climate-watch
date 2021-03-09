export const initialState = {
  isOpen: false,
  requiredError: false,
  submitting: false,
  errorMessage: '',
  downloadSize: '',
  downloadAction: null
};

const setModalDownloadParams = (state, { payload }) => ({
  ...state,
  isOpen: payload.open,
  downloadSize: payload.size,
  downloadAction: payload.downloadAction
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

const setErrorMessage = (state, { payload }) => ({
  ...state,
  errorMessage: payload.errorMessage
});

const toggleModalDownload = (state, { payload }) => ({
  ...state,
  isOpen: payload.open,
  errorMessage: '',
  downloadAction: null
});

export default {
  setModalDownloadParams,
  setRequiredFieldsError,
  setErrorMessage,
  toggleModalDownload
};
