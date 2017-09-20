import React, { PureComponent } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

// import styles from './ChartStackedarea-styles.scss';

const data = [
  { name: 'Item A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Item B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Item C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Item D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Item E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Item F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Item G', uv: 3490, pv: 4300, amt: 2100 }
];

class ChartStackedarea extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <AreaChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="amt"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
        />
      </AreaChart>
    );
  }
}

ChartStackedarea.propTypes = {};

export default ChartStackedarea;
