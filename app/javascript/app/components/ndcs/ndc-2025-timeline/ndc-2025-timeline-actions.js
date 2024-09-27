import { createAction } from 'redux-actions';
// import apiWithCache from 'services/api';
import { createThunkAction } from 'utils/redux';

// Remove when we have the real data
const mockData = [
  {
    location_id: 96,
    submission: 'MySubmission',
    date: '2024-10-03',
    url: 'http://internet.tld/path/file.ext',
    location: {
      iso_code3: 'AAB',
      pik_name: 'MyText',
      cait_name: 'MyText',
      ndcp_navigators_name: 'MyText',
      wri_standard_name: 'Country 2',
      unfccc_group: 'MyText',
      centroid: null,
      is_in_eu: null
    }
  },
  {
    location_id: 97,
    submission: 'MySubmission',
    date: '2024-11-03',
    url: 'http://internet.tld/path/file.ext',
    location: {
      iso_code3: 'AAC',
      pik_name: 'MyText',
      cait_name: 'MyText',
      ndcp_navigators_name: 'MyText',
      wri_standard_name: 'Country 3',
      unfccc_group: 'MyText',
      centroid: null,
      is_in_eu: null
    }
  },
  {
    location_id: 98,
    submission: 'MySubmission',
    date: '2024-09-03',
    url: 'http://internet.tld/path/file.ext',
    location: {
      iso_code3: 'AAD',
      pik_name: 'MyText',
      cait_name: 'MyText',
      ndcp_navigators_name: 'MyText',
      wri_standard_name: 'Country 1',
      unfccc_group: 'MyText',
      centroid: null,
      is_in_eu: null
    }
  },
  {
    location_id: 98,
    submission: 'MySubmission',
    date: '2024-09-03',
    url: 'http://internet.tld/path/file.ext',
    location: {
      iso_code3: 'AAD',
      pik_name: 'MyText',
      cait_name: 'MyText',
      ndcp_navigators_name: 'MyText',
      wri_standard_name: 'Country 4',
      unfccc_group: 'MyText',
      centroid: null,
      is_in_eu: null
    }
  }
];

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

    // Replace with the real API call

    // apiWithCache
    // .get('/api/v1/ndcs-2025-country-timeline')
    // .then(response => {
    //   if (response.data) return response.data;
    //   throw Error(response.statusText);
    // }).then(data => {
    dispatch(fetchCountryTimelineDataReady(mockData));
    // })
    // .catch(error => {
    //   console.warn(error);
    //   console.info('error', error);
    //   dispatch(fetchCountryTimelineFail());
    // });
  }
);

export default {
  fetchCountryTimelineInit,
  fetchCountryTimelineFail,
  fetchCountryTimelineData,
  fetchCountryTimelineDataReady,
  countryTimelineAction
};
