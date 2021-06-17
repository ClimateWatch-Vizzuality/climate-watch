import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/modal/modal-component';
import Button from 'components/button';
import { replaceStringAbbr } from 'components/abbr-replace';
import styles from './notification-modal-styles.scss';

const NotificationModal = props => {
  const { isOpen, handleOnRequestClose, notifications } = props;
  if (!isOpen) return null;
  return (
    <Modal onRequestClose={handleOnRequestClose} isOpen theme={styles}>
      <h2 className={styles.modalTitle}>Latest Climate Watch Updates</h2>
      <div className={styles.notificationModalContent}>
        {notifications &&
          notifications.map(n => (
            <div className={styles.notification}>
              <span className={styles.date}>{n.date} - </span>
              <span
                className={styles.description}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: replaceStringAbbr(n.description)
                }}
              />
            </div>
          ))}
      </div>
      <div className={styles.footer}>
        <Button
          className={styles.button}
          link="/about/contact"
          onClick={handleOnRequestClose}
          variant="primary"
        >
          Subscribe to Updates
        </Button>
      </div>
    </Modal>
  );
};

NotificationModal.propTypes = {
  isOpen: PropTypes.bool,
  notifications: PropTypes.array,
  handleOnRequestClose: PropTypes.func.isRequired
};

export default NotificationModal;
