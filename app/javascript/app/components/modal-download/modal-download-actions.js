import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import {
  setStorageWithExpiration,
  getStorageWithExpiration
} from 'utils/localStorage';

const USER_SURVEY_SPREADSHEET_URL = process.env.USER_SURVEY_SPREADSHEET_URL;

const setModalDownloadParams = createAction('setModalDownloadParams');
const setRequiredFieldsError = createAction('setRequiredFieldsError');
const toggleModalDownload = createAction('toggleModalDownload');
const setErrorMessage = createAction('setErrorMessage');
const setProcessing = createAction('setProcessing');

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
  /* const token = document
   *   .querySelectorAll('meta[name="csrf-token"]')[0]
   *   ?.getAttribute('content');
   * formdata.append('authenticity_token', token); */

  return formdata;
}

const saveSurveyData = createThunkAction(
  'saveSurveyData',
  surveyData => (dispatch, getState) => {
    const { modalDownload } = getState();
    if (!modalDownload.requiredError && !modalDownload.processing) {
      const spreadsheetQueryParams = toQueryParams(surveyData);

      const token = document
        .querySelectorAll('meta[name="csrf-token"]')[0]
        ?.getAttribute('content');

      dispatch(setProcessing(true));

      Promise.all([
        fetch(
          `${USER_SURVEY_SPREADSHEET_URL}?${spreadsheetQueryParams.join('&')}`
        ),
        surveyData.subscription &&
          fetch('/newsletter', {
            method: 'POST',
            headers: {
              'X-CSRF-Token': token
            },
            body: getNewsletterFormData(surveyData)
          })
      ])
        .then(responses => {
          if (responses[0].ok !== undefined && !responses[0].ok) {
            throw new Error(responses[0].statusText);
          }
          if (
            responses[1] &&
            responses[1].ok !== undefined &&
            !responses[1].ok
          ) {
            throw new Error(responses[1].statusText);
          }

          if (!getStorageWithExpiration('userSurvey')) {
            setStorageWithExpiration('userSurvey', true, 5);
          }
          dispatch(setProcessing(false));
          modalDownload.downloadAction();
          return dispatch(toggleModalDownload({ open: false }));
        })
        .catch(errors => {
          console.error('Modal download response errors', errors);
          const errorMessage =
            'There was an error while processing your request';
          dispatch(setProcessing(false));
          return dispatch(setErrorMessage(errorMessage));
        });
    }
    return undefined;
  }
);

export default {
  setModalDownloadParams,
  setRequiredFieldsError,
  setErrorMessage,
  setProcessing,
  toggleModalDownload,
  saveSurveyData
};
