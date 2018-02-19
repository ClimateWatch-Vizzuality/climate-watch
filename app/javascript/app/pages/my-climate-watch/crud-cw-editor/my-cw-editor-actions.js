import { createAction, createThunkAction } from 'redux-tools';
import { CWAPI } from 'services/api';

export const clearInsight = createAction('clearInsight');
export const getInsightInit = createAction('getInsightInit');
export const getInsightReady = createAction('getInsightReady');
export const getInsightFail = createAction('getInsightFail');
export const saveInsightInit = createAction('saveInsightInit');
export const saveInsightReady = createAction('saveInsightReady');
export const saveInsightFail = createAction('saveInsightFail');

export const getInsight = createThunkAction(
  'getInsight',
  insightId => dispatch => {
    dispatch(getInsightInit());
    CWAPI.get(`my_cw/user_stories/${insightId}`)
      .then(insight => {
        dispatch(getInsightReady(insight));
      })
      .catch(e => {
        console.warn(e);
        dispatch(getInsightFail());
      });
  }
);

export const saveInsight = createThunkAction(
  'saveInsight',
  ({ content, id = '' }) => dispatch => {
    dispatch(saveInsightInit());
    const story = {
      user_story: {
        title: 'Insight test',
        body: content,
        public: true
      }
    };
    if (id) {
      CWAPI.patch(`my_cw/user_stories/${id}`, story)
        .then(response => {
          dispatch(saveInsightReady(response));
        })
        .catch(e => {
          console.warn(e);
          dispatch(saveInsightFail());
        });
    } else {
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
