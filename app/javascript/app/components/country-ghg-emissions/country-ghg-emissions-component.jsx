import React, { PureComponent } from 'react';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

import styles from './country-ghg-emissions-styles.scss';

const data = [
  {
    year: '1995',
    color: '#456786',
    waste: 868,
    landUse: 967,
    agriculture: 1506
  },
  {
    year: '2000',
    color: '#5c7d9a',
    waste: 1397,
    landUse: 1098,
    agriculture: 989
  },
  {
    year: '2005',
    color: '#99b5cd',
    waste: 3480,
    landUse: 1200,
    agriculture: 1228
  },
  {
    year: '2010',
    color: '#113750',
    waste: 2520,
    landUse: 1108,
    agriculture: 1100
  },
  {
    year: '2015',
    color: '#103d5c',
    waste: 590,
    landUse: 800,
    agriculture: 1400
  }
];

class Component extends PureComponent {
  render() {
    return (
      <div className={styles.wrapper}>
        <ResponsiveContainer width="100%" aspect={4 / 3}>
          <AreaChart data={data}>
            <XAxis dataKey="year" />
            <YAxis />
            <CartesianGrid />
            <Tooltip />
            <Area dataKey="waste" stroke="#103d5c" fill="#103d5c" />
            <Area dataKey="landUse" stroke="#99b5cd" fill="#99b5cd" />
            <Area dataKey="agriculture" stroke="#113750" fill="#113750" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default Component;
