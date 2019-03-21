import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const BASE_URL = '/api/v1/updates';

const fetchLatestUpdatesInit = createAction('fetchLatestUpdatesInit');
const fetchLatestUpdatesReady = createAction('fetchLatestUpdatesReady');

const fetchLatestUpdates = createThunkAction(
  'fetchLatestUpdates',
  () => (dispatch, state) => {
    const { latestUpdates } = state();
    if (
      latestUpdates &&
      isEmpty(latestUpdates.data) &&
      !latestUpdates.loading
    ) {
      dispatch(fetchLatestUpdatesInit());
      fetch(BASE_URL)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(fetchLatestUpdatesReady({ data }));
        })
        .catch(error => console.info(error));
    }
  }
);

export default {
  fetchLatestUpdates,
  fetchLatestUpdatesInit,
  fetchLatestUpdatesReady
};
