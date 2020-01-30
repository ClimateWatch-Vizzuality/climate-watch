import { feature } from 'topojson-client';
import { PATH_LAYERS } from 'app/data/constants';

import topojson from 'app/data/world-50m-topo.json';
import pointsTopojson from 'app/data/world-50m-points.json';

const paths = feature(
  topojson,
  topojson.objects[Object.keys(topojson.objects)[0]]
).features;

const largerPointLayerPaths = feature(
  pointsTopojson,
  pointsTopojson.objects[Object.keys(pointsTopojson.objects)[0]]
).features;

export const largerPointPaths = [
  ...paths.filter(p => p.properties.layer !== PATH_LAYERS.POINTS),
  ...largerPointLayerPaths
];

export default paths;
