import React from 'react';
import PropTypes from 'prop-types';

const Bar = ({ data, ...props }) => (
  <div
    {...props}
    style={{
      position: 'relative',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      width: '100px',
      height: '20px'
    }}
  >
    {data.map((d, i) => (
      <div
        key={`bar-${d}`}
        style={{
          height: `${d}px`,
          width: '10px',
          backgroundColor: 'red',
          position: 'absolute',
          left: `${i * 10}px`,
          bottom: 0
        }}
      />
    ))}
  </div>
);

Bar.propTypes = {
  data: PropTypes.array.isRequired
};

export default Bar;
