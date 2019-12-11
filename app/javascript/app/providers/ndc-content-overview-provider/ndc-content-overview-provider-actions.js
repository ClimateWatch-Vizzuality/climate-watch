import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const getNdcContentOverviewInit = createAction('getNdcContentOverviewInit');
const getNdcContentOverviewFail = createAction('getNdcContentOverviewFail');
const getNdcContentOverviewReady = createAction('getNdcContentOverviewReady');
const getNdcContentOverview = createThunkAction(
  'getNdcContentOverview',
  locations => (dispatch, getState) => {
    dispatch(getNdcContentOverviewInit());
    const promises = [];
    const locationsWithPromise = [];
    const { data } = getState().ndcContentOverview;
    locations.forEach(location => {
      if (!data || !data.locations[location]) {
        promises.push(
          fetch(`/api/v1/ndcs/${location}/content_overview`).then(response => {
            if (response.ok) {
              return response.json();
            }
            throw Error(response.statusText);
          })
        );
        locationsWithPromise.push(location);
      }
    });
    Promise.all(promises)
      .then(response => {
        const locationData = {};
        locationsWithPromise.forEach((l, index) => {
          locationData[l] = response[index];
        });
        dispatch(
          getNdcContentOverviewReady({
            data: locationData,
            locations: locationsWithPromise
          })
        );
      })
      .catch(error => {
        console.warn(error);
        dispatch(getNdcContentOverviewFail());
      });
  }
);

export default {
  getNdcContentOverviewInit,
  getNdcContentOverviewFail,
  getNdcContentOverview,
  getNdcContentOverviewReady
};
