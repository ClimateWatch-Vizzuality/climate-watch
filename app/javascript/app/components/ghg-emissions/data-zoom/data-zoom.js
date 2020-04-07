import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import DataZoomComponent from './data-zoom-component';

const PADDING = 20;

function DataZoomContainer(props) {
  const { data, onYearChange } = props;

  const steps = data && data.length - 1;

  const dataZoomRef = useRef();
  const [width, setWidth] = useState(0);
  const [position, setPosition] = useState({ min: 0, max: width - PADDING });

  useEffect(() => {
    if (dataZoomRef.current) {
      const debouncedSetWidth = debounce(
        () => setWidth(dataZoomRef.current.offsetWidth),
        500
      );

      const refWidth = dataZoomRef.current.offsetWidth;
      setWidth(refWidth);
      setPosition({
        ...position,
        max: refWidth - PADDING
      });

      window.addEventListener('resize', debouncedSetWidth);
      return () => {
        window.removeEventListener('resize', debouncedSetWidth);
      };
    }
    return undefined;
  }, [dataZoomRef]);

  const getYear = handleType => {
    const handleStep = (steps * position[handleType]) / (width - PADDING);
    const stepData = data && data[Math.floor(handleStep)];
    return stepData && stepData.x;
  };

  const handleStop = () => {
    onYearChange(getYear('min'), getYear('max'));
  };

  const handleDrag = (ui, handleType) =>
    setPosition({
      ...position,
      [handleType]: position[handleType] + ui.deltaX
    });

  return React.createElement(DataZoomComponent, {
    dataZoomRef,
    position,
    handleDrag,
    handleStop,
    padding: PADDING,
    width,
    data
  });
}

DataZoomContainer.propTypes = {
  data: PropTypes.array,
  onYearChange: PropTypes.func.isRequired
};

export default DataZoomContainer;
