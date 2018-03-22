import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie as RePie, ResponsiveContainer, Cell } from 'recharts';

const getWidth = width => {
  const isPercent = width[width.length - 1] === '%';
  return isPercent ? '50%' : width / 2;
};

const Pie = ({ className, width, height, config }) => (
  <ResponsiveContainer className={className} width={width} height={height}>
    <PieChart>
      <RePie {...config.chart}>
        {config.chart.data.map(d => (
          <Cell key={d.key} fill={config.theme[d.key].fill} />
        ))}
      </RePie>
      <text x={getWidth(width)} y={config.chart.topLabel.y} textAnchor="middle">
        {config.chart.topLabel.text}
      </text>
    </PieChart>
  </ResponsiveContainer>
);

Pie.propTypes = {
  className: PropTypes.string,
  width: PropTypes.any,
  height: PropTypes.any,
  chart: PropTypes.PropTypes.object,
  config: PropTypes.object
};

Pie.defaultProps = {
  width: '100%',
  height: '300px'
};

export default Pie;
