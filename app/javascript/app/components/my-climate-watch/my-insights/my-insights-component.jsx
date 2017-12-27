import React from 'react';
import PropTypes from 'prop-types';

const MyInsights = ({ insights }) => (
  <div>
    <h1>MyInsights</h1>
    <ul>{insights.map(i => <li>{JSON.stringify(i)}</li>)}</ul>
  </div>
);

MyInsights.propTypes = {
  insights: PropTypes.array
};

export default MyInsights;
