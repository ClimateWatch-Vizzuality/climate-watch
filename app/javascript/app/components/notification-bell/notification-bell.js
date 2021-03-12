import { useEffect, createElement, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import Component from './notification-bell-component';
import getStateProps from './notification-bell-selectors';
import actions from './notification-bell-actions';
import reducers, { initialState } from './notification-bell-reducers';

const NOTIFICATIONS_LAST_DATE_SHOWN = 'notificationsLastDateShown';

const NotificationBellContainer = props => {
  const { fetchNotifications, notifications } = props;
  const [lastDateShown, setLastDateShown] = useState(
    localStorage.getItem(NOTIFICATIONS_LAST_DATE_SHOWN)
  );
  const [filteredNotifications, setFilteredNotifications] = useState(
    notifications
  );
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const updatedNotifications =
      notifications &&
      (lastDateShown
        ? notifications.filter(n => n.date > lastDateShown)
        : notifications);
    setFilteredNotifications(updatedNotifications);
  }, [lastDateShown, notifications, setFilteredNotifications]);

  const handleOnModalClose = () => {
    const today = moment().format('YYYY-MM-DD');
    setLastDateShown(today);
    localStorage.setItem(NOTIFICATIONS_LAST_DATE_SHOWN, today);
    setModalOpen(false);
  };

  return createElement(Component, {
    ...props,
    setLastDateShown,
    notifications: filteredNotifications,
    isModalOpen,
    setModalOpen,
    handleOnModalClose
  });
};

NotificationBellContainer.propTypes = {
  fetchNotifications: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default connect(getStateProps, actions)(NotificationBellContainer);
