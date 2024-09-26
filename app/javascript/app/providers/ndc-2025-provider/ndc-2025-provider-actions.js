import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import mockup from './mockup.json';

const get2025NdcTrackerInit = createAction('get2025NdcTrackerInit');
const get2025NdcTrackerReady = createAction('get2025NdcTrackerReady');
const get2025NdcTrackerFail = createAction('get2025NdcTrackerFail');

const get2025NdcTracker = createThunkAction(
  'get2025NdcTracker',
  iso => (dispatch, state) => {
    const { timeline } = state();
    if (!timeline.loading) {
      dispatch(get2025NdcTrackerInit());
      dispatch(get2025NdcTrackerReady(mockup));
      // fetch('/api/v1/data/ndc_content/timelines')
      //   .then(response => {
      //     if (response.ok) return response.json();
      //     throw Error(response.statusText);
      //   })
      //   .then(data => {
      //     dispatch(get2025NdcTrackerReady(data));
      //   })
      //   .catch(error => {
      //     console.info(error);
      //     dispatch(get2025NdcTrackerFail());
      //   });
    }
  }
);

export default {
  get2025NdcTracker,
  get2025NdcTrackerInit,
  get2025NdcTrackerReady
};
