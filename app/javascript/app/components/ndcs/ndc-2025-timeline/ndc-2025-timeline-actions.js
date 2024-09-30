import { createAction } from 'redux-actions';
import { apiWithCache } from 'services/api';
import { createThunkAction } from 'utils/redux';

const countryTimelineAction = createAction('countryTimelineAction');

const fetchCountryTimelineInit = createAction('fetchCountryTimelineInit');
const fetchCountryTimelineFail = createAction('fetchCountryTimelineFail');

const fetchCountryTimelineDataReady = createAction(
  'fetchCountryTimelineDataReady'
);
const fetchCountryTimelineData = createThunkAction(
  'fetchCountryTimelineData',
  () => dispatch => {
    dispatch(fetchCountryTimelineInit());

    apiWithCache
    .get('/api/v1/data/ndc_content/timelines')
    .then(response => {
      if (response.data) return response.data;
      throw Error(response.statusText);
    }).then(d => {
      const data = Array.isArray(d) ? d : Array.isArray(d.data) ? d.data : [];
      dispatch(fetchCountryTimelineDataReady(data));
    })
    .catch(error => {
      console.warn(error);
      console.info('error', error);
      dispatch(fetchCountryTimelineFail());
    });
  }
);

export default {
  fetchCountryTimelineInit,
  fetchCountryTimelineFail,
  fetchCountryTimelineData,
  fetchCountryTimelineDataReady,
  countryTimelineAction
};
