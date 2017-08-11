import React from 'react';
import Header from 'components/header';
import Map from 'components/map';

import { feature } from 'topojson-client';
import geoData from 'app/data/world-50m.json';

const paths = feature(geoData, geoData.objects[Object.keys(geoData.objects)[0]])
  .features;

const NDC = () =>
  (<div>
    <Header />
    <Map paths={paths} />
  </div>);
export default NDC;
