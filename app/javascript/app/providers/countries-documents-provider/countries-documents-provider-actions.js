import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';
import { apiWithCache } from 'services/api';

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
        !countriesDocuments.data ||
        isEmpty(countriesDocuments.data[location]))
    ) {
      const url = `/api/v1/ndcs/countries_documents${
        location ? `?location=${location}` : ''
      }`;
      dispatch(fetchCountriesDocumentsInit());
      apiWithCache
        .get(url)
        .then(response => {
          if (response.data) return response.data;
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(fetchCountriesDocumentsReady(data));
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
