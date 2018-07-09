import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const USER_SURVEY_SPREADSHEET_URL = process.env.USER_SURVEY_SPREADSHEET_URL;

const setModalDownloadParams = createAction('setModalDownloadParams');
const setRequiredFieldsError = createAction('setRequiredFieldsError');
const toggleModalDownload = createAction('toggleModalDownload');

const saveSurveyData = createThunkAction(
  'saveSurveyData',
  requestParams => (dispatch, getState) => {
    const { modalDownload } = getState();
    if (!modalDownload.requiredError) {
      fetch(
        `${USER_SURVEY_SPREADSHEET_URL}?${requestParams.join('&')}`
      ).then(() => window.location.assign(modalDownload.downloadUrl));
    }
  }
);

export default {
  setModalDownloadParams,
  setRequiredFieldsError,
  toggleModalDownload,
  saveSurveyData
};
