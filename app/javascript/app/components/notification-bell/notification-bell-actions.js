import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';
import { apiWithCache } from 'services/api';

const fetchNotificationsInit = createAction('fetchNotificationsInit');
const fetchNotificationsReady = createAction('fetchNotificationsReady');
const fetchNotificationsFail = createAction('fetchNotificationsFail');

const fetchNotifications = createThunkAction(
  'fetchNotifications',
  () => (dispatch, state) => {
    const { notifications } = state();
    if (
      notifications &&
      isEmpty(notifications.data) &&
      !notifications.loading
    ) {
      dispatch(fetchNotificationsInit());
      apiWithCache
        .get('/api/v1/notifications')
        .then(response => {
          const { data } = response;
          dispatch(fetchNotificationsReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchNotificationsFail());
        });
    }
  }
);

export default {
  fetchNotifications,
  fetchNotificationsInit,
  fetchNotificationsReady,
  fetchNotificationsFail
};
