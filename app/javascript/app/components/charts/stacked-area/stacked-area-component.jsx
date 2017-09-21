import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

class ChartStackedarea extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { config, data } = this.props;
    return (
      <AreaChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="x" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        {config.columns.y.map(column => (
          <Area
            key={column}
            type="monotone"
            dataKey={column}
            stackId="1"
            stroke={config.theme[column].stroke || ''}
            fill={config.theme[column].fill || ''}
          />
        ))}
      </AreaChart>
    );
  }
}

ChartStackedarea.propTypes = {
  config: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
};

export default ChartStackedarea;
