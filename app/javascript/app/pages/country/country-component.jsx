import React from 'react';
import PropTypes from 'prop-types';

const Country = ({ match }) =>
  (<h1>
    Country: {match.params.iso}
  </h1>);

Country.propTypes = {
  match: PropTypes.object.isRequired
};

export default Country;
