import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const fetchCountryNdcOverviewInit = createAction('fetchCountryNdcOverviewInit');
const fetchCountryNdcOverviewFail = createAction('fetchCountryNdcOverviewFail');

const fetchCountryNdcOverviewDataReady = createAction(
  'fetchCountryNdcOverviewDataReady'
);
const fetchCountryNdcOverviewData = createThunkAction(
  'fetchCountryNdcOverviewData',
  iso => dispatch => {
    dispatch(fetchCountryNdcOverviewInit());
    fetch(`/api/v1/ndcs/${iso}/content_overview`)
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(data => {
        const countryData = {
          iso,
          data
        };
        dispatch(fetchCountryNdcOverviewDataReady(countryData));
      })
      .catch(error => {
        console.warn(error);
        dispatch(fetchCountryNdcOverviewFail(iso));
      });
  }
);

export default {
  fetchCountryNdcOverviewInit,
  fetchCountryNdcOverviewFail,
  fetchCountryNdcOverviewData,
  fetchCountryNdcOverviewDataReady
};
