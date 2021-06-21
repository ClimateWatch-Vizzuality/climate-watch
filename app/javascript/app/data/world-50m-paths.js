import { feature } from 'topojson-client';

import topojsonWorld from 'app/data/world-50m-topo.json';
import topojsonChina from /* webpackChunkName: "world-geo-china" */ 'app/data/world-50m-china-topo.json';
import topojsonIndia from /* webpackChunkName: "world-geo-india" */ 'app/data/world-50m-india-topo.json';

const countryTopojsons = {
  CH: topojsonChina,
  IN: topojsonIndia
};

const getPaths = topojson =>
  feature(topojson, topojson.objects[Object.keys(topojson.objects)[0]])
    .features;

const getIPPaths = () => {
  const ipCountry = document.querySelector('meta[name="cw-user-country"]')
    .content;
  if (!ipCountry || !countryTopojsons[ipCountry]) {
    return getPaths(topojsonWorld);
  }
  return getPaths(countryTopojsons[ipCountry]);
};

export default getIPPaths;
