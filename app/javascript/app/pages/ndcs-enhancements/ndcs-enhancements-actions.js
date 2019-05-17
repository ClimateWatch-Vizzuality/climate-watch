import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

/* @tmpfix: remove usage of indcTransform */
import indcTransform from 'utils/indctransform';

const fetchNDCSEnhancementsInit = createAction('fetchNDCSEnhancementsInit');
const fetchNDCSEnhancementsReady = createAction('fetchNDCSEnhancementsReady');
const fetchNDCSEnhancementsFail = createAction('fetchNDCSEnhancementsFail');

const fetchNDCSEnhancements = createThunkAction(
  'fetchNDCSEnhancements',
  () => (dispatch, state) => {
    const { ndcsEnhancements } = state();
    if (
      ndcsEnhancements &&
      (isEmpty(ndcsEnhancements.data) ||
        isEmpty(ndcsEnhancements.data.indicators)) &&
      !ndcsEnhancements.loading
    ) {
      dispatch(fetchNDCSEnhancementsInit());
      fetch('/api/v1/ndcs?category=overview')
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => indcTransform(data))
        .then(data => {
          dispatch(fetchNDCSEnhancementsReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchNDCSEnhancementsFail());
        });
    }
  }
);

export default {
  fetchNDCSEnhancements,
  fetchNDCSEnhancementsInit,
  fetchNDCSEnhancementsReady,
  fetchNDCSEnhancementsFail
};
