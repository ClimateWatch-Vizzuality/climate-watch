import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const getTimelineInit = createAction('getTimelineInit');
const getTimelineReady = createAction('getTimelineReady');
const getTimelineFail = createAction('getTimelineFail');

const getTimeline = createThunkAction(
  'getTimeline',
  iso => (dispatch, state) => {
    const { timeline } = state();
    if (isEmpty(timeline.data[iso]) && !timeline.loading) {
      dispatch(getTimelineInit());
      fetch(`/api/v1/timeline/${iso}`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(getTimelineReady({ [iso]: data }));
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
