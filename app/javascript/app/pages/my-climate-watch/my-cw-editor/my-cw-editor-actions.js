import { createAction, createThunkAction } from 'redux-tools';
import { CWAPI } from 'services/api';

export const clearInsight = createAction('clearInsight');
export const saveInsightInit = createAction('saveInsightInit');
export const saveInsightReady = createAction('saveInsightReady');
export const saveInsightFail = createAction('saveInsightFail');

export const saveInsight = createThunkAction(
  'saveInsight',
  content => (dispatch, state) => {
    const { login } = state();
    if (!login.loading) {
      dispatch(saveInsightInit());
      const story = {
        user_story: {
          title: 'Insight test',
          body: content,
          public: true
        }
      };
      CWAPI.post('my_cw/user_stories', story)
        .then(response => {
          dispatch(saveInsightReady(response));
        })
        .catch(e => {
          console.warn(e);
          dispatch(saveInsightFail());
        });
    }
  }
);
