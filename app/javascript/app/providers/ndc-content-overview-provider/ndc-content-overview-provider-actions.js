import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const getNdcContentOverviewInit = createAction('getNdcContentOverviewInit');
const getNdcContentOverviewFail = createAction('getNdcContentOverviewFail');
const getNdcContentOverviewReady = createAction('getNdcContentOverviewReady');
const getNdcContentOverview = createThunkAction(
  'getNdcContentOverview',
  locations => (dispatch, getState) => {
    dispatch(getNdcContentOverviewInit());
    if (locations.length > 0) {
      const promises = [];
      locations.forEach(location => {
        const existingLocationData =
          getState().NDCContentOverview.data &&
          getState().NDCContentOverview.data.locations[location];
        if (!existingLocationData || isEmpty(existingLocationData)) {
          promises.push(
            fetch(
              `/api/v1/ndcs/${location}/content_overview`
            ).then(response => {
              if (response.ok) return response.json();
              throw Error(response.statusText);
            })
          );
        }
      });

      Promise.all(promises)
        .then(data => {
          const locationData = {};
          locations.forEach((l, index) => {
            locationData[l] = data[index];
          });
          dispatch(
            getNdcContentOverviewReady({ data: locationData, locations })
          );
        })
        .catch(error => {
          console.warn(error);
          dispatch(getNdcContentOverviewFail());
        });
    }
  }
);

export default {
  getNdcContentOverviewInit,
  getNdcContentOverviewFail,
  getNdcContentOverview,
  getNdcContentOverviewReady
};
