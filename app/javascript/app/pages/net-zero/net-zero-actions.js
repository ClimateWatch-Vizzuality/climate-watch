import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';
import { apiWithCache } from 'services/api';

/* @tmpfix: remove usage of indcTransform */
import indcTransform from 'utils/indctransform';

const fetchLTSInit = createAction('fetchLTSInit');
const fetchLTSReady = createAction('fetchLTSReady');
const fetchLTSFail = createAction('fetchLTSFail');

const fetchLTS = createThunkAction('fetchLTS', () => (dispatch, state) => {
  const { LTS } = state();
  if (
    LTS &&
    (isEmpty(LTS.data) || isEmpty(LTS.data.indicators)) &&
    !LTS.loading
  ) {
    dispatch(fetchLTSInit());
    apiWithCache
      .get('/api/v1/lts?source=LTS&filter=map')
      .then(response => {
        if (response.data) return response.data;
        throw Error(response.statusText);
      })
      .then(data => indcTransform(data))
      .then(data => {
        dispatch(fetchLTSReady(data));
      })
      .catch(error => {
        console.warn(error);
        dispatch(fetchLTSFail());
      });
  }
});

export default {
  fetchLTS,
  fetchLTSInit,
  fetchLTSReady,
  fetchLTSFail
};
