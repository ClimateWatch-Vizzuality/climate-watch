export const initialState = {
  isOpen: false,
  requiredError: false,
  errorMessage: '',
  downloadUrl: '',
  downloadSize: '',
  CSVContent: null
};

const setModalDownloadParams = (state, { payload }) => ({
  ...state,
  isOpen: payload.open,
  downloadUrl: payload.downloadUrl,
  downloadSize: payload.size,
  CSVContent: payload.CSVContent
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
  CSVContent: null // Delete CSV content if its not downloaded
});

export default {
  setModalDownloadParams,
  setRequiredFieldsError,
  setErrorMessage,
  toggleModalDownload
};
