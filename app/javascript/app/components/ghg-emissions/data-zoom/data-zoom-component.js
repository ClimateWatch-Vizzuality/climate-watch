import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import Draggable from 'react-draggable';
import cx from 'classnames';
import debounce from 'lodash/debounce';
import styles from './data-zoom.scss';

function DataZoom(props) {
  const { data } = props;
  const steps = data && data.length - 1;
  const dataZoomRef = useRef();
  const [width, setWidth] = useState(0);
  const PADDING = 20;
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

  const handleStop = () => {
    const getYear = handleType => {
      const handleStep = (steps * position[handleType]) / (width - PADDING);
      const stepData = data && data[Math.floor(handleStep)];
      return stepData && stepData.x;
    };

    console.info(getYear('min'), getYear('max'));
  };

  const handleDrag = (ui, handleType) =>
    setPosition({
      ...position,
      [handleType]: position[handleType] + ui.deltaX
    });

  const renderDraggable = handleType => {
    const GAP_BETWEEN_HANDLES = 25;
    const leftBound =
      handleType === 'min' ? 0 : position.min + GAP_BETWEEN_HANDLES;
    const rightBound =
      handleType === 'min'
        ? position.max - GAP_BETWEEN_HANDLES
        : width - PADDING;
    return (
      <Draggable
        axis="x"
        handle={`#handle${handleType}`}
        grid={[steps, 0]}
        defaultPosition={{ x: position[handleType], y: 0 }}
        position={{ x: position[handleType], y: 0 }}
        onStop={handleStop}
        onDrag={(_, ui) => handleDrag(ui, handleType)}
        bounds={{ left: leftBound, right: rightBound }}
      >
        <div id={`handle${handleType}`} className={styles.handle} />
      </Draggable>
    );
  };

  return (
    <div className={styles.dataZoom} ref={dataZoomRef}>
      <div className={styles.selector}>
        <div className={styles.veil} style={{ width: position.min }} />
        <div
          className={styles.selectedPart}
          style={{ width: position.max - position.min, left: position.min }}
        />
        <div
          className={cx(styles.veil, styles.right)}
          style={{ width: width - PADDING - position.max }}
        />
        {renderDraggable('min')}
        {renderDraggable('max')}
      </div>
      <ResponsiveContainer height={35}>
        <AreaChart data={data}>
          <Area dataKey="total" stroke="#333" strokeWidth="2" fill="#868697" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

DataZoom.propTypes = {
  data: PropTypes.array
};

export default DataZoom;
