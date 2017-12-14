import React from 'react';

const MyInsights = ({ insights }) => (
  <div>
    <h1>MyInsights</h1>
    <ul>{insights.data.map(i => <li>{JSON.stringify(i)}</li>)}</ul>
  </div>
);

export default MyInsights;
