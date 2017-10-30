import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

/* @tmpfix: remove usage of indcTransform */
import indcTransform from 'utils/indctransform';

const fetchNDCCountryAccordionInit = createAction('fetchNDCCountryAccordionInit');
const fetchNDCCountryAccordionReady = createAction('fetchNDCCountryAccordionReady');
const fetchNDCCountryAccordionFailed = createAction('fetchNDCCountryAccordionFailed');

const fetchNDCCountryAccordion = createThunkAction(
  'fetchNDCCountryAccordion',
  iso => dispatch => {
    dispatch(fetchNDCCountryAccordionInit());
    fetch(`/api/v1/ndcs?location=${iso}&filter=overview`)
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(data => indcTransform(data))
      .then(data => {
        const dataWithIso = {
          iso,
          data
        };
        dispatch(fetchNDCCountryAccordionReady(dataWithIso));
      })
      .catch(error => {
        dispatch(fetchNDCCountryAccordionFailed(iso));
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
