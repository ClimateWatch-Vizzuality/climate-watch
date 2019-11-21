import { createSelector } from 'reselect';
import { getColorByIndex, createLegendBuckets } from 'utils/map';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import camelCase from 'lodash/camelCase';
import { generateLinkToDataExplorer } from 'utils/data-explorer';
import worldPaths from 'app/data/world-50m-paths';
import { PATH_LAYERS } from 'app/data/constants';
import { getSelectedIndicator } from 'components/ndcs/ndcs-map/ndcs-map-selectors';

export const getMeta = ({ ghgEmissionsMeta }) =>
  (ghgEmissionsMeta && ghgEmissionsMeta.meta) || null;
export const getSources = createSelector(
  getMeta,
  meta => (meta && meta.data_source) || null
);

const getSearch = state => state.search || null;
const getCountries = state => state.countries || null;
const getCategories = state => state.categories || null;
const getIndicatorsData = state => state.indicators || null;
const getEmissions = state => state.emissions.data || null;

export const getMaximumCountries = createSelector(
  getCountries,
  countries => countries.length
);

export const getCountryLastYearEmissions = createSelector(
  getEmissions,
  emissions => {
    if (!emissions) return null;
    const countryLastYearEmissions = {};
    Object.values(emissions).forEach(e => {
      countryLastYearEmissions[e.iso_code3] =
        e.emissions[e.emissions.length - 1].value;
    });
    return countryLastYearEmissions;
  }
);

export const getISOCountries = createSelector([getCountries], countries =>
  countries.map(country => country.iso_code3)
);

export const getIndicatorsParsed = createSelector(
  [getCategories, getIndicatorsData, getISOCountries],
  (categories, indicators, isos) => {
    if (!categories || !indicators || !indicators.length) return null;
    const categoryIds = Object.keys(categories);
    const preppedIndicators = sortBy(
      uniqBy(
        indicators.map(i => {
          const legendBuckets = createLegendBuckets(
            i.locations,
            i.labels,
            isos
          );
          return {
            label: i.name,
            value: i.slug,
            categoryIds: i.category_ids,
            locations: i.locations,
            legendBuckets
          };
        }),
        'value'
      ),
      'label'
    );

    let filteredIndicators = [];
    categoryIds.forEach(id => {
      filteredIndicators = filteredIndicators.concat(
        preppedIndicators.filter(
          ind => ind.categoryIds.indexOf(parseInt(id, 10)) > -1
        )
      );
    });
    return filteredIndicators;
  }
);

export const getMapIndicator = createSelector(
  [getIndicatorsParsed, getSelectedIndicator],
  (indicators, selectedIndicator) => {
    if (!indicators || !indicators.length) return null;
    const mapIndicator = selectedIndicator || indicators[0];
    return mapIndicator;
  }
);

const countryStyles = {
  default: {
    fill: '#e9e9e9',
    fillOpacity: 1,
    stroke: '#f5f6f7',
    strokeWidth: 1,
    outline: 'none'
  },
  hover: {
    fill: '#e9e9e9',
    fillOpacity: 1,
    stroke: '#f5f6f7',
    strokeWidth: 1,
    outline: 'none'
  },
  pressed: {
    fill: '#e9e9e9',
    fillOpacity: 1,
    stroke: '#f5f6f7',
    strokeWidth: 1,
    outline: 'none'
  }
};

export const MAP_COLORS = [
  ['rgb(55, 104, 141)', 'rgb(164, 164, 164)'],
  ['rgb(55, 104, 141)', 'rgb(164, 164, 164)'],
  ['rgb(55, 104, 141)', 'rgb(164, 164, 164)'],
  ['rgb(55, 104, 141)', 'rgb(164, 164, 164)'],
  ['rgb(55, 104, 141)', 'rgb(164, 164, 164)']
];

