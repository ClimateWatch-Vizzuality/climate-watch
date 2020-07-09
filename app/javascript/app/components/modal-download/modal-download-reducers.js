export const initialState = {
  isOpen: false,
  requiredError: false,
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

const toggleModalDownload = (state, { payload }) => ({
  ...state,
  isOpen: payload.open,
  CSVContent: null // Delete CSV content if its not downloaded
});

export default {
  setModalDownloadParams,
  setRequiredFieldsError,
  toggleModalDownload
};
