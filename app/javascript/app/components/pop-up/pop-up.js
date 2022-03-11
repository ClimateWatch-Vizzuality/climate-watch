import { createElement, useState, useEffect } from 'react';
import { POP_UP_SHOWN } from 'data/constants';
import DefaultPopUp from './pop-up-component';
import webinarCountdown from './webinar-countdown-pop-up-component';

const TEMPORARY_POP_UP_NAME = process.env.POP_UP;
const popUpName = TEMPORARY_POP_UP_NAME || POP_UP_SHOWN;
const TemporaryPopUpComponent = { webinarCountdown }[TEMPORARY_POP_UP_NAME];

const PopUpContainer = props => {
  const [hasBeenShown, setHasBeenShown] = useState(
    JSON.parse(localStorage.getItem(popUpName))
  );
  const [isStale, setStale] = useState(false);
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
  const Component = (!isStale && TemporaryPopUpComponent) || DefaultPopUp;
  return createElement(Component, {
    showPopUp,
    hasBeenShown,
    handleOnRequestClose,
    setStale,
    props
  });
};

export default PopUpContainer;
