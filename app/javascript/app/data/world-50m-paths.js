import { feature } from 'topojson-client';

// import topojson from 'app/data/world-50m-topo.json';
import topojson from /* webpackChunkName: "world-geo-china" */ 'app/data/world-50m-china-topo.json';

const paths = feature(
  topojson,
  topojson.objects[Object.keys(topojson.objects)[0]]
).features;

export default paths;
