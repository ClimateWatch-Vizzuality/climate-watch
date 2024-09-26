import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';
import mockup from './timeline.json';

const getNdc2025TimelineInit = createAction('getNdc2025TimelineInit');
const getNdc2025TimelineReady = createAction('getNdc2025TimelineReady');  

const getNdc2025Timeline = createThunkAction(
  'getNdc2025Timeline',
  () => (dispatch, state) => {
    const { regions } = state();
    if (regions && isEmpty(regions.data)) {
      dispatch(getNdc2025TimelineInit());
      dispatch(getNdc2025TimelineReady(mockup));
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
  getNdc2025Timeline,
  getNdc2025TimelineInit,
  getNdc2025TimelineReady
};
