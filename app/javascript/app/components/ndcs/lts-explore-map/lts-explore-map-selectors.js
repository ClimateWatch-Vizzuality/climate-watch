import { createSelector } from 'reselect';
import {
  getColorByIndex,
  createLegendBuckets,
  shouldShowPath
} from 'utils/map';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import { generateLinkToDataExplorer } from 'utils/data-explorer';
import worldPaths from 'app/data/world-50m-paths';
import { COUNTRY_STYLES } from 'components/ndcs/shared/constants';
import {
  sortByIndexAndNotInfo,
  getIndicatorEmissionsData,
  getLabels
} from 'components/ndcs/shared/utils';

const NO_DOCUMENT_SUBMITTED = 'No Document Submitted';

const getSearch = state => state.search || null;
const getCountries = state => state.countries || null;
const getCategoriesData = state => state.categories || null;
const getIndicatorsData = state => state.indicators || null;
const getZoom = state => state.map.zoom || null;

export const getCategories = createSelector(getCategoriesData, categories =>
  (!categories
    ? null
    : Object.keys(categories).map(category => ({
      label: categories[category].name,
      value: categories[category].slug,
      id: category
    })))
);

export const getMaximumCountries = createSelector(
  getCountries,
  countries => countries.length
);

export const getISOCountries = createSelector([getCountries], countries =>
  countries.map(country => country.iso_code3)
);

export const getIndicatorsParsed = createSelector(
  [getIndicatorsData, getISOCountries],
  (indicators, isos) => {
    if (!indicators || !indicators.length) return null;
    return sortBy(
      uniqBy(
        indicators.map(i => {
          const legendBuckets = createLegendBuckets(
            i.locations,
            i.labels,
            isos,
            NO_DOCUMENT_SUBMITTED
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
  }
);

export const getSelectedCategory = createSelector(
  [state => state.categorySelected, getCategories],
  (selected, categories = []) => {
    if (!categories || !categories.length) return null;
    const defaultCategory =
      categories.find(cat => cat.value === 'overview') || categories[0];
    if (selected) {
      return (
        categories.find(category => category.value === selected) ||
        defaultCategory
      );
    }
    return defaultCategory;
  }
);

export const getCategoryIndicators = createSelector(
  [getIndicatorsParsed, getSelectedCategory],
  (indicatorsParsed, category) => {
    if (!indicatorsParsed || !category) return null;
    const categoryIndicators = indicatorsParsed.filter(
      indicator => indicator.categoryIds.indexOf(parseInt(category.id, 10)) > -1
    );
    return categoryIndicators;
  }
);

export const getSelectedIndicator = createSelector(
  [state => state.indicatorSelected, getCategoryIndicators],
  (selected, indicators = []) => {
    if (!indicators || !indicators.length) return {};
    const defaultSelection =
      indicators.find(i => i.slug === 'lts_submission') || indicators[0];
    return selected
      ? indicators.find(indicator => indicator.value === selected) ||
          defaultSelection
      : defaultSelection;
  }
);

export const getMapIndicator = createSelector(
  [getIndicatorsParsed, getCategories, getSelectedIndicator],
  (indicators, categories, selectedIndicator) => {
    if (!indicators || !categories || !indicators.length) return null;
    const mapIndicator =
      selectedIndicator && selectedIndicator.label
        ? selectedIndicator
        : indicators.find(indicator => indicator.slug === 'lts_submission') ||
          indicators[0];
    return mapIndicator;
  }
);

export const getPathsWithStyles = createSelector(
  [getMapIndicator, getZoom],
  (indicator, zoom) => {
    if (!indicator) return [];
    const paths = [];
    worldPaths.forEach(path => {
      if (shouldShowPath(path, zoom)) {
        const { locations, legendBuckets } = indicator;

        if (!locations) {
          paths.push({
            ...path,
            COUNTRY_STYLES
          });
          return null;
        }

        const iso = path.properties && path.properties.id;
        const countryData = locations[iso];

        let style = COUNTRY_STYLES;
        if (countryData && countryData.label_id) {
          const legendIndex = legendBuckets[countryData.label_id].index;
          const color = getColorByIndex(legendBuckets, legendIndex);
          style = {
            ...COUNTRY_STYLES,
            default: {
              ...COUNTRY_STYLES.default,
              fill: color,
              fillOpacity: 1
            },
            hover: {
              ...COUNTRY_STYLES.hover,
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
  const section = 'lts-content';
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
    const legendItems = uniqBy(
      bucketsWithId.map(label => {
        let partiesNumber = Object.values(indicator.locations).filter(
          l => l.label_id === parseInt(label.id, 10)
        ).length;
        if (label.name === NO_DOCUMENT_SUBMITTED) {
          partiesNumber =
            maximumCountries - Object.values(indicator.locations).length;
        }
        return {
          ...label,
          value: percentage(partiesNumber, maximumCountries),
          partiesNumber,
          color: getColorByIndex(indicator.legendBuckets, label.index)
        };
      }),
      'name'
    );

    return legendItems.sort(sortByIndexAndNotInfo);
  }
);

export const getTooltipCountryValues = createSelector(
  [getIndicatorsData, getSelectedIndicator],
  (indicators, selectedIndicator) => {
    if (!indicators || !selectedIndicator) {
      return null;
    }
    let updatedSelectedIndicator = selectedIndicator;
    if (selectedIndicator.value === 'lts_submission') {
      updatedSelectedIndicator = indicators.find(i => i.slug === 'lts_target');
    }

    const emissionsIndicator = indicators.find(i => i.slug === 'lts_ghg');
    const tooltipCountryValues = {};
    Object.keys(updatedSelectedIndicator.locations).forEach(iso => {
      tooltipCountryValues[iso] = {
        value:
          updatedSelectedIndicator.locations[iso] &&
          updatedSelectedIndicator.locations[iso].value,
        emissionsValue:
          emissionsIndicator.locations[iso] &&
          emissionsIndicator.locations[iso].value
      };
    });
    return tooltipCountryValues;
  }
);

export const getEmissionsCardData = createSelector(
  [getLegend, getMapIndicator, getIndicatorsData],
  (legend, selectedIndicator, indicators) => {
    if (!legend || !selectedIndicator || !indicators) {
      return null;
    }
    const emissionsIndicator = indicators.find(i => i.slug === 'lts_ghg');
    let data = getIndicatorEmissionsData(
      emissionsIndicator,
      selectedIndicator,
      legend,
      NO_DOCUMENT_SUBMITTED
    );

    // Remove extra No document submitted. TODO: Fix in data
    data = data.filter(d => d.name !== 'noDocumentSubmitted');
    const config = {
      animation: true,
      innerRadius: 50,
      outerRadius: 70,
      hideLabel: true,
      hideLegend: true,
      innerHoverLabel: true,
      minAngle: 3,
      ...getLabels(legend, NO_DOCUMENT_SUBMITTED, true)
    };

    return {
      config,
      data
    };
  }
);

export const getSummaryCardData = createSelector(
  [getMaximumCountries, getIndicatorsData],
  (maximumCountries, indicators) => {
    if (!indicators || !maximumCountries) return null;
    const LTSIndicator = indicators.find(i => i.slug === 'lts_document');
    if (!LTSIndicator) return null;
    const partiesNumber = Object.values(LTSIndicator.locations).filter(
      l => l.value
    ).length;
    return {
      value: partiesNumber,
      description: `out of ${maximumCountries} parties have submitted long-term strategies`
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
