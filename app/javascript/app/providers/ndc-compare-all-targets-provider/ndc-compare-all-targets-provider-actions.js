import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';
import { apiWithCache } from 'services/api';

import { getFirstDocumentValue } from 'utils/indctransform';

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
        .get('/api/v1/ndcs?&indicators=ndce_ghg')
        .then(response => {
          if (response.data) return response.data;
          throw Error(response.statusText);
        })
        .then(data => getFirstDocumentValue(data))
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
