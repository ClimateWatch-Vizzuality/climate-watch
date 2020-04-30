import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

export const fetchCountriesDocumentsInit = createAction(
  'fetchCountriesDocumentsInit'
);
export const fetchCountriesDocumentsReady = createAction(
  'fetchCountriesDocumentsReady'
);
export const fetchCountriesDocumentsFail = createAction(
  'fetchCountriesDocumentsFail'
);

export const fetchCountriesDocuments = createThunkAction(
  'fetchCountriesDocuments',
  () => (dispatch, state) => {
    const { countriesDocuments } = state();
    if (
      countriesDocuments &&
      isEmpty(countriesDocuments.data) &&
      !countriesDocuments.loading
    ) {
      dispatch(fetchCountriesDocumentsInit());
      fetch('/api/v1/ndcs/countries_documents')
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(fetchCountriesDocumentsReady(data.data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchCountriesDocumentsFail());
        });
    }
  }
);

export default {
  fetchCountriesDocuments,
  fetchCountriesDocumentsInit,
  fetchCountriesDocumentsReady,
  fetchCountriesDocumentsFail
};
