import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';
import mockup from './timeline.json';

const getTimelineInit = createAction('getNdc2025TimelineInit');
const getTimelineReady = createAction('getNdc2025TimelineReady');

const getTimeline = createThunkAction(
  'getNdc2025Timeline',
  () => (dispatch, state) => {
    const { regions } = state();
    if (regions && isEmpty(regions.data)) {
      dispatch(getTimelineInit());
      dispatch(getTimelineReady(mockup));
      // fetch(
      //   '/api/v1/...'
      // )
      // .then(response => {
      //   if (response.ok) return response.json();
      //   throw Error(response.statusText);
      // })
      // .then(data => {
      //   dispatch(getTimelineReady(data));
      // });
      // .catch(error => {
      //   console.info(error);
      // });
    }
  }
);

export default {
  getTimeline,
  getTimelineInit,
  getTimelineReady
};
