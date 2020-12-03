import { createElement, useState, useEffect } from 'react';
import { POP_UP_SHOWN } from 'data/constants';
import DefaultPopUp from './pop-up-component';
import webinarCountdown from './webinar-countdown-pop-up-component';

const TEMPORARY_POP_UP_NAME = process.env.POP_UP;
const popUpName = TEMPORARY_POP_UP_NAME || POP_UP_SHOWN;
const Component =
  {
    webinarCountdown
  }[TEMPORARY_POP_UP_NAME] || DefaultPopUp;

const PopUpContainer = () => {
  const [hasBeenShown, setHasBeenShown] = useState(
    JSON.parse(localStorage.getItem(popUpName))
  );
  const [showPopUp, setShowPopUp] = useState(false);

  const handleOnRequestClose = () => {
    setHasBeenShown(true);
    localStorage.setItem(popUpName, 'true');
  };

  useEffect(() => {
    if (!hasBeenShown) {
      setTimeout(() => setShowPopUp(true), 5000);
    }
  }, []);

  return createElement(Component, {
    showPopUp,
    hasBeenShown,
    handleOnRequestClose,
    ...this.props
  });
};

export default PopUpContainer;
