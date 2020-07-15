import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';
import { apiWithCache } from 'services/api';

/* @tmpfix: remove usage of indcTransform */
import indcTransform from 'utils/indctransform';

const fetchCompareAllInit = createAction('fetchCompareAllInit');
const fetchCompareAllReady = createAction('fetchCompareAllReady');
const fetchCompareAllFail = createAction('fetchCompareAllFail');

const fetchCompareAll = createThunkAction(
  'fetchCompareAll',
  () => (dispatch, state) => {
    const { compareAll } = state();
    if (
      compareAll &&
      (isEmpty(compareAll.data) || isEmpty(compareAll.data.indicators)) &&
      !compareAll.loading
    ) {
      dispatch(fetchCompareAllInit());
      apiWithCache
        .get('/api/v1/ndcs?&source[]=CAIT&source[]=LTS')
        .then(response => {
          if (response.data) return response.data;
          throw Error(response.statusText);
        })
        .then(data => indcTransform(data))
        .then(data => {
          dispatch(fetchCompareAllReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchCompareAllFail());
        });
    }
  }
);

export default {
  fetchCompareAll,
  fetchCompareAllInit,
  fetchCompareAllReady,
  fetchCompareAllFail
};
