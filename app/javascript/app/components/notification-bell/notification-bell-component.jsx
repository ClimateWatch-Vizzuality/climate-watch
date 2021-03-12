import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import bellIcon from 'assets/icons/bell.svg';

import styles from './notification-bell-styles.scss';

const NotificationBell = ({ notifications }) => {
  const number = notifications.length;
  return (
    <button onClick={() => {}} className={styles.notificationBell}>
      <Icon
        icon={bellIcon}
        className={styles.bellIcon}
        ariaLabel="notification button"
      />
      {number !== 0 && <span className={styles.badge}>{number}</span>}
    </button>
  );
};

NotificationBell.propTypes = {
  notifications: PropTypes.array.isRequired
};

NotificationBell.defaultProps = {
  notifications: []
};

export default NotificationBell;
