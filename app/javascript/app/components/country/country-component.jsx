import React from 'react';

const Country = ({ match }) =>
  (<h1>
    Country: {match.params.iso}
  </h1>);
export default Country;
