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
    const { locations, category, compare, lts, document } = params;
    const documentParam = document ? `&document=${document}` : '';
    if (locations) {
      dispatch(fetchNdcsCountryAccordionInit());
      fetch(
        `/api/v1/${
          lts ? 'lts' : 'ndcs'
        }?location=${locations}&category=${category}${
          lts
            ? '&source=LTS'
            : '&source[]=Climate%20Watch&source[]=WB&source[]=NDC%20Explorer&source[]=UNICEF'
        }${documentParam}${!compare ? '&filter=overview' : ''}`
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
