import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import { CWAPI } from 'services/api';

export const fetchInsightsInit = createAction('fetchInsightsInit');
export const fetchInsightsReady = createAction('fetchInsightsReady');
export const fetchInsightsFail = createAction('fetchInsightsFail');

export const fetchInsights = createThunkAction(
  'fetchInsights',
  () => (dispatch, getState) => {
    const { insights } = getState();
    if (!insights.loading || insights.error) {
      dispatch(fetchInsightsInit());
      CWAPI.get('my_cw/user_stories')
        .then(response => dispatch(fetchInsightsReady(response)))
        .catch(e => {
          console.warn(e);
          dispatch(fetchInsightsFail());
        });
    }
  }
);
