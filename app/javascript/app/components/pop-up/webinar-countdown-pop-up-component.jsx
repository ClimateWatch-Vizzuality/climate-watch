import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import Button from 'components/button';
import Modal from 'components/modal/modal-component';
import Countdown from 'react-countdown';
import styles from './webinar-countdown-pop-up-styles.scss';

const WebinarCountdownPopUp = props => {
  const { showPopUp, handleOnRequestClose, hasBeenShown, setStale } = props;

  if (hasBeenShown || !showPopUp) return null;

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      setStale(true);
      return null;
    }
    const zeroPad = number =>
      (parseInt(number, 10) < 10 ? `0${number}` : number);
    return (
      <div className={styles.countdown}>
        <div>
          <div className={styles.countNumber}>{zeroPad(days)}</div>
          <div className={styles.countText}>Days</div>
        </div>
        <div>
          <div className={styles.countNumber}>{zeroPad(hours)}</div>
          <div className={styles.countText}>Hours</div>
        </div>
        <div>
          <div className={styles.countNumber}>{zeroPad(minutes)}</div>
          <div className={styles.countText}>Minutes</div>
        </div>
        <div>
          <div className={styles.countNumber}>{zeroPad(seconds)}</div>
          <div className={styles.countText}>Seconds</div>
        </div>
      </div>
    );
  };

  countdownRenderer.propTypes = {
    days: PropTypes.string,
    hours: PropTypes.string,
    minutes: PropTypes.string,
    seconds: PropTypes.string,
    completed: PropTypes.bool
  };
  return (
    <Modal onRequestClose={handleOnRequestClose} isOpen theme={styles}>
      <div className={styles.popUpContent}>
        <div className={styles.popUpTitleContainer}>
          <h1 className={styles.popUpTitle}>
            Join Us - Webinar for National Governments
          </h1>
          <Countdown
            now={() => moment.utc(moment())}
            date={moment.utc(moment.tz('2020-12-10T07:00:00', 'EST'))}
            renderer={countdownRenderer}
          />
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
  handleOnRequestClose: PropTypes.func.isRequired,
  setStale: PropTypes.func.isRequired
};

export default WebinarCountdownPopUp;
