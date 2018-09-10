import React from 'react';
import { ReferenceLine, Label } from 'recharts';
import { PropTypes } from 'prop-types';

const DividerLine = ({ x }) => (
  <ReferenceLine x={x} isFront={false}>
    <Label
      position="top"
      strokeWidth={0.5}
      content={content => (
        <g fill="#b1b1c1" style={{ fontSize: '0.9rem' }}>
          <text x={content.viewBox.x - 140} y="35">
            Historical emissions
          </text>
          <text x={content.viewBox.x + 12} y="35">
            Emission targets
          </text>
        </g>
      )}
    />
  </ReferenceLine>
);

DividerLine.propTypes = {
  x: PropTypes.number
};

export default DividerLine;
