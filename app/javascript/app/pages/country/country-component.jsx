import React from 'react';
import Proptypes from 'proptypes';

const Country = ({ match }) =>
  (<h1>
    Country: {match.params.iso}
  </h1>);

Country.propTypes = {
  match: Proptypes.object.isRequired
};

export default Country;
