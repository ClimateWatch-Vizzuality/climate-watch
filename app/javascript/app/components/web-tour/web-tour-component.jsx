import React from 'react';
import Tour from 'reactour';
import PropTypes from 'prop-types';
import getSteps from './web-tour-data';

const WebTour = ({ isOpen, setOpen, slug }) => {
  const steps = getSteps(slug, setOpen);
  if (!steps) return null;
  return (
    <Tour
      className={'c-web-tour'}
      steps={steps}
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
      showNumber={false}
      showCloseButton={false}
      rounded={5}
    />
  );
};

WebTour.propTypes = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  slug: PropTypes.string
};

export default WebTour;
