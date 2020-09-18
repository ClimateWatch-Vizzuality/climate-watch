import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Modal from 'components/modal/modal-component';
import styles from './pop-up-styles.scss';

const PopUp = props => {
  const { showPopUp, handleOnRequestClose, hasBeenShown } = props;

  if (hasBeenShown || !showPopUp) return null;
  return (
    <Modal onRequestClose={handleOnRequestClose} isOpen theme={styles}>
      <div className={styles.popUpContent}>
        <h1>Sign Up for Updates</h1>
        <div>
          Keep current on the latest news from Climate Watch about new national
          climate commitments, long-term strategies and more.
        </div>
        <Button
          className={styles.button}
          onClick={handleOnRequestClose}
          link={'/about/contact'}
          variant="primary"
        >
          Sign Up
        </Button>
      </div>
    </Modal>
  );
};

PopUp.propTypes = {
  showPopUp: PropTypes.bool,
  hasBeenShown: PropTypes.bool,
  handleOnRequestClose: PropTypes.func.isRequired
};

export default PopUp;
