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
import { sortByIndexAndNotInfo, getLabels } from 'components/ndcs/shared/utils';
import { europeSlug, europeanCountries } from 'app/data/european-countries';

const NO_DOCUMENT_SUBMITTED = 'No Document Submitted';

const getSearch = state => state.search || null;
const getCountries = state => state.countries || null;
const getCategoriesData = state => state.categories || null;
const getIndicatorsData = state => state.indicators || null;
const getZoom = state => state.map.zoom || null;
export const getDonutActiveIndex = state =>
  state.exploreMap.activeIndex || null;

export const getIsShowEUCountriesChecked = createSelector(
  getSearch,
  search => search.showEUCountries === 'true'
);

export const getCategories = createSelector(getCategoriesData, categories =>
  (!categories
    ? null
    : Object.keys(categories).map(category => ({
      label: categories[category].name,
      value: categories[category].slug,
      id: category
    })))
);

export const getMaximumCountries = createSelector([getCountries], countries =>
  (countries ? countries.length : null)
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
  [getMapIndicator, getZoom, getIsShowEUCountriesChecked],
  (indicator, zoom, showEUCountriesChecked) => {
    if (!indicator) return [];
    const paths = [];
    const selectedWorldPaths = showEUCountriesChecked
      ? worldPaths
      : worldPaths.filter(p => !europeanCountries.includes(p.properties.id));
    selectedWorldPaths.forEach(path => {
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
    const section = 'lts-content';
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
    const legendItems = uniqBy(
      bucketsWithId.map(label => {
        let countriesNumber = Object.values(indicator.locations).filter(
          l => l.label_id === parseInt(label.id, 10)
        ).length;
        if (label.name === NO_DOCUMENT_SUBMITTED) {
          countriesNumber =
            maximumCountries - Object.values(indicator.locations).length;
        }
        return {
          ...label,
          value: percentage(countriesNumber, maximumCountries),
          countriesNumber,
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

    const tooltipCountryValues = {};
    Object.keys(updatedSelectedIndicator.locations).forEach(iso => {
      const location = updatedSelectedIndicator.locations[iso];
      const originalIndicatorLocation = selectedIndicator.locations[iso];
      if (location) {
        tooltipCountryValues[iso] = {
          labelId: originalIndicatorLocation.label_id,
          value: location.value
        };
      }
    });
    return tooltipCountryValues;
  }
);

export const getIndicatorEmissionsData = (
  emissionsIndicator,
  selectedIndicator,
  legend
) => {
  if (!emissionsIndicator) return null;
  const emissionPercentages = emissionsIndicator.locations;
  let summedPercentage = 0;
  const data = legend.map(legendItem => {
    let legendItemValue = 0;
    const locationEntries = Object.entries(selectedIndicator.locations);
    const europeanLocationIsos = Object.keys(
      selectedIndicator.locations
    ).filter(iso => europeanCountries.includes(iso));
    locationEntries.forEach(entry => {
      const [locationIso, { label_id: labelId }] = entry;
      if (
        labelId === parseInt(legendItem.id, 10) &&
        emissionPercentages[locationIso]
      ) {
        if (locationIso === europeSlug) {
          const EUTotal = parseFloat(emissionPercentages[europeSlug].value);
          const europeanLocationsValue = europeanLocationIsos.reduce(
            (acc, iso) => acc + parseFloat(emissionPercentages[iso].value),
            0
          );
          legendItemValue += EUTotal - europeanLocationsValue; // To avoid double counting
        } else {
          legendItemValue += parseFloat(emissionPercentages[locationIso].value);
        }
      }
    });
    summedPercentage += legendItemValue;

    return {
      name: legendItem.name,
      value: legendItemValue
    };
  });

  if (summedPercentage < 100) {
    const notSubmittedDataItem = data.find(
      d => d.name === NO_DOCUMENT_SUBMITTED
    );
    if (notSubmittedDataItem) {
      const notApplicablePosition = data.indexOf(notSubmittedDataItem);
      data[notApplicablePosition] = {
        name: NO_DOCUMENT_SUBMITTED,
        value: notSubmittedDataItem.value + (100 - summedPercentage)
      };
    } else {
      data.push({
        name: NO_DOCUMENT_SUBMITTED,
        value: 100 - summedPercentage
      });
    }
  }

  return data;
};

export const getEmissionsCardData = createSelector(
  [getLegend, getMapIndicator, getIndicatorsData],
  (legend, selectedIndicator, indicators) => {
    if (!legend || !selectedIndicator || !indicators) {
      return null;
    }

    const emissionsIndicator = indicators.find(i => i.slug === 'lts_ghg');
    if (!emissionsIndicator) return null;

    let data = getIndicatorEmissionsData(
      emissionsIndicator,
      selectedIndicator,
      legend
    );

    // Remove extra No document submitted. TODO: Fix in data
    data = sortBy(
      data.filter(d => d.name !== 'noDocumentSubmitted'),
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
        notInformationLabel: NO_DOCUMENT_SUBMITTED,
        noLabelOverride: true
      })
    };

    return {
      config,
      data
    };
  }
);

export const getSummaryCardData = createSelector(
  [getIndicatorsData],
  indicators => {
    if (!indicators) return null;
    const LTSIndicator = indicators.find(i => i.slug === 'lts_document');
    if (!LTSIndicator) return null;
    let countriesNumber = Object.values(LTSIndicator.locations).filter(
      l => l.value
    ).length;
    const partiesNumber = countriesNumber;
    const europeanCountriesWithSubmission = europeanCountries.filter(
      iso => LTSIndicator.locations[iso]
    );
    countriesNumber +=
      europeanCountries.length - europeanCountriesWithSubmission.length - 1; // To avoid double counting, also substract the EUU 'country'
    return {
      value: partiesNumber,
      description: ` Parties, representing ${countriesNumber} countries have submitted a Net-Zero plan`
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
