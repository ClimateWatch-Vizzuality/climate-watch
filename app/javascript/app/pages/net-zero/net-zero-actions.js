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
    Promise.all([
      apiWithCache.get('/api/v1/ndcs?source=ECIU&filter=map'),
      apiWithCache.get('/api/v1/ndcs?indicators=ndce_ghg')
    ])
      .then(responses => {
        if (!responses[0].data) throw Error(responses[0].statusText);
        if (!responses[1].data) throw Error(responses[1].statusText);

        return {
          ...responses[0].data,
          indicators: [
            ...responses[0].data.indicators,
            ...responses[1].data.indicators
          ]
        };
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
