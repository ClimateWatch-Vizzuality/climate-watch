import { createSelector } from 'reselect';
import { getColorByIndex, shouldShowPath } from 'utils/map';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
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
import {
  DEFAULT_NDC_EXPLORE_CATEGORY_SLUG,
  CATEGORY_SOURCES,
  NOT_COVERED_LABEL
} from 'data/constants';

const NOT_APPLICABLE_LABEL = 'Not Applicable';

const getSearch = state => state.search || null;
const getCountries = state => state.countries || null;
const getSectors = state => state.sectors || null;
const getCategoriesData = createSelector(
  state => state.categories,
  categories => {
    if (!categories) return null;
    const mapCategories = {};
    Object.keys(categories).forEach(key => {
      const category = categories[key];
      if (
        category.type === 'map' &&
        category.sources.length &&
        category.sources.every(s => CATEGORY_SOURCES.NDC_EXPLORE.includes(s))
      ) {
        mapCategories[key] = categories[key];
      }
    });
    return mapCategories;
  }
);

const getIndicatorsData = state => state.indicators || null;
const getCountriesDocumentsData = state =>
  state.countriesDocuments.data || null;
const getZoom = state => state.map.zoom || null;

export const getDonutActiveIndex = state =>
  state.exploreMap.activeIndex || null;

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
  [getCategories, getIndicatorsData, getSectors],
  (categories, indicators, sectors) => {
    if (!categories || !indicators || !indicators.length) return null;
    let parentIndicatorNames = [];
    const parsedIndicators = sortBy(
      uniqBy(
        indicators.map(i => {
          // Add indicator groups from the sector relationship - Sectoral categories
          let parentSectorName;
          if (i.locations && Object.values(i.locations)[0]) {
            const childrenSectorId = Object.values(i.locations)[0].sector_id;
            const parentId =
              childrenSectorId &&
              sectors &&
              sectors[childrenSectorId] &&
              sectors[childrenSectorId].parent_id;
            if (parentId) {
              parentSectorName = sectors[parentId].name;
              parentIndicatorNames.push(parentSectorName);
            }
          }
          return {
            label: i.name,
            value: i.slug,
            categoryIds: i.category_ids,
            locations: i.locations,
            legendBuckets: i.labels,
            group: parentSectorName
          };
        }),
        'value'
      ),
      'label'
    );

    parentIndicatorNames = uniq(parentIndicatorNames);
    return parsedIndicators.map(i =>
      (parentIndicatorNames.includes(i.label)
        ? { ...i, groupParent: i.label }
        : i)
    );
  }
);

export const getSelectedCategory = createSelector(
  [state => state.categorySelected, getCategories],
  (selected, categories = []) => {
    if (!categories || !categories.length) return null;
    const defaultCategory =
      categories.find(cat => cat.value === DEFAULT_NDC_EXPLORE_CATEGORY_SLUG) ||
      categories[0];
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
    let defaultSelection = indicators.find(i => i.value === 'submission');
    if (!defaultSelection) {
      const firstParentIndicator = indicators.find(i => i.groupParent);
      defaultSelection = firstParentIndicator || indicators[0];
    }
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
        const strokeWidth = zoom > 2 ? (1 / zoom) * 2 : 0.5;
        const style = {
          ...COUNTRY_STYLES,
          default: {
            ...COUNTRY_STYLES.default,
            'stroke-width': strokeWidth,
            fillOpacity: 1
          },
          hover: {
            ...COUNTRY_STYLES.hover,
            cursor: 'pointer',
            'stroke-width': strokeWidth,
            fillOpacity: 1
          }
        };
        if (countryData && countryData.label_id) {
          const legendIndex = legendBuckets[countryData.label_id].index;
          const color = getColorByIndex(legendBuckets, legendIndex);
          style.default.fill = color;
          style.hover.fill = color;
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

export const getLinkToDataExplorer = createSelector(
  [getSearch, getSelectedCategory, getSelectedIndicator],
  (search, selectedCategory, selectedIndicator) => {
    const section = 'ndc-content';
    let dataExplorerSearch = search || {};
    if (selectedCategory && selectedIndicator) {
      dataExplorerSearch = {
        category: selectedCategory.value,
        indicator: selectedIndicator.value,
        ...search
      };
    }
    return generateLinkToDataExplorer(dataExplorerSearch, section);
  }
);

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
    const legendItems = [];
    bucketsWithId.forEach(label => {
      const partiesNumber = Object.values(indicator.locations).filter(
        l => l.label_id === parseInt(label.id, 10)
      ).length;
      legendItems.push({
        ...label,
        value: percentage(partiesNumber, maximumCountries),
        partiesNumber,
        color: getColorByIndex(indicator.legendBuckets, label.index)
      });
    });
    return legendItems.sort(sortByIndexAndNotInfo);
  }
);

export const getTooltipCountryValues = createSelector(
  [getIndicatorsData, getSelectedIndicator],
  (indicators, selectedIndicator) => {
    if (!indicators || !selectedIndicator || !selectedIndicator.locations) {
      return null;
    }
    const tooltipCountryValues = {};
    Object.keys(selectedIndicator.locations).forEach(iso => {
      const location = selectedIndicator.locations[iso];
      if (location) {
        tooltipCountryValues[iso] = {
          labelId: location.label_id,
          value: location.value
        };
      }
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
    const data = sortBy(
      getIndicatorEmissionsData(emissionsIndicator, selectedIndicator, legend),
      'value'
    );

    const config = {
      animation: true,
      innerRadius: 50,
      outerRadius: 70,
      hideLabel: true,
      hideLegend: true,
      innerHoverLabel: true,
      minAngle: 3,
      ...getLabels({
        legend,
        notInformationLabel: NOT_APPLICABLE_LABEL,
        hasNotCovered: data.some(d => d.name === NOT_COVERED_LABEL)
      })
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

  if (!submissions.includes(europeSlug)) {
    return { partiesNumber, countriesNumber };
  }
  const europeanCountriesWithSubmission = intersection(
    europeanCountries,
    submissions
  );

  countriesNumber +=
    europeanCountries.length - europeanCountriesWithSubmission.length - 1;
  return { partiesNumber, countriesNumber };
};

export const getSummaryCardData = createSelector(
  [getIndicatorsData, getCountriesDocumentsData],
  (indicators, countriesDocuments) => {
    if (!indicators || !countriesDocuments) return null;

    const firstNDCIsos = Object.keys(countriesDocuments).filter(iso =>
      countriesDocuments[iso].some(
        doc => doc.slug === 'first_ndc' && doc.submission_date
      )
    );

    const firstNDCCountriesAndParties = getCountriesAndParties(firstNDCIsos);

    const secondNDCIsos = Object.keys(countriesDocuments).filter(iso =>
      countriesDocuments[iso].some(
        doc => doc.slug === 'second_ndc' && !!doc.submission_date
      )
    );
    const secondNDCCountriesAndParties = getCountriesAndParties(secondNDCIsos);

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
