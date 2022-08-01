import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';
import { apiWithCache } from 'services/api';

const fetchAdaptationsInit = createAction('fetchAdaptationsInit');
const fetchAdaptationsReady = createAction('fetchAdaptationsReady');
const fetchAdaptationsFail = createAction('fetchAdaptationsFail');

const fetchAdaptations = createThunkAction(
  'fetchAdaptations',
  () => (dispatch, state) => {
    const { adaptations } = state();
    if (isEmpty(adaptations.data) && !adaptations.loading) {
      dispatch(fetchAdaptationsInit());

      apiWithCache
        .get('/api/v1/adaptations')
        .then(response => {
          if (response.data) return response.data;
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
            dispatch(fetchAdaptationsReady(data));
          } else {
            dispatch(fetchAdaptationsReady({}));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchAdaptationsFail());
        });
    }
  }
);

export default {
  fetchAdaptations,
  fetchAdaptationsInit,
  fetchAdaptationsReady,
  fetchAdaptationsFail
};
