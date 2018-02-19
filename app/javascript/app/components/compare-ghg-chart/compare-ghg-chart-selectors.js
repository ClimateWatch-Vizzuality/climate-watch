import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import groupBy from 'lodash/groupBy';
import flatten from 'lodash/flatten';
import intersection from 'lodash/intersection';
import sumBy from 'lodash/sumBy';
import {
  CALCULATION_OPTIONS,
  DEFAULT_AXES_CONFIG,
  COUNTRY_COMPARE_COLORS,
  DATA_SCALE,
  DEFAULT_EMISSIONS_SELECTIONS
} from 'data/constants';
// sortLabelByAlpha
import {
  getYColumnValue,
  sortEmissionsByValue,
  getTooltipConfig,
  getThemeConfig
} from 'utils/graphs';
import { calculatedRatio } from 'utils/ghg-emissions';

// meta data for selectors
const getSources = state => state.meta.data_source || null;

// values from search
const getSourceSelection = state => state.search.source || null;
const getCalculation = state => state.search.calculation || null;
const getSelectedLocations = state => state.selectedLocations || null;
const getQuantifications = state => state.quantifications || null;
const getCalculationData = state => state.calculationData || null;
const getCountriesData = state => state.countriesData || null;

export const parseSelectedLocations = createSelector(
  getSelectedLocations,
  selectedLocations => {
    if (!selectedLocations) return null;
    return selectedLocations
      .split(',')
      .filter(l => !parseInt(l, 10) && l !== '');
  }
);

const parseLocationCalculationData = createSelector(
  [getCalculationData, parseSelectedLocations],
  (data, locations) => {
    if (!data || isEmpty(data)) return null;
    const locationData = locations.map(l => groupBy(data[l], 'year'));
    return locationData;
  }
);
// data for the graph
const getData = state => state.data || [];

export const getSelectedLocationsName = createSelector(
  [getCountriesData, parseSelectedLocations],
  (countriesData, selectedLocations) => {
    if (!selectedLocations || !countriesData || isEmpty(countriesData)) {
      return null;
    }
    return selectedLocations.map(
      l => countriesData.find(d => d.iso_code3 === l).wri_standard_name || null
    );
  }
);

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
    parseSelectedLocations,
    getSelectedLocationsName
  ],
  (data, source, calculation, locations, locationsName) => {
    if (!data || !data.length) return [];
    let filteredData = data;
    // If the data has the AR4 version (latest) we only want to display that data to avoid duplicates
    const latestVersion = 'AR4';
    const hasLatestVersion = filteredData.some(d => d.gwp === latestVersion);
    if (hasLatestVersion) {
      filteredData = filteredData.filter(d => d.gwp === latestVersion);
    }
    const version = hasLatestVersion ? latestVersion : 'AR2';
    const filterSector =
      source.label === 'UNFCCC'
        ? DEFAULT_EMISSIONS_SELECTIONS[source.label].sector[version]
        : DEFAULT_EMISSIONS_SELECTIONS[source.label].sector;
    filteredData = filteredData.filter(
      d =>
        d.source === source.label &&
        d.sector === filterSector &&
        (d.gas === 'All GHG' || d.gas === 'Aggregate GHGs')
    );
    if (calculation.value !== 'ABSOLUTE_VALUE') {
      if (!locations || !locations.length) return null;
      const locationDataGroupedByYear = locations.map(l => {
        const locationData = filteredData.filter(d => d.iso_code3 === l);
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
        iso_code3: locations[i],
        location: locationsName[i],
        sector: filterSector,
        emissions: d
      }));
      return sortEmissionsByValue(compressedData);
    }
    return sortEmissionsByValue(filteredData);
  }
);

export const getChartData = createSelector(
  [
    filterData,
    getFiltersSelected,
    parseLocationCalculationData,
    parseSelectedLocations,
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
      (!absoluteValueIsSelected && !locationCalculationData)
    ) {
      return [];
    }
    let xValues = [];
    xValues = data[0].emissions.map(d => d.year);
    if (!absoluteValueIsSelected) {
      // Intersection of years betweeen the data and the calculation data years from the countries
      xValues = intersection(
        xValues,
        flatten(
          locationCalculationData.map(l =>
            Object.keys(l || []).map(y => parseInt(y, 10))
          )
        )
      );
    }

    const dataParsed = xValues.map(x => {
      const yItems = {};
      data.forEach(d => {
        const yKey = getYColumnValue(d.location);
        const yData = d.emissions.find(e => e.year === x);
        const locationIndex = selectedLocations.indexOf(d.iso_code3);
        let calculationRatio = 1;
        if (!absoluteValueIsSelected) {
          calculationRatio = calculatedRatio(
            calculationSelected.value,
            locationCalculationData[locationIndex],
            x
          );
        }
        if (yData) {
          const scaledYData = yData.value * DATA_SCALE;
          if (yData.value) {
            yItems[yKey] = scaledYData / calculationRatio;
          }
        }
      });

      const item = {
        x,
        ...yItems
      };
      return item;
    });
    return dataParsed;
  }
);

export const getChartConfig = createSelector(
  [getData, parseSelectedLocations],
  (data, locations) => {
    if (!data || isEmpty(data)) return null;
    const yColumns = locations.map(l => {
      const firstData = data.find(d => l === d.iso_code3);
      const fullLocationName = (firstData || {}).location;
      return {
        label: fullLocationName,
        value: getYColumnValue(fullLocationName)
      };
    });
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
  parseSelectedLocations,
  getFiltersSelected,
  getChartData,
  getChartConfig
};
