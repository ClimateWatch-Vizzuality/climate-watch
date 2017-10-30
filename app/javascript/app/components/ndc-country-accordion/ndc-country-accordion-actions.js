import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const fetchNDCCountryAccordionInit = createAction('fetchNDCCountryAccordionInit');
const fetchNDCCountryAccordionReady = createAction('fetchNDCCountryAccordionReady');
const fetchNDCCountryAccordionFailed = createAction('fetchNDCCountryAccordionFailed');

const fetchNDCCountryAccordion = createThunkAction(
  'fetchNDCCountryAccordion',
  (locations, category) => dispatch => {
    dispatch(fetchNDCCountryAccordionInit());
    fetch(`/api/v1/ndcs?location=${locations}&category=${category}&filter=overview`)
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(data => dispatch(fetchNDCCountryAccordionReady(data)))
      .catch(error => {
        dispatch(fetchNDCCountryAccordionFailed());
        console.info(error);
      });
  }
);

export default {
  fetchNDCCountryAccordion,
  fetchNDCCountryAccordionInit,
  fetchNDCCountryAccordionReady,
  fetchNDCCountryAccordionFailed
};
