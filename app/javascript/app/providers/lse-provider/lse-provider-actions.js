import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';
import { apiWithCache } from 'services/api';

export const fetchLSEInit = createAction('fetchLSEInit');
export const fetchLSEReady = createAction('fetchLSEReady');
export const fetchLSEFail = createAction('fetchLSEFail');

export const fetchLSE = createThunkAction(
  'fetchLSE',
  () => (dispatch, state) => {
    const { lse } = state();
    if (lse && isEmpty(lse.data) && !lse.loading) {
      dispatch(fetchLSEInit());
      apiWithCache
        .get('//climate-laws.org/cclow/api/targets/economy-wide-countries')
        .then(response => {
          if (response.data) return response.data;
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(fetchLSEReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchLSEFail());
        });
    }
  }
);

export default {
  fetchLSE,
  fetchLSEInit,
  fetchLSEReady,
  fetchLSEFail
};
