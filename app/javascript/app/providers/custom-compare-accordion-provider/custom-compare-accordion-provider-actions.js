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
const fetchCustomCompareAccordion = createThunkAction(
  'fetchCustomCompareAccordion',
  params => dispatch => {
    const { locationsDocuments, category } = params;
    if (locationsDocuments) {
      dispatch(fetchCustomCompareAccordionInit());
      fetch(
        `/api/v1/ndcs?locations_documents=${locationsDocuments}&category=${category}&filter=overview&source[]=CAIT&source[]=WB&source[]=NDC%20Explorer`
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
