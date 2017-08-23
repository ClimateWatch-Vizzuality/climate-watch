import React from 'react';
import Proptypes from 'prop-types';
import Header from 'components/header';
import Map from 'components/map';

import paths from 'app/data/world-50m-paths';

const NDC = (props) => {
  const handleCountryClick = (geography) => {
    props.history.push(`ndcs/${geography.id}`);
  };

  return (
    <div>
      <Header />
      <Map paths={paths} zoomEnable onCountryClick={handleCountryClick} />
    </div>
  );
};

NDC.propTypes = {
  history: Proptypes.object.isRequired
};

export default NDC;
