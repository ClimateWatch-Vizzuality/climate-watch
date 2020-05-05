import { createSelector } from 'reselect';
import {
  getColorByIndex,
  createLegendBuckets,
  shouldShowPath
} from 'utils/map';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import groupBy from 'lodash/groupBy';
import intersection from 'lodash/intersection';
import { generateLinkToDataExplorer } from 'utils/data-explorer';
import worldPaths from 'app/data/world-50m-paths';
import { COUNTRY_STYLES } from 'components/ndcs/shared/constants';
import {
  sortByIndexAndNotInfo,
  getIndicatorEmissionsData,
  getLabels
} from 'components/ndcs/shared/utils';
import { europeSlug, europeanCountries } from 'app/data/european-countries';

const NOT_APPLICABLE_LABEL = 'Not Applicable';

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
  [getCategories, getIndicatorsData, getISOCountries],
  (categories, indicators, isos) => {
    if (!categories || !indicators || !indicators.length) return null;
    return sortBy(
      uniqBy(
        indicators.map(i => {
          const legendBuckets = createLegendBuckets(
            i.locations,
            i.labels,
            isos,
            NOT_APPLICABLE_LABEL
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
      categories.find(cat => cat.value === 'unfccc_process') || categories[0];
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
      indicators.find(i => i.value === 'submission') || indicators[0];
    return selected
      ? indicators.find(indicator => indicator.value === selected) ||
          defaultSelection
      : defaultSelection;
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
              fillOpacity: 1,
              'stroke-width': zoom > 2 ? 0.1 : 0.5
            },
            hover: {
              ...COUNTRY_STYLES.hover,
              cursor: 'pointer',
              fill: color,
              fillOpacity: 1,
              'stroke-width': zoom > 2 ? 0.1 : 0.5
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
    const legendItems = bucketsWithId.map(label => {
      let partiesNumber = Object.values(indicator.locations).filter(
        l => l.label_id === parseInt(label.id, 10)
      ).length;
      if (label.name === NOT_APPLICABLE_LABEL) {
        partiesNumber =
          maximumCountries - Object.values(indicator.locations).length;
      }
      return {
        ...label,
        value: percentage(partiesNumber, maximumCountries),
        partiesNumber,
        color: getColorByIndex(indicator.legendBuckets, label.index)
      };
    });
    return legendItems.sort(sortByIndexAndNotInfo);
  }
);

export const getTooltipCountryValues = createSelector(
  [getIndicatorsData, getSelectedIndicator],
  (indicators, selectedIndicator) => {
    if (!indicators || !selectedIndicator) {
      return null;
    }
    const tooltipCountryValues = {};
    Object.keys(selectedIndicator.locations).forEach(iso => {
      tooltipCountryValues[iso] = {
        value:
          selectedIndicator.locations[iso] &&
          selectedIndicator.locations[iso].value
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
    const emissionsIndicator = indicators.find(i => i.slug === 'ndce_ghg');
    if (!emissionsIndicator) return null;
    const data = getIndicatorEmissionsData(
      emissionsIndicator,
      selectedIndicator,
      legend
    );

    const config = {
      animation: true,
      innerRadius: 50,
      outerRadius: 70,
      hideLabel: true,
      hideLegend: true,
      innerHoverLabel: true,
      minAngle: 3,
      ...getLabels(legend, NOT_APPLICABLE_LABEL)
    };

    return {
      config,
      data
    };
  }
);

const getCountriesAndParties = submissions => {
  const partiesNumber = submissions.length;
  let countriesNumber = submissions.length;
  const submissionIsos = submissions.map(s => s.iso_code3);
  if (!submissionIsos.includes(europeSlug)) {
    return { partiesNumber, countriesNumber };
  }
  const europeanCountriesWithSubmission = intersection(
    europeanCountries,
    submissions.map(s => s.iso_code3)
  );
  countriesNumber +=
    europeanCountries.length - europeanCountriesWithSubmission.length - 1;
  return { partiesNumber, countriesNumber };
};

export const getSummaryCardData = createSelector(
  [getIndicatorsData],
  indicators => {
    if (!indicators) return null;
    const latestSubmissionIndicator = indicators.find(
      i => i.slug === 'submission'
    );
    const locationSubmissions = Object.keys(
      latestSubmissionIndicator.locations
    ).map(key => ({
      iso_code3: key,
      value: latestSubmissionIndicator.locations[key].value
    }));
    const groupedSubmissions = groupBy(locationSubmissions, 'value');
    const firstNDCCountriesAndParties = getCountriesAndParties(
      groupedSubmissions['First NDC Submitted']
    );
    const secondNDCCountriesAndParties = getCountriesAndParties(
      groupedSubmissions['Second NDC Submitted']
    );
    return [
      {
        value: firstNDCCountriesAndParties.partiesNumber,
        description: ` Parties have submitted their first NDC, representing ${firstNDCCountriesAndParties.countriesNumber} countries`
      },
      {
        value: secondNDCCountriesAndParties.partiesNumber,
        description: ` Part${
          secondNDCCountriesAndParties.partiesNumber === 1
            ? 'y has'
            : 'ies have'
        } submitted their second NDC, representing ${
          secondNDCCountriesAndParties.countriesNumber
        } countries`
      }
    ];
  }
);

export default {
  getMapIndicator,
  getIndicatorsParsed,
  getEmissionsCardData,
  getPathsWithStyles,
  getSummaryCardData
};
