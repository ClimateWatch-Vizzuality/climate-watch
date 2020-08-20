import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import { handleAnalytics, getUrlSection } from 'utils/analytics';
import {
  setStorageWithExpiration,
  getStorageWithExpiration
} from 'utils/localStorage';
import { invokeCSVDownload } from 'utils/csv';

const USER_SURVEY_SPREADSHEET_URL = process.env.USER_SURVEY_SPREADSHEET_URL;

const setModalDownloadParams = createAction('setModalDownloadParams');
const setRequiredFieldsError = createAction('setRequiredFieldsError');
const toggleModalDownload = createAction('toggleModalDownload');

const saveSurveyData = createThunkAction(
  'saveSurveyData',
  requestParams => (dispatch, getState) => {
    const { modalDownload } = getState();
    if (!modalDownload.requiredError) {
      if (!getStorageWithExpiration('userSurvey')) {
        setStorageWithExpiration('userSurvey', true, 5);
      }

      if (modalDownload.CSVContent) {
        invokeCSVDownload(modalDownload.CSVContent);
        return dispatch(
          setModalDownloadParams({ open: false, CSVContent: null })
        );
      }

      fetch(`${USER_SURVEY_SPREADSHEET_URL}?${requestParams.join('&')}`).then(
        () => {
          window.location.assign(modalDownload.downloadUrl);
          handleAnalytics(
            'Data Explorer',
            'Download Data',
            getUrlSection(modalDownload.downloadUrl)
          );
          return dispatch(toggleModalDownload({ open: false }));
        }
      );
    }
    return undefined;
  }
);

export default {
  setModalDownloadParams,
  setRequiredFieldsError,
  toggleModalDownload,
  saveSurveyData
};
