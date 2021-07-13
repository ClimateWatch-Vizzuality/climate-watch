import React from 'react';
import Tour from 'reactour';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Icon from 'components/icon';
import rightArrow from 'assets/icons/right-arrow.svg';
import getSteps from './web-tour-data';
import styles from './web-tour-styles.scss';

const WebTour = props => {
  const {
    isOpen,
    setOpen,
    location: { pathname }
  } = props;
  const steps = getSteps(pathname, setOpen);
  if (!steps) return null;

  return (
    <Tour
      className={styles.webTour}
      steps={steps}
      isOpen={isOpen}
      showNumber={false}
      closeWithMask={false}
      showCloseButton={false}
      showNavigation={false}
      onAfterOpen={disableBodyScroll}
      onBeforeClose={enableBodyScroll}
      disableInteraction
      disableFocusLock
      nextButton={
        <button
          className={styles.nextButton}
          type="button"
          title="Next tour step"
        >
          <Icon icon={rightArrow} className={styles.arrow} />
        </button>
      }
      prevButton={
        <button
          className={styles.prevButton}
          type="button"
          title="Previous tour step"
        >
          <Icon
            icon={rightArrow}
            className={cx(styles.arrow, styles.leftArrow)}
          />
        </button>
      }
      rounded={5}
    />
  );
};

WebTour.propTypes = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

export default WebTour;
