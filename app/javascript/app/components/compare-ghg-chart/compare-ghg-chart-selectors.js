import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import groupBy from 'lodash/groupBy';
import flatten from 'lodash/flatten';
import intersection from 'lodash/intersection';
import sortBy from 'lodash/sortBy';
import uniq from 'lodash/uniq';
import sumBy from 'lodash/sumBy';
import {
  CALCULATION_OPTIONS,
  DEFAULT_AXES_CONFIG,
  COUNTRY_COMPARE_COLORS,
  DATA_SCALE,
  DEFAULT_EMISSIONS_SELECTIONS,
  ALLOWED_SECTORS_BY_SOURCE,
  LATEST_VERSION
} from 'data/constants';
import {
  getYColumnValue,
  sortEmissionsByValue,
  getTooltipConfig,
  getThemeConfig
} from 'utils/graphs';
import {
  parseSelectedLocations,
  getSelectedLocationsFilter,
  addSelectedNameToLocations
} from 'selectors/compare';
import { calculatedRatio } from 'utils/ghg-emissions';

// meta data for selectors
const getSources = state => state.meta.data_source || null;

// values from search
const getSourceSelection = state => state.search.source || null;
const getCalculation = state => state.search.calculation || null;
const getSectors = state =>
  (state.search.sectors && state.search.sectors.split(',')) || null;
const getSelectedLocations = state => state.selectedLocations || null;
const getQuantifications = state => state.quantifications || null;
const getCalculationData = state => state.calculationData || null;
const getCountriesData = state => state.countriesData || null;

export const parseLocations = parseSelectedLocations(getSelectedLocations);
export const getLocationsFilter = getSelectedLocationsFilter(
  getSelectedLocations
);
export const addNameToLocations = addSelectedNameToLocations(
  getCountriesData,
  parseLocations
);

const parseLocationCalculationData = createSelector(
  [getCalculationData, parseLocations],
  (data, locations) => {
    if (!data || isEmpty(data)) return null;
    const locationData = locations.map(l => groupBy(data[l.iso_code3], 'year'));
    return locationData;
  }
);
// data for the graph
const getData = state => state.data || [];

// Sources selectors
export const getCalculationSelected = createSelector(
  getCalculation,
  calculation => {
    if (!calculation) return CALCULATION_OPTIONS.ABSOLUTE_VALUE;
    return CALCULATION_OPTIONS[calculation];
  }
);

export const getSourceOptions = createSelector(getSources, sources => {
  if (!sources) return null;
  return sources.map(d => ({
    label: d.label,
    value: d.value,
    source: d.source
  }));
});

export const getSourceSelected = createSelector(
  [getSourceOptions, getSourceSelection],
  (sources, selected) => {
    if (!sources) return null;
    if (!selected) return sources[0];
    return sources.find(category => category.value === parseInt(selected, 10));
  }
);

export const getVersion = createSelector([getData], data => {
  if (!data || isEmpty(data)) return null;
  const hasLatestVersion = data.some(d => d.gwp === LATEST_VERSION);
  return hasLatestVersion ? LATEST_VERSION : 'AR2';
});

export const getAllowedSectors = createSelector(
  [getSourceSelected, getVersion],
  (source, version) => {
    if (!source || !version) return null;
    if (source.label === 'UNFCCC') {
      return ALLOWED_SECTORS_BY_SOURCE[source.label][version];
    }
    return ALLOWED_SECTORS_BY_SOURCE[source.label];
  }
);

export const getSectorOptions = createSelector(
  [getData, getAllowedSectors],
  (data, sectorsAllowed) => {
    if (!sectorsAllowed || isEmpty(data)) return null;
    const dataSectors = uniq(data.map(d => d.sector));
    const sectorOptions = dataSectors
      .filter(sector => sectorsAllowed.indexOf(sector) > -1)
      .map(s => ({ label: s, value: s }));
    return sectorOptions;
  }
);

export const getSectorsSelected = createSelector(
  [getSectorOptions, getSectors, getCalculationSelected],
  (sectors, selected, calculation) => {
    if (!sectors) return null;
    if (!selected) return sectors;
    if (calculation !== CALCULATION_OPTIONS.ABSOLUTE_VALUE) return sectors;
    return sectors.filter(s => selected.indexOf(s.value) !== -1);
  }
);

export const getFiltersSelected = createSelector(
  [getSourceSelected, getSelectedLocations],
  (sourceSelected, selectedLocations) => {
    if (!sourceSelected) return null;
    return {
      location: selectedLocations,
      source: sourceSelected && sourceSelected.value
    };
  }
);

export const calculationOptions = Object.keys(CALCULATION_OPTIONS).map(
  o => CALCULATION_OPTIONS[o]
);

