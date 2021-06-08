import { feature } from 'topojson-client';
import { createSelector } from 'reselect';

import topojsonWorld from 'app/data/world-50m-topo.json';
import topojsonChina from /* webpackChunkName: "world-geo-china" */ 'app/data/world-50m-china-topo.json';
import topojsonIndia from /* webpackChunkName: "world-geo-india" */ 'app/data/world-50m-india-topo.json';

const countryTopojsons = {
  china: topojsonChina,
  india: topojsonIndia
};

const getPaths = topojson =>
  feature(topojson, topojson.objects[Object.keys(topojson.objects)[0]])
    .features;

const getIpCountry = state => state.ipCountry && state.ipCountry.data;
const getIpCountryLoading = state => state.ipCountry && state.ipCountry.loading;
const getIpCountryError = state => state.ipCountry && state.ipCountry.error;

const getIPPaths = createSelector(
  [getIpCountryLoading, getIpCountry, getIpCountryError],
  (loading, ipCountry, error) => {
    if (loading && !error) return null;
    if (!ipCountry || !countryTopojsons[ipCountry]) {
      return getPaths(topojsonWorld);
    }
    return getPaths(countryTopojsons[ipCountry]);
  }
);

export default getIPPaths;
