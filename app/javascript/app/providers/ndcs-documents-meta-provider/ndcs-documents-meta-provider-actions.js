import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const fetchNdcsDocumentsMetaInit = createAction('fetchNdcsDocumentsMetaInit');
const fetchNdcsDocumentsMetaReady = createAction('fetchNdcsDocumentsMetaReady');
const fetchNdcsDocumentsMetaFailed = createAction(
  'fetchNdcsDocumentsMetaFailed'
);

const fetchNdcsDocumentsMeta = createThunkAction(
  'fetchNdcsDocumentsMeta',
  () => dispatch => {
    dispatch(fetchNdcsDocumentsMetaInit());
    fetch('/api/v1/ndcs/text')
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(data => {
        dispatch(fetchNdcsDocumentsMetaReady(data));
      })
      .catch(error => {
        dispatch(fetchNdcsDocumentsMetaFailed());
        console.info(error);
      });
  }
);

export default {
  fetchNdcsDocumentsMeta,
  fetchNdcsDocumentsMetaInit,
  fetchNdcsDocumentsMetaReady,
  fetchNdcsDocumentsMetaFailed
};
