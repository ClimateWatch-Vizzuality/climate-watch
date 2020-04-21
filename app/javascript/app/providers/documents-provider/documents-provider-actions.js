import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

export const fetchNDCSDocumentsInit = createAction('fetchNDCSDocumentsInit');
export const fetchNDCSDocumentsReady = createAction('fetchNDCSDocumentsReady');
export const fetchNDCSDocumentsFail = createAction('fetchNDCSDocumentsFail');

export const fetchNDCSDocuments = createThunkAction(
  'fetchNDCSDocuments',
  () => (dispatch, state) => {
    const { documents } = state();
    if (documents && isEmpty(documents.data) && !documents.loading) {
      dispatch(fetchNDCSDocumentsInit());
      fetch('/api/v1/data/ndc_content/documents')
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(fetchNDCSDocumentsReady(data.data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchNDCSDocumentsFail());
        });
    }
  }
);

export default {
  fetchNDCSDocuments,
  fetchNDCSDocumentsInit,
  fetchNDCSDocumentsReady,
  fetchNDCSDocumentsFail
};
