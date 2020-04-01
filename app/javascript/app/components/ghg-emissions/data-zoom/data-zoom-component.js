import React from 'react';
import PropTypes from 'prop-types';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

function DataZoom(props) {
  const { data } = props;
  return (
    <React.Fragment>
      <ResponsiveContainer height={35}>
        <AreaChart data={data}>
          <Area dataKey="total" stroke="#333" strokeWidth="2" fill="#868697" />
        </AreaChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

DataZoom.propTypes = {
  data: PropTypes.array
};

export default DataZoom;
