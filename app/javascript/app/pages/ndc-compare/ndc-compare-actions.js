import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const fetchCompareNDCInit = createAction('fetchCompareNDCInit');
const fetchCompareNDCReady = createAction('fetchCompareNDCReady');
const fetchCompareNDCFailed = createAction('fetchCompareNDCFailed');

const fetchCompareNDC = createThunkAction(
  'fetchCompareNDC',
  isos => dispatch => {
    dispatch(fetchCompareNDCInit());
    fetch(`/api/v1/ndcs?location=${isos}`)
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(data => {
        dispatch(fetchCompareNDCReady(data));
      })
      .catch(error => {
        dispatch(fetchCompareNDCFailed());
        console.info(error);
      });
  }
);

export default {
  fetchCompareNDC,
  fetchCompareNDCInit,
  fetchCompareNDCReady,
  fetchCompareNDCFailed
};
