import React from 'react';
import PropTypes from 'prop-types';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import Draggable from 'react-draggable';
import cx from 'classnames';
import throttle from 'lodash/throttle';
import Icon from 'components/icon';
import handleIcon from 'assets/icons/handle.svg';
import styles from './data-zoom.scss';

function DataZoom(props) {
  const {
    width,
    position,
    padding,
    data,
    handleDrag,
    handleStop,
    dataZoomRef
  } = props;

  const renderDraggable = handleType => {
    const GAP_BETWEEN_HANDLES = 15;
    const leftBound =
      handleType === 'min' ? 0 : position.min + GAP_BETWEEN_HANDLES;
    const rightBound =
      handleType === 'min'
        ? position.max - GAP_BETWEEN_HANDLES
        : width - padding;
    return (
      <Draggable
        axis="x"
        handle={`#handle${handleType}`}
        defaultPosition={{ x: position[handleType], y: 0 }}
        position={{ x: position[handleType], y: 0 }}
        onStop={handleStop}
        onDrag={throttle((_, ui) => handleDrag(ui, handleType), 50)}
        bounds={{ left: leftBound, right: rightBound }}
      >
        <div id={`handle${handleType}`} className={styles.handle}>
          <Icon icon={handleIcon} className={styles.handleIcon} />
        </div>
      </Draggable>
    );
  };

  const CENTER_HANDLE_PADDING = 7.5;
  if (!data) return null;
  return (
    <div className={styles.dataZoom} ref={dataZoomRef}>
      <div className={styles.selector}>
        <div
          className={styles.veil}
          style={{ width: position.min + CENTER_HANDLE_PADDING }}
        />
        <div
          className={styles.selectedPart}
          style={{
            width: position.max - position.min,
            left: position.min + CENTER_HANDLE_PADDING
          }}
        />
        <div
          className={cx(styles.veil, styles.right)}
          style={{
            width: width + CENTER_HANDLE_PADDING / 3 - padding - position.max
          }}
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
  data: PropTypes.array,
  padding: PropTypes.number,
  position: PropTypes.object,
  width: PropTypes.number,
  handleDrag: PropTypes.func.isRequired,
  handleStop: PropTypes.func.isRequired,
  dataZoomRef: PropTypes.object
};

export default DataZoom;
