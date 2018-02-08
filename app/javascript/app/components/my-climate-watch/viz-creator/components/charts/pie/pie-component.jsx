import React from 'react';
import { PieChart, Pie as RePie, ResponsiveContainer } from 'recharts';
import { excludekeys } from 'utils';
// <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 }
];

const defaultProps = {
  dataKey: 'value',
  nameKey: 'name',
  cx: '50%',
  cy: '50%',
  fill: '#8884d8'
};
const excluded = ['width', 'height'];

const Pie = props =>
  console.log({ ...defaultProps, ...excludekeys(excluded, props) }) || (
    <ResponsiveContainer {...{ ...props }}>
      <PieChart width={730} height={250}>
        <RePie
          {...{ ...defaultProps, ...excludekeys(excluded, props) }}
          data={data01}
        />
      </PieChart>
    </ResponsiveContainer>
  );

export default Pie;
