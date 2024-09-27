import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const getTimelineInit = createAction('getTimelineInit');
const getTimelineReady = createAction('getTimelineReady');
const getTimelineFail = createAction('getTimelineFail');

const getTimeline = createThunkAction(
  'getTimeline',
  iso => (dispatch, state) => {
    const { timeline } = state();
    if (!timeline.loading) {
      dispatch(getTimelineInit());
      fetch('/api/v1/data/ndc_content/timelines')
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          const d = Array.isArray(data) ? data : Array.isArray(data.data) ? data.data : [];
          dispatch(getTimelineReady(d));
        })
        .catch(error => {
          console.info(error);
          dispatch(getTimelineFail());
        });
    }
  }
);

export default {
  getTimeline,
  getTimelineInit,
  getTimelineReady
};
