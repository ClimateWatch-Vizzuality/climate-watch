import React from 'react';
import Tour from 'reactour';
import PropTypes from 'prop-types';

const WebTour = ({ isOpen, setOpen }) => {
  const steps = [
    {
      selector: '[data-tour="step-01"]',
      content: () => <div>Look at your step Video!</div>
    },
    {
      selector: '[data-tour="step-02"]',
      content: () => <div>Look at your step 2!</div>
    }
  ];
  return (
    <Tour
      className={'c-web-tour'}
      steps={steps}
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
    />
  );
};

WebTour.propTypes = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func.isRequired
};

WebTour.defaultProps = {
  isTourOpen: true
};

export default WebTour;
