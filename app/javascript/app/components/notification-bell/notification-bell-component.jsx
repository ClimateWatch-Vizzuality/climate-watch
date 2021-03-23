import React, { Fragment, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import bellIcon from 'assets/icons/bell.svg';
import NotificationModal from 'components/notification-modal';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import styles from './notification-bell-styles.scss';

const NotificationBell = ({
  notifications,
  notificationAlertsNumber,
  isModalOpen,
  setModalOpen,
  handleOnModalClose,
  handleTooltipHasShown,
  tooltipHasShown
}) => {
  const bellRef = useRef();
  useEffect(() => {
    if (!tooltipHasShown && bellRef.current) {
      ReactTooltip.show(bellRef.current);
    }
  }, [tooltipHasShown, bellRef]);
  const hasNotifications = notifications && notifications.length > 0;
  const hasNotificationAlerts = notificationAlertsNumber
    ? notificationAlertsNumber > 0
    : false;
  return (
    <Fragment>
      <button
        onMouseEnter={handleTooltipHasShown}
        onClick={hasNotifications ? () => setModalOpen(true) : undefined}
        className={cx(styles.notificationBellButton, {
          [styles.active]: hasNotifications
        })}
      >
        <div data-tip data-for="notification-bell" ref={bellRef}>
          <Icon
            icon={bellIcon}
            className={styles.bellIcon}
            ariaLabel="notification button"
          />
        </div>
        {hasNotificationAlerts && (
          <span
            className={cx(styles.badge, {
              [styles.moreThan9]: notificationAlertsNumber > 9,
              [styles.moreThan99]: notificationAlertsNumber > 99
            })}
          >
            {notificationAlertsNumber}
          </span>
        )}
      </button>
      <NotificationModal
        isOpen={isModalOpen}
        notifications={notifications}
        handleOnRequestClose={handleOnModalClose}
      />
      <ReactTooltip
        id="notification-bell"
        className={styles.tooltip}
        effect="solid"
        place="bottom"
        data-event="fakeEvent"
        disable={tooltipHasShown}
      >
        <h5 className={styles.tooltipTitle}>NEW!</h5>
        <p>
          Get notified of the latest NDCs and LTS submissions as when they
          become available
        </p>
      </ReactTooltip>
    </Fragment>
  );
};

NotificationBell.propTypes = {
  notifications: PropTypes.array,
  notificationAlertsNumber: PropTypes.number,
  isModalOpen: PropTypes.bool,
  setModalOpen: PropTypes.func,
  handleTooltipHasShown: PropTypes.func,
  tooltipHasShown: PropTypes.bool.isRequired,
  handleOnModalClose: PropTypes.func.isRequired
};

NotificationBell.defaultProps = {
  notifications: [],
  notificationAlertsNumber: 0,
  tooltipHasShown: true // so it doesn't show by default
};

export default NotificationBell;
