import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './step-button-styles';

const WebTourElement = ({ selector, goToStep, stepIndex, selectedStep }) => {
  const [element, setElement] = useState();
  const [position, setPosition] = useState();
  useEffect(() => {
    const queriedElement = document.querySelector(selector);
    if (queriedElement) {
      setElement(queriedElement);
    }
    return undefined;
  }, []);

  useEffect(() => {
    if (element) {
      setPosition(element.getBoundingClientRect());
    }
    return undefined;
  }, [element]);

  const { top, left } = position || {};

  if (!element) return null;
  return (
    <button
      onClick={() => goToStep(stepIndex)}
      className={cx(styles.stepButton, {
        [styles.active]: selectedStep === stepIndex
      })}
      style={{
        top: window.scrollY + top + 10,
        left
      }}
    />
  );
};

WebTourElement.propTypes = {
  selector: PropTypes.string,
  stepIndex: PropTypes.number,
  goToStep: PropTypes.func.isRequired,
  selectedStep: PropTypes.number
};

export default WebTourElement;