export const getPathsWithStyles = createSelector(
  [getMapIndicator],
  indicator => {
    if (!indicator) return [];
    const paths = [];
    worldPaths.forEach(path => {
      if (path.properties.layer !== PATH_LAYERS.ISLANDS) {
        const { locations, legendBuckets } = indicator;

        if (!locations) {
          paths.push({
            ...path,
            countryStyles
          });
          return null;
        }

        const iso = path.properties && path.properties.id;
        const countryData = locations[iso];

        let style = countryStyles;
        if (countryData && countryData.label_id) {
          const legendIndex = legendBuckets[countryData.label_id].index;
          const color = getColorByIndex(legendBuckets, legendIndex);
          style = {
            ...countryStyles,
            default: {
              ...countryStyles.default,
              fill: color,
              fillOpacity: 1
            },
            hover: {
              ...countryStyles.hover,
              fill: color,
              fillOpacity: 1
            }
          };
        }

        paths.push({
          ...path,
          style
        });
      }
      return null;
    });
    return paths;
  }
);

export const getLinkToDataExplorer = createSelector([getSearch], search => {
  const section = 'ndc-content';
  return generateLinkToDataExplorer(search, section);
});

const percentage = (value, total) => (value * 100) / total;

// Chart data methods

export const getLegend = createSelector(
  [getMapIndicator, getMaximumCountries],
  (indicator, maximumCountries) => {
    if (!indicator || !indicator.legendBuckets || !maximumCountries) {
      return null;
    }
    const bucketsWithId = Object.keys(indicator.legendBuckets).map(id => ({
      ...indicator.legendBuckets[id],
      id
    }));
    return bucketsWithId.map(label => {
      const partiesNumber = Object.values(indicator.locations).filter(
        l => l.label_id === parseInt(label.id, 10)
      ).length;
      return {
        ...label,
        value: percentage(partiesNumber, maximumCountries),
        partiesNumber,
        color: getColorByIndex(indicator.legendBuckets, label.index)
      };
    });
  }
);

export const getEmissionsProviderFilters = createSelector([getMeta], meta => {
  if (!meta || !meta.gas) return null;
  const gas = meta.gas.find(g => g.label === 'All GHG');
  const source = meta.data_source.find(g => g.label === 'CAIT');
  return { source: source && source.value, gas: gas && gas.value };
});

export const getEmissionsCardData = createSelector(
  [getLegend, getMapIndicator, getCountryLastYearEmissions, getMapIndicator],
  (legend, indicator, emissionsData, selectedIndicator) => {
    if (
      !indicator ||
      !legend ||
      !emissionsData ||
      isEmpty(emissionsData) ||
      !selectedIndicator
    ) {
      return null;
    }

    const totalEmissions = Object.values(emissionsData).reduce(
      (a, b) => a + b,
      0
    );
    const data = legend.map(legendItem => {
      let legendItemValue = 0;
      Object.entries(selectedIndicator.locations).forEach(entry => {
        const [locationIso, { value: legendItemName }] = entry;
        if (
          legendItemName === legendItem.name &&
          isNumber(emissionsData[locationIso])
        ) {
          legendItemValue += emissionsData[locationIso];
        }
      });
      return {
        name: camelCase(legendItem.name),
        value: percentage(legendItemValue, totalEmissions)
      };
    });

    const config = {
      animation: true,
      innerRadius: 50,
      outerRadius: 70,
      hideLabel: true,
      hideLegend: true,
      innerHoverLabel: true
    };

    const tooltipLabels = {};
    const themeLabels = {};
    legend.forEach(l => {
      tooltipLabels[camelCase(l.name)] = {
        label: l.name
      };
      themeLabels[camelCase(l.name)] = {
        label: l.name,
        stroke: l.color
      };
    });
    config.tooltip = tooltipLabels;
    config.theme = themeLabels;
    return {
      config,
      data
    };
  }
);
export const getSummaryCardData = createSelector(
  [getLegend, getMapIndicator, getMaximumCountries],
  (legend, indicator, maximumCountries) => {
    if (!indicator || !legend) return null;
    // TODO: This may change. The info will come from the backend
    const selectedLegendItem = legend[0];
    return {
      value: selectedLegendItem.partiesNumber,
      description: `out of ${maximumCountries} parties - ${indicator.label}`
    };
  }
);

export default {
  getMapIndicator,
  getIndicatorsParsed,
  getEmissionsCardData,
  getPathsWithStyles,
  getSummaryCardData
};
