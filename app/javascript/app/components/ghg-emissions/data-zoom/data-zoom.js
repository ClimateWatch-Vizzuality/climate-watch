import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import DataZoomComponent from './data-zoom-component';

const PADDING = 20;

function DataZoomContainer(props) {
  const { data, onYearChange, position = {}, setPosition, years } = props;

  const dataZoomRef = useRef();
  const [width, setWidth] = useState(0);

  // Set initial position and width
  useEffect(() => {
    if (dataZoomRef.current) {
      const debouncedSetWidth = debounce(
        () => setWidth(dataZoomRef.current.offsetWidth),
        500
      );

      const refWidth = dataZoomRef.current.offsetWidth;
      setWidth(refWidth);

      // Calculate initial position if we have year url params
      if (data && years && years.min > data[0].x) {
        position.min = getPosition(refWidth, years.min);
      }
      if (data && years && years.max < data[data.length - 1].x) {
        position.max = getPosition(refWidth, years.max);
      }

      setPosition({
        min: position.min,
        max: position.max || refWidth - PADDING
      });

      window.addEventListener('resize', debouncedSetWidth);
      return () => {
        window.removeEventListener('resize', debouncedSetWidth);
      };
    }
    return undefined;
  }, [dataZoomRef]);

  const getYear = handleType => {
    const steps = data && data.length - 1;
    const handleStep = (steps * position[handleType]) / (width - PADDING);
    const stepData = data && data[Math.floor(handleStep)];
    return stepData && stepData.x;
  };

  const getPosition = (elementWidth = width, year) => {
    if (!data || !elementWidth) return null;
    const max = elementWidth - PADDING;
    const steps = data && data.length - 1;
    const yearPositionLength = max / steps;
    const minYear = data[0].x;
    const yearPosition = (year - minYear) * yearPositionLength;
    return yearPosition;
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
  years: PropTypes.object,
  onYearChange: PropTypes.func.isRequired,
  position: PropTypes.object.isRequired,
  setPosition: PropTypes.func.isRequired
};

export default DataZoomContainer;
