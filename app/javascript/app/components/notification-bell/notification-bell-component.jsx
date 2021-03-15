import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import bellIcon from 'assets/icons/bell.svg';
import NotificationModal from 'components/notification-modal';
import cx from 'classnames';
import styles from './notification-bell-styles.scss';

const NotificationBell = ({
  notifications,
  isModalOpen,
  setModalOpen,
  handleOnModalClose
}) => {
  const number = notifications ? notifications.length : 0;
  const hasNotifications = number > 0;
  return (
    <Fragment>
      <button
        onClick={hasNotifications ? () => setModalOpen(true) : undefined}
        className={cx(styles.notificationBellButton, {
          [styles.active]: hasNotifications
        })}
      >
        <Icon
          icon={bellIcon}
          className={styles.bellIcon}
          ariaLabel="notification button"
        />
        {number !== 0 && (
          <span
            className={cx(styles.badge, { [styles.moreThan99]: number > 99 })}
          >
            {number}
          </span>
        )}
      </button>
      <NotificationModal
        isOpen={isModalOpen}
        notifications={notifications}
        handleOnRequestClose={handleOnModalClose}
      />
    </Fragment>
  );
};

NotificationBell.propTypes = {
  notifications: PropTypes.array.isRequired,
  isModalOpen: PropTypes.bool,
  setModalOpen: PropTypes.func.isRequired,
  handleOnModalClose: PropTypes.func.isRequired
};

NotificationBell.defaultProps = {
  notifications: []
};

export default NotificationBell;
