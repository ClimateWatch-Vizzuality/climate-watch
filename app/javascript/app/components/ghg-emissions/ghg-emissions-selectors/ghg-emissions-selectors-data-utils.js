import uniq from 'lodash/uniq';
import flatMap from 'lodash/flatMap';
import isEmpty from 'lodash/isEmpty';

const expandRegionToCountries = (iso, regions) => {
  const region =
    Array.isArray(regions) && regions.find(r => r.iso_code3 === iso);
  if (!region || !region.members) return iso;
  return flatMap(region.members, expandRegionToCountries);
};

export const getMetricData = (year, iso, metricField, calculationData) => {
  const getMetricForYearAndRegion = (y, r) =>
    metricField &&
    calculationData &&
    calculationData[y] &&
    calculationData[y][r] &&
    calculationData[y][r][metricField];
  let metricData = getMetricForYearAndRegion(year, iso);

  // GDP is in dollars and we want to display it in million dollars
  if (metricField === 'gdp' && metricData) metricData /= 1000000;

  return metricData;
};

// some regions expands to underlying countries but also have
// their own aggregated data
export const getRegionsWithOwnData = (regions, data) => {
  if (!regions || isEmpty(data)) return [];

  const regionsISOs = regions.map(r => r.iso_code3);
  const regionsISOsWithOwnData = uniq(
    data.filter(d => regionsISOs.includes(d.iso_code3)).map(d => d.iso_code3)
  );

  return regions.filter(r => regionsISOsWithOwnData.includes(r.iso_code3));
};

// If there is no value for any legend item
// remove those element from the start and the end of chart
// leave those in the middle
export const trimWithNoData = dataToTrim => {
  const indexesToString = dataToTrim
    .map((d, idx) => (Object.keys(d).length > 1 ? idx : '_'))
    .join(',')
    .replace(/_,/g, '')
    .trim();
  const middleIndexes = indexesToString.split(',');
  const firstNotEmptyIndex = Number(middleIndexes[0]);
  const lastNotEmptyIndex = Number(middleIndexes[middleIndexes.length - 1]);

  return dataToTrim.filter(
    (_d, idx) => idx >= firstNotEmptyIndex && idx <= lastNotEmptyIndex
  );
};
