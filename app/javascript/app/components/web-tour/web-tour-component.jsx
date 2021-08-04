import React, { Fragment, useState } from 'react';
import Tour from 'reactour';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Icon from 'components/icon';
import rightArrow from 'assets/icons/right-arrow.svg';
import StepButton from './step-button';
import getSteps from './web-tour-data';
import styles from './web-tour-styles.scss';

const WebTour = ({ isOpen, location }, setOpen) => {
  const { pathname, search } = location;
  const [selectedStep, setSelectedStep] = useState();
  const steps = getSteps(pathname, setOpen);
  if (!steps) return null;
  return (
    <Fragment>
      {isOpen &&
        steps.map((step, i) => (
          <StepButton
            key={step.selector}
            stepIndex={i}
            selector={step.selector}
            goToStep={setSelectedStep}
            selectedStep={selectedStep}
          />
        ))}
      <Tour
        className={styles.webTour}
        steps={steps}
        isOpen={isOpen}
        showNumber={false}
        closeWithMask={false}
        showCloseButton={false}
        getCurrentStep={setSelectedStep}
        onAfterOpen={disableBodyScroll}
        onBeforeClose={enableBodyScroll}
        disableInteraction
        disableFocusLock
        goToStep={selectedStep}
        update={`${pathname}${search}`}
        nextButton={
          <button
            className={cx(styles.nextButton, {
              [styles.disabled]: selectedStep === steps.length - 1
            })}
            title="Next tour step"
            disabled={selectedStep === steps.length - 1}
          >
            <Icon icon={rightArrow} className={styles.arrow} />
          </button>
        }
        prevButton={
          <button
            className={cx(styles.prevButton, {
              [styles.disabled]: !selectedStep || selectedStep === 0
            })}
            title="Previous tour step"
            disabled={!selectedStep || selectedStep === 0}
          >
            <Icon
              icon={rightArrow}
              className={cx(styles.arrow, styles.leftArrow)}
            />
          </button>
        }
        rounded={5}
      />
    </Fragment>
  );
};

WebTour.propTypes = {
  isOpen: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

export default WebTour;
