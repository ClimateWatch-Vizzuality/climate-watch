import { PATH_LAYERS, MIN_ZOOM_SHOW_ISLANDS } from 'app/data/constants';
import {
  CHART_NAMED_COLORS,
  CHART_NAMED_GRAY_COLORS
} from 'app/styles/constants';

const colorArray = Object.values(CHART_NAMED_COLORS);
const buckets = colorArray.map((_, i) => colorArray.slice(0, i + 1));

const GREY_INDICATOR_SLUGS = ['no_info_2020'];
export function getColorByIndex(data, index, colors = buckets) {
  const length = Object.keys(data).length;
  const indexData = data && Object.values(data).find(d => d.index === index);
  if (
    index === -2 ||
    length === 1 ||
    !indexData ||
    GREY_INDICATOR_SLUGS.includes(indexData.slug)
  ) {
    return CHART_NAMED_GRAY_COLORS.grayColor1;
  }
  const getColorBucket = l => colors[l - 1] || getColorBucket(l - 1);
  const colorBucket = getColorBucket(length);
  return (
    (colorBucket && colorBucket[index - 1]) ||
    CHART_NAMED_GRAY_COLORS.grayColor2
  );
}

export function createLegendBuckets(
  locations,
  labels = {},
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
  zoom
    ? (zoom >= MIN_ZOOM_SHOW_ISLANDS &&
        (path.properties.layer === PATH_LAYERS.COUNTRIES ||
          path.properties.layer === PATH_LAYERS.ISLANDS)) ||
      (zoom < MIN_ZOOM_SHOW_ISLANDS &&
        (path.properties.layer === PATH_LAYERS.COUNTRIES ||
          path.properties.layer === PATH_LAYERS.POINTS))
    : path.properties.layer !== PATH_LAYERS.ISLANDS;
