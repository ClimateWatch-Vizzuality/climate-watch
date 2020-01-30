import { PATH_LAYERS, MIN_ZOOM_SHOW_ISLANDS } from 'app/data/constants';

const buckets = [
  ['#EEBC8F', '#25597C'],
  ['#EEBC8F', '#FEE08D', '#25597C'],
  ['#EEBC8F', '#FEE08D', '#5081A6', '#25597C'],
  ['#EEBC8F', '#FEE08D', '#ACBBBF', '#5081A6', '#25597C'],
  ['#EEBC8F', '#F6CE8E', '#FEE08D', '#90B1CB', '#5081A6', '#25597C'],
  ['#EEBC8F', '#F6CE8E', '#FEE08D', '#90B1CB', '#7199B8', '#5081A6', '#25597C'],
  [
    '#EEBC8F',
    '#F6CE8E',
    '#FEE08D',
    '#ACBBBF',
    '#90B1CB',
    '#7199B8',
    '#5081A6',
    '#25597C'
  ],
  [
    '#EEBC8F',
    '#F6CE8E',
    '#FEE08D',
    '#E3D2A0',
    '#ACBBBF',
    '#90B1CB',
    '#7199B8',
    '#5081A6',
    '#25597C'
  ],
  [
    '#EEBC8F',
    '#F6CE8E',
    '#FEE08D',
    '#E3D2A0',
    '#C5C5B2',
    '#ACBBBF',
    '#90B1CB',
    '#7199B8',
    '#5081A6',
    '#25597C'
  ]
];

export function getColorByIndex(data, index, colors = buckets) {
  const length = Object.keys(data).length;
  if (index === -2 || length === 1) return '#ddd';
  return colors[length - 2][index - 1] || '#E5E5EB';
}

export function createLegendBuckets(
  locations,
  labels,
  isos,
  notApplicableLabel = 'Not Applicable'
) {
  if (Object.keys(locations) === isos) return labels;
  // An index of -2 is applied in the backend to 'No Data Submitted'
  const notSubmitted = Object.keys(labels).find(l => labels[l].index === -2);
  if (notSubmitted) {
    const notApplicableKey = parseInt(notSubmitted, 10) + 1;
    return {
      ...labels,
      [notApplicableKey]: { name: notApplicableLabel, index: 0 }
    };
  }
  return { ...labels, 0: { name: notApplicableLabel, index: 0 } };
}

// Map path filtering
// If we have a zoom level we show the points until we reach the MIN_ZOOM_SHOW_ISLANDS level
// If we dont we always show the points instead of the islands
export const shouldShowPath = (path, zoom) =>
  (zoom
    ? (zoom >= MIN_ZOOM_SHOW_ISLANDS &&
        (path.properties.layer === PATH_LAYERS.COUNTRIES ||
          path.properties.layer === PATH_LAYERS.ISLANDS)) ||
      (zoom < MIN_ZOOM_SHOW_ISLANDS &&
        (path.properties.layer === PATH_LAYERS.COUNTRIES ||
          path.properties.layer === PATH_LAYERS.POINTS))
    : path.properties.layer !== PATH_LAYERS.ISLANDS);
