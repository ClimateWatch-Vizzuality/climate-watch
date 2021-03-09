import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import { handleAnalytics, getUrlSection } from 'utils/analytics';
import {
  setStorageWithExpiration,
  getStorageWithExpiration
} from 'utils/localStorage';
import { invokeCSVDownload } from 'utils/csv';

const USER_SURVEY_SPREADSHEET_URL = process.env.USER_SURVEY_SPREADSHEET_URL;
const USER_NEWSLETTER_URL = process.env.USER_NEWSLETTER_URL;

const setModalDownloadParams = createAction('setModalDownloadParams');
const setRequiredFieldsError = createAction('setRequiredFieldsError');
const toggleModalDownload = createAction('toggleModalDownload');
const setErrorMessage = createAction('setErrorMessage');

function toQueryParams(data) {
  return Object.keys(data).map(key =>
    (key === 'sector' || key === 'country'
      ? `${key}=${encodeURIComponent(data[key].value)}`
      : `${key}=${encodeURIComponent(data[key])}`)
  );
}

function getNewsletterFormData(data) {
  const formdata = new FormData();

  formdata.append('email', data.email);
  formdata.append('first_name', data.firstName);
  formdata.append('last_name', data.lastName);
  formdata.append('organization', data.organization);
  formdata.append('country', data.country.value);

  return formdata;
}

const saveSurveyData = createThunkAction(
  'saveSurveyData',
  surveyData => (dispatch, getState) => {
    const { modalDownload } = getState();
    if (!modalDownload.requiredError) {
      if (!getStorageWithExpiration('userSurvey')) {
        setStorageWithExpiration('userSurvey', true, 5);
      }

      const spreadsheetQueryParams = toQueryParams(surveyData);

      Promise.all([
        fetch(
          `${USER_SURVEY_SPREADSHEET_URL}?${spreadsheetQueryParams.join('&')}`
        ),
        surveyData.subscription &&
          fetch(USER_NEWSLETTER_URL, {
            method: 'POST',
            body: getNewsletterFormData(surveyData)
          })
      ])
        .then(response => {
          /* eslint-disable-next-line no-console */
          console.log('Modal download responses', response);
          window.location.assign(modalDownload.downloadUrl);
          handleAnalytics(
            'Data Explorer',
            'Download Data',
            getUrlSection(modalDownload.downloadUrl)
          );
          if (modalDownload.CSVContent) {
            invokeCSVDownload();
          }
          return dispatch(toggleModalDownload({ open: false }));
        })
        .catch(errors => {
          console.error('Modal download response errors', errors);
          const errorMessage =
            'There was an error while processing your request';
          return dispatch(setErrorMessage({ errorMessage }));
        });
    }
    return undefined;
  }
);

export default {
  setModalDownloadParams,
  setRequiredFieldsError,
  setErrorMessage,
  toggleModalDownload,
  saveSurveyData
};
