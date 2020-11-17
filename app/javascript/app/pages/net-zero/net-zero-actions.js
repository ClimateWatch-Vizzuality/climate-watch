import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';
import { apiWithCache } from 'services/api';

/* @tmpfix: remove usage of indcTransform */
import indcTransform from 'utils/indctransform';

const fetchNetZeroInit = createAction('fetchNetZeroInit');
const fetchNetZeroReady = createAction('fetchNetZeroReady');
const fetchNetZeroFail = createAction('fetchNetZeroFail');

const fetchNetZero = createThunkAction(
  'fetchNetZero',
  () => (dispatch, state) => {
    const { NetZero } = state();
    if (
      NetZero &&
      (isEmpty(NetZero.data) || isEmpty(NetZero.data.indicators)) &&
      !NetZero.loading
    ) {
      dispatch(fetchNetZeroInit());
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
          dispatch(fetchNetZeroReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchNetZeroFail());
        });
    }
  }
);

export default {
  fetchNetZero,
  fetchNetZeroInit,
  fetchNetZeroReady,
  fetchNetZeroFail
};
