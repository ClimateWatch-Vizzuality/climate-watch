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
  const number = notifications ? notifications.length : 0;
  const hasNotifications = number > 0;
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
  isModalOpen: PropTypes.bool,
  setModalOpen: PropTypes.func,
  handleTooltipHasShown: PropTypes.func,
  tooltipHasShown: PropTypes.bool.isRequired,
  handleOnModalClose: PropTypes.func.isRequired
};

NotificationBell.defaultProps = {
  notifications: [],
  tooltipHasShown: true // so it doesn't show by default
};

export default NotificationBell;
