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
  params => dispatch => {
    const { iso, category = 'Summary', compare } = params;
    if (iso) {
      dispatch(fetchNdcsCountryAccordionInit());
      fetch(
        `/api/v1/ndcs?location=${iso}&category=${category}&source=LTS${
          !compare ? '&filter=overview' : ''
        }`
      )
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => dispatch(fetchNdcsCountryAccordionReady(data)))
        .catch(error => {
          dispatch(fetchNdcsCountryAccordionFailed());
          console.info(error);
        });
    }
  }
);

export default {
  fetchNdcsCountryAccordion,
  fetchNdcsCountryAccordionInit,
  fetchNdcsCountryAccordionReady,
  fetchNdcsCountryAccordionFailed
};
