import React from 'react';
import Header from 'components/header';
import Map from 'components/map';

import paths from 'app/data/world-50m-paths';

const NDC = () =>
  (<div>
    <Header />
    <Map paths={paths} zoomEnable />
  </div>);
export default NDC;
