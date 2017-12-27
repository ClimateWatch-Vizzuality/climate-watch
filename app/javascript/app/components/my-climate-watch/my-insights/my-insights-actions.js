import { createAction, createThunkAction } from 'redux-tools';
import { CWAPI } from 'services/api';

export const fetchInsightsInit = createAction('fetchInsightsInit');
export const fetchInsightsReady = createAction('fetchInsightsReady');
export const fetchInsightsFail = createAction('fetchInsightsFail');

export const fetchInsights = createThunkAction(
  'fetchInsights',
  () => dispatch => {
    dispatch(fetchInsightsInit());
    CWAPI.get('my_cw/visualizations')
      .then(visualisations => dispatch(fetchInsightsReady(visualisations)))
      .catch(e => {
        console.warn(e);
        dispatch(fetchInsightsFail());
      });
  }
);
