import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';
import { apiWithCache } from 'services/api';

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
      apiWithCache
        .get('/api/v1/ndcs?category=overview')
        .then(response => {
          if (response.data) return response.data;
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
