import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const fetchSdgGoalsInit = createAction('fetchSdgGoalsInit');
const fetchSdgGoalsReady = createAction('fetchSdgGoalsReady');
const fetchSdgGoalsFail = createAction('fetchSdgGoalsFail');

const fetchSdgGoals = createThunkAction(
  'fetchSdgGoals',
  () => (dispatch, state) => {
    const { ndcSdg } = state();
    if (ndcSdg && isEmpty(ndcSdg.data)) {
      dispatch(fetchSdgGoalsInit());
      fetch('/api/v1/ndcs/sdgs_overview')
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(fetchSdgGoalsReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchSdgGoalsFail());
        });
    }
  }
);

export default {
  fetchSdgGoals,
  fetchSdgGoalsInit,
  fetchSdgGoalsReady,
  fetchSdgGoalsFail
};
