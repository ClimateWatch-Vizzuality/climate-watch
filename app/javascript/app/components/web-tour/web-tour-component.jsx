import React from 'react';
import Tour from 'reactour';
import PropTypes from 'prop-types';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
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
      onAfterOpen={disableBodyScroll}
      onBeforeClose={enableBodyScroll}
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