export const filterData = createSelector(
  [
    getData,
    getSourceSelected,
    getCalculationSelected,
    addNameToLocations,
    getVersion,
    getSectorOptions,
    getSectorsSelected
  ],
  (data, source, calculation, locations, version, sectorOptions, sectors) => {
    if (!data || !data.length) return [];
    let filteredData = data;
    // Filter by version
    // If the data has the AR4 version (latest) we only want to display that data to avoid duplicates
    if (version === LATEST_VERSION) {
      filteredData = filteredData.filter(d => d.gwp === LATEST_VERSION);
    }

    // Filter by source and gas
    filteredData = filteredData.filter(
      d =>
        d.source === source.label &&
        (d.gas === 'All GHG' || d.gas === 'Aggregate GHGs')
    );

    // Filter by sector
    const defaultSector =
      source.label === 'UNFCCC'
        ? [DEFAULT_EMISSIONS_SELECTIONS[source.label].sector[version]]
        : [DEFAULT_EMISSIONS_SELECTIONS[source.label].sector];
    const sectorFilters =
      sectors && sectors.length && sectorOptions.length !== sectors.length
        ? sectors.map(s => s.label)
        : defaultSector;
    filteredData = filteredData.filter(
      d => sectorFilters.indexOf(d.sector) !== -1
    );
    if (!locations || !locations.length) return null;
    const locationDataGroupedByYear = locations.map(l => {
      const locationData = filteredData.filter(
        d => d.iso_code3 === l.iso_code3
      );
      return groupBy(flatten(locationData.map(d => d.emissions)), 'year');
    });
    const locationDataSummed = locationDataGroupedByYear.map(l =>
      Object.keys(l).map(year => ({
        year: parseInt(year, 10),
        value: sumBy(l[year], 'value')
      }))
    );

    const compressedData = locationDataSummed.map((d, i) => ({
      ...filteredData[0],
      iso_code3: locations[i].iso_code3,
      location: locations[i].name,
      sector: sectorFilters,
      emissions: d
    }));
    return sortEmissionsByValue(compressedData);
  }
);

const getYearsForLocation = (
  data,
  absoluteValueIsSelected,
  locationCalculationData
) => {
  let yearsForLocation = [];
  yearsForLocation = data.map(location => location.emissions.map(d => d.year));
  if (!absoluteValueIsSelected) {
    // Intersection of years betweeen the data and the calculation data years from the countries
    yearsForLocation = yearsForLocation.map((locationValues, i) =>
      intersection(
        locationValues,
        flatten(
          Object.keys(locationCalculationData[i] || []).map(y =>
            parseInt(y, 10)
          )
        )
      )
    );
  }
  return yearsForLocation;
};

export const getChartData = createSelector(
  [
    filterData,
    getFiltersSelected,
    parseLocationCalculationData,
    parseLocations,
    getCalculationSelected,
    getQuantifications
  ],
  (
    data,
    filters,
    locationCalculationData,
    selectedLocations,
    calculationSelected
  ) => {
    const absoluteValueIsSelected =
      calculationSelected &&
      calculationSelected.value === CALCULATION_OPTIONS.ABSOLUTE_VALUE.value;
    if (
      !data ||
      !data.length ||
      !filters ||
      !calculationSelected ||
      !selectedLocations ||
      (!absoluteValueIsSelected && !locationCalculationData)
    ) {
      return [];
    }

    const yearsForLocation = getYearsForLocation(
      data,
      absoluteValueIsSelected,
      locationCalculationData
    );
    const yearData = [];
    data.forEach(d => {
      const yLocationKey = getYColumnValue(d.location);
      const locationIndex = selectedLocations
        .map(l => l.iso_code3)
        .indexOf(d.iso_code3);
      const yearsWithData = yearsForLocation[locationIndex] || [];
      yearsWithData.forEach(year => {
        const yData = d.emissions.find(e => e.year === year);
        if (yData) {
          const calculationRatio = absoluteValueIsSelected
            ? 1
            : calculatedRatio(
              calculationSelected.value,
              locationCalculationData[locationIndex],
              year
            );
          const scaledYData = yData.value * DATA_SCALE;
          const yKey = { [yLocationKey]: scaledYData / calculationRatio };
          if (yData.value) {
            const existingYearData =
              yearData.length && yearData.find(yearD => yearD.x === year);
            if (existingYearData) {
              yearData[yearData.indexOf(existingYearData)] = {
                ...existingYearData,
                ...yKey
              };
            } else {
              yearData.push({ x: year, ...yKey });
            }
          }
        }
      });
    });
    return sortBy(yearData, 'x');
  }
);

export const getChartConfig = createSelector(
  [getData, addNameToLocations],
  (data, locations) => {
    if (!data || isEmpty(data) || !locations) return null;

    const yColumns = locations.map(l => ({
      label: l.name,
      value: getYColumnValue(l.name),
      index: l.index
    }));
    const theme = getThemeConfig(yColumns, COUNTRY_COMPARE_COLORS);
    const tooltip = getTooltipConfig(yColumns);

    return {
      axes: DEFAULT_AXES_CONFIG,
      theme,
      tooltip,
      animation: false,
      columns: {
        x: [{ label: 'year', value: 'x' }],
        y: yColumns
      }
    };
  }
);

export default {
  getSourceOptions,
  getSourceSelected,
  calculationOptions,
  getCalculationSelected,
  getSectorsSelected,
  parseLocations,
  getLocationsFilter,
  getFiltersSelected,
  getChartData,
  getChartConfig
};
