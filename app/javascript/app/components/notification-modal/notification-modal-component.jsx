import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/modal/modal-component';
import styles from './notification-modal-styles.scss';

const NotificationModal = props => {
  const { isOpen, handleOnRequestClose, notifications } = props;
  if (!isOpen) return null;
  return (
    <Modal onRequestClose={handleOnRequestClose} isOpen theme={styles}>
      <div className={styles.notificationModalContent}>
        <h2 className={styles.modalTitle}>
          Latest country commitments updates
        </h2>
        {notifications &&
          notifications.map(n => (
            <div className={styles.notification}>
              <span className={styles.date}>{n.date} -</span>
              <span
                className={styles.description}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: n.description }}
              />
            </div>
          ))}
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
