import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const fetchCustomCompareAccordionInit = createAction(
  'fetchCustomCompareAccordionInit'
);
const fetchCustomCompareAccordionReady = createAction(
  'fetchCustomCompareAccordionReady'
);
const fetchCustomCompareAccordionFailed = createAction(
  'fetchCustomCompareAccordionFailed'
);
// http://localhost:3000/api/v1/ndcs?locations_documents=DZA-indc,ALB-first_ndc&category=overview&source[]=CAIT&source[]=WB&source[]=NDC%20Explorer
const fetchCustomCompareAccordion = createThunkAction(
  'fetchCustomCompareAccordion',
  params => dispatch => {
    const { locationsDocuments, category } = params;
    if (locationsDocuments) {
      dispatch(fetchCustomCompareAccordionInit());
      fetch(
        `/api/v1/ndcs?locations_documents=${locationsDocuments}&category=${category}&source[]=CAIT&source[]=WB&source[]=NDC%20Explorer`
        // }${!compare ? '&filter=overview' : ''}`
      )
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => dispatch(fetchCustomCompareAccordionReady(data)))
        .catch(error => {
          dispatch(fetchCustomCompareAccordionFailed());
          console.info(error);
        });
    }
  }
);

export default {
  fetchCustomCompareAccordion,
  fetchCustomCompareAccordionInit,
  fetchCustomCompareAccordionReady,
  fetchCustomCompareAccordionFailed
};