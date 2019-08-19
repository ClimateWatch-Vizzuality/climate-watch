import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

/* @tmpfix: remove usage of indcTransform */
import indcTransform from 'utils/indctransform';

const fetchNDCSLTSInit = createAction('fetchNDCSLTSInit');
const fetchNDCSLTSReady = createAction('fetchNDCSLTSReady');
const fetchNDCSLTSFail = createAction('fetchNDCSLTSFail');

const fetchNDCSLTS = createThunkAction(
  'fetchNDCSLTS',
  () => (dispatch, state) => {
    const { ndcsLTS } = state();
    if (
      ndcsLTS &&
      (isEmpty(ndcsLTS.data) || isEmpty(ndcsLTS.data.indicators)) &&
      !ndcsLTS.loading
    ) {
      dispatch(fetchNDCSLTSInit());
      fetch('/api/v1/ndcs?category=overview')
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => indcTransform(data))
        .then(data => {
          dispatch(fetchNDCSLTSReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchNDCSLTSFail());
        });
    }
  }
);

export default {
  fetchNDCSLTS,
  fetchNDCSLTSInit,
  fetchNDCSLTSReady,
  fetchNDCSLTSFail
};
