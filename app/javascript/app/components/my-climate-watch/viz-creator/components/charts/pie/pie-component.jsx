import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie as RePie, ResponsiveContainer, Cell } from 'recharts';

const Pie = ({ className, width, height, config }) => (
  <ResponsiveContainer className={className} width={width} height={height}>
    <PieChart>
      <RePie {...config.chart}>
        {config.chart.data.map(d => (
          <Cell key={d.key} fill={config.theme[d.key].fill} />
        ))}
      </RePie>
    </PieChart>
  </ResponsiveContainer>
);

Pie.propTypes = {
  className: PropTypes.string,
  width: PropTypes.any.isRequired,
  height: PropTypes.any.isRequired,
  chart: PropTypes.PropTypes.object,
  config: PropTypes.object
};

export default Pie;
