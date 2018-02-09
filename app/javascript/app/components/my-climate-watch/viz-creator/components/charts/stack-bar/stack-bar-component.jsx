import React from 'react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';

const data = [
  { year: '2001', uv: 4000, pv: 2400, amt: 2400 },
  { year: '2002', uv: 3000, pv: 1398, amt: 2210 },
  { year: '2003', uv: 2000, pv: 9800, amt: 2290 },
  { year: '2004', uv: 2780, pv: 3908, amt: 2000 },
  { year: '2005', uv: 1890, pv: 4800, amt: 2181 },
  { year: '2006', uv: 2390, pv: 3800, amt: 2500 },
  { year: '2007', uv: 3490, pv: 4300, amt: 2100 }
];

const StackedBarChart = (props) => console.log(props) || (
  <BarChart
    width={600}
    height={300}
    data={data}
    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    {...{ props }}
  >
    <XAxis dataKey="year" />
    <YAxis />
    <Bar dataKey="pv" stackId="a" fill="#8884d8" />
    <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
  </BarChart>
);

export default StackedBarChart;
