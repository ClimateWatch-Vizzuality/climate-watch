import { createElement, useState, useEffect } from 'react';
import { POP_UP_SHOWN } from 'data/constants';
import Component from './pop-up-component';

const PopUpContainer = () => {
  const [hasBeenShown, setHasBeenShown] = useState(
    JSON.parse(localStorage.getItem(POP_UP_SHOWN))
  );
  const [showPopUp, setShowPopUp] = useState(false);

  const handleOnRequestClose = () => {
    setHasBeenShown(true);
    localStorage.setItem(POP_UP_SHOWN, 'true');
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
