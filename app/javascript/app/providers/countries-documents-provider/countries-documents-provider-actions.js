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
  location => (dispatch, state) => {
    const { countriesDocuments } = state();
    if (
      !countriesDocuments.loading &&
      (!location ||
        !countriesDocuments.data || isEmpty(countriesDocuments.data[location]))
    ) {
      const url = `/api/v1/ndcs/countries_documents${
        location ? `?location=${location}` : ''
      }`;
      dispatch(fetchCountriesDocumentsInit());
      fetch(url)
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
