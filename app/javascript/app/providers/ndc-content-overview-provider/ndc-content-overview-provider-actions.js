import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import { apiWithCache } from 'services/api';

const getNdcContentOverviewInit = createAction('getNdcContentOverviewInit');
const getNdcContentOverviewFail = createAction('getNdcContentOverviewFail');
const getNdcContentOverviewReady = createAction('getNdcContentOverviewReady');

const getNdcContentOverview = createThunkAction(
  'getNdcContentOverview',
  ({ locations, document }) => dispatch => {
    dispatch(getNdcContentOverviewInit());
    const promises = [];
    const locationsWithPromise = [];
    locations.forEach(location => {
      const documentParam = document ? `?document=${document}` : '';
      promises.push(
        apiWithCache
          .get(`/api/v1/ndcs/${location}/content_overview${documentParam}`)
          .then(response => {
            if (response.data) {
              return response.data;
            }
            throw Error(response.statusText);
          })
      );
      locationsWithPromise.push(location);
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
