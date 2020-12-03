import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Modal from 'components/modal/modal-component';
import styles from './webinar-countdown-pop-up-styles.scss';

const WebinarCountdownPopUp = props => {
  const { showPopUp, handleOnRequestClose, hasBeenShown } = props;

  if (hasBeenShown || !showPopUp) return null;
  return (
    <Modal onRequestClose={handleOnRequestClose} isOpen theme={styles}>
      <div className={styles.popUpContent}>
        <div className={styles.popUpTitleContainer}>
          <h1 className={styles.popUpTitle}>
            Join Us - Webinar for National Governments
          </h1>
        </div>
        <div className={styles.popUpAction}>
          <div>Data Tools for Assessing New National Commitments</div>
          <div>December 10, 7:00am EST (1pm CET)</div>
          <Button
            className={styles.button}
            onClick={handleOnRequestClose}
            href={
              'https://www.wri.org/events/2020/12/data-tools-assessing-new-national-climate-commitments'
            }
            target="_blank"
            variant="primary"
          >
            Register now
          </Button>
        </div>
      </div>
    </Modal>
  );
};

WebinarCountdownPopUp.propTypes = {
  showPopUp: PropTypes.bool,
  hasBeenShown: PropTypes.bool,
  handleOnRequestClose: PropTypes.func.isRequired
};

export default WebinarCountdownPopUp;
