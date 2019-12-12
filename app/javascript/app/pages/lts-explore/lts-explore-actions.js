import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

/* @tmpfix: remove usage of indcTransform */
import indcTransform from 'utils/indctransform';

const fetchLTSInit = createAction('fetchLTSInit');
const fetchLTSReady = createAction('fetchLTSReady');
const fetchLTSFail = createAction('fetchLTSFail');

const fetchLTS = createThunkAction('fetchLTS', () => (dispatch, state) => {
  const { ndcs } = state();
  if (
    ndcs &&
    (isEmpty(ndcs.data) || isEmpty(ndcs.data.indicators)) &&
    !ndcs.loading
  ) {
    dispatch(fetchLTSInit());
    fetch('/api/v1/ndcs?source=LTS&filter=map')
      .then(response => {
        if (response.ok) return response.json();
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
