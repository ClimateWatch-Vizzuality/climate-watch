import uniq from 'lodash/uniq';
import flatMap from 'lodash/flatMap';
import isEmpty from 'lodash/isEmpty';

const expandRegionToCountries = (iso, regions) => {
  const region = regions.find(r => r.iso_code3 === iso);
  if (!region || !region.members) return iso;
  return flatMap(region.members, expandRegionToCountries);
};

const expandRegionsToCountries = (isos, regions) =>
  uniq(flatMap(isos, iso => expandRegionToCountries(iso, regions)));

export const getMetricData = (
  year,
  column,
  metricField,
  calculationData,
  regions
) => {
  const getMetricForYearAndRegion = (y, r) =>
    metricField &&
    calculationData &&
    calculationData[y] &&
    calculationData[y][r] &&
    calculationData[y][r][metricField];
  let metricData = getMetricForYearAndRegion(year, column.iso);
  // if no metric data for expandable column then use expanded regions to
  // calculate metric data
  if (!metricData && column.expandsTo && column.expandsTo.length) {
    const expandedCountries = expandRegionsToCountries(
      column.expandsTo,
      regions
    );
    metricData = expandedCountries.reduce(
      (acc, iso3) => acc + (getMetricForYearAndRegion(year, iso3) || 0),
      0
    );
  }

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
