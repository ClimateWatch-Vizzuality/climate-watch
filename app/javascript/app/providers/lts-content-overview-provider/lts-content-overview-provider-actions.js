import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const getLtsContentOverviewInit = createAction('getLtsContentOverviewInit');
const getLtsContentOverviewFail = createAction('getLtsContentOverviewFail');
const getLtsContentOverviewReady = createAction('getLtsContentOverviewReady');

const getLtsContentOverview = createThunkAction(
  'getLtsContentOverview',
  ({ locations }) => dispatch => {
    dispatch(getLtsContentOverviewInit());
    const promises = [];
    const locationsWithPromise = [];
    locations.forEach(location => {
      promises.push(
        fetch(`/api/v1/lts/${location}/content_overview`).then(response => {
          if (response.ok) {
            return response.json();
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
          getLtsContentOverviewReady({
            data: locationData,
            locations: locationsWithPromise
          })
        );
      })
      .catch(error => {
        console.warn(error);
        dispatch(getLtsContentOverviewFail());
      });
  }
);

export default {
  getLtsContentOverviewInit,
  getLtsContentOverviewFail,
  getLtsContentOverview,
  getLtsContentOverviewReady
};
