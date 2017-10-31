import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const fetchNdcsCountryAccordionInit = createAction(
  'fetchNdcsCountryAccordionInit'
);
const fetchNdcsCountryAccordionReady = createAction(
  'fetchNdcsCountryAccordionReady'
);
const fetchNdcsCountryAccordionFailed = createAction(
  'fetchNdcsCountryAccordionFailed'
);

const fetchNdcsCountryAccordion = createThunkAction(
  'fetchNdcsCountryAccordion',
  (iso, category) => dispatch => {
    dispatch(fetchNdcsCountryAccordionInit());
    fetch(`/api/v1/ndcs?location=${iso}&category=${category}&filter=overview`)
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(data => {
        const dataWithIso = {
          iso,
          data
        };
        dispatch(fetchNdcsCountryAccordionReady(dataWithIso));
      })
      .catch(error => {
        dispatch(fetchNdcsCountryAccordionFailed(iso));
        console.info(error);
      });
  }
);

export default {
  fetchNdcsCountryAccordion,
  fetchNdcsCountryAccordionInit,
  fetchNdcsCountryAccordionReady,
  fetchNdcsCountryAccordionFailed
};
