/* eslint-disable max-len */
/* eslint-disable no-confusing-arrow */
import { createSelector } from 'reselect';
import { getColorByIndex, createLegendBuckets } from 'utils/map';
import { arrayToSentence } from 'utils/utils';
import { sortLabelByAlpha } from 'utils/graphs';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import { generateLinkToDataExplorer } from 'utils/data-explorer';
import getIPPaths from 'app/data/world-50m-paths';

import { sortByIndexAndNotInfo, getLabels } from 'components/ndcs/shared/utils';
import {
  europeSlug,
  europeanCountries,
  europeGroupExplorerPagesSlug,
  europeGroupLabel,
  europeLabel
} from 'app/data/european-countries';
import { getIsShowEUCountriesChecked } from 'components/ndcs/shared/explore-map/explore-map-selectors';
import { NET_ZERO_POSITIVE_LABELS, TOP_EMITTERS_OPTION } from 'data/constants';
import {
  selectedLocationsFunction,
  selectedCountriesISOFunction,
  selectedCountriesFunction,
  categoryIndicatorsFunction,
  pathsWithStylesFunction,
  locationsNamesFunction,
  isDefaultLocationSelectedFunction
} from '../shared/selectors';

const NO_DOCUMENT_SUBMITTED = 'No Document Submitted';

const getSearch = state => state.search || null;
const getCountries = state => state.countries || null;
const getCategoriesData = state => state.categories || null;
const getIndicatorsData = state => state.indicators || null;
const getZoom = state => state.map.zoom || null;
export const getDonutActiveIndex = state =>
  state.exploreMap.activeIndex || null;

const getRegions = state =>
  (state && state.regions && state.regions.data) || null;

export const getLocations = createSelector(
  [getRegions, getCountries],
  (regions, countries) => {
    if (!regions || !countries || !regions.length || !countries.length) {
      return null;
    }
    const countryOptions = countries.map(country => ({
      iso: country.iso_code3,
      label: country.wri_standard_name
    }));
    const SOURCES = ['CAIT', 'Climate Watch'];

    const regionOptions = [TOP_EMITTERS_OPTION];
    const updatedRegions = regions;
    updatedRegions.forEach(region => {
      const regionMembers =
        region.members && region.members.map(m => m.iso_code3 || m.iso);
      const regionCountries =
        region.members &&
        region.members
          .filter(
            m => !m.ghg_sources || SOURCES.some(s => m.ghg_sources.includes(s))
          )
          .map(country => ({
            label: country.wri_standard_name,
            iso: country.iso_code3
          }));

      // Add European Union (Party) inside the EU group labels
      if (region.iso_code3 === europeSlug) {
        regionCountries.push({
          label: europeLabel,
          value: europeSlug
        });
      }

      regionOptions.push({
        label:
          region.iso_code3 === europeSlug
            ? europeGroupLabel
            : region.wri_standard_name,
        value:
          region.iso_code3 === europeSlug
            ? europeGroupExplorerPagesSlug
            : region.iso_code3,
        iso:
          region.iso_code3 === europeSlug
            ? europeGroupExplorerPagesSlug
            : region.iso_code3,
        expandsTo: regionMembers,
        regionCountries,
        groupId: 'regions'
      });
    });
    const updatedCountryOptions = [];
    const regionISOs = regionOptions.map(r => r.iso);

    countryOptions.forEach(d => {
      if (!regionISOs.includes(d.iso)) {
        updatedCountryOptions.push({
          ...d,
          value: d.iso,
          groupId: 'countries',
          label: d.iso === europeSlug ? europeLabel : d.label
        });
      }
    });
    // eslint-disable-next-line no-confusing-arrow
    const sortedRegions = sortLabelByAlpha(regionOptions).sort(x =>
      x.value === 'TOP' ? -1 : 0
    );

    return sortedRegions.concat(sortLabelByAlpha(updatedCountryOptions));
  }
);

export const getSelectedLocations = createSelector(
  [getLocations, getSearch],
  selectedLocationsFunction
);

const getSelectedCountries = createSelector(
  [getSelectedLocations, getRegions, getCountries],
  selectedCountriesFunction
);

export const getCategories = createSelector(getCategoriesData, categories =>
  !categories
    ? null
    : Object.keys(categories).map(category => ({
      label: categories[category].name,
      value: categories[category].slug,
      id: category
    }))
);

export const getSelectedCountriesISO = createSelector(
  [getSelectedCountries],
  selectedCountriesISOFunction
);

const getisDefaultLocationSelected = createSelector(
  [getSelectedLocations],
  isDefaultLocationSelectedFunction
);

export const getMaximumCountries = createSelector(
  getSelectedCountriesISO,
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
  categoryIndicatorsFunction
);

export const getSelectedIndicator = createSelector(
  [state => state.indicatorSelected, getCategoryIndicators],
  (selected, indicators = []) => {
    if (!indicators || !indicators.length) return {};
    const defaultSelection =
      indicators.find(i => i.slug === 'nz_status') || indicators[0];
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
        : indicators.find(indicator => indicator.slug === 'nz_status') ||
          indicators[0];
    return mapIndicator;
  }
);

export const getPathsWithStyles = createSelector(
  [
    getMapIndicator,
    getZoom,
    getIsShowEUCountriesChecked,
    getIPPaths,
    getSelectedCountriesISO
  ],
  pathsWithStylesFunction
);

export const getLinkToDataExplorer = createSelector(
  [getSearch, getSelectedCategory, getSelectedIndicator],
  (search, selectedCategory, selectedIndicator) => {
    const section = 'net-zero-content';
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
  [getMapIndicator, getMaximumCountries, getSelectedCountriesISO],
  (indicator, maximumCountries, selectedCountriesISO) => {
    if (!indicator || !indicator.legendBuckets || !maximumCountries) {
      return null;
    }
    const bucketsWithId = Object.keys(indicator.legendBuckets).map(id => ({
      ...indicator.legendBuckets[id],
      id
    }));
    const selectedLocationValues = Object.entries(indicator.locations)
      .map(([iso, value]) =>
        selectedCountriesISO.includes(iso) ? value : undefined
      )
      .filter(Boolean);

    const legendItems = uniqBy(
      bucketsWithId.map(label => {
        let countriesNumber = selectedLocationValues.filter(
          l => l.label_id === parseInt(label.id, 10)
        ).length;
        if (label.name === NO_DOCUMENT_SUBMITTED) {
          countriesNumber = maximumCountries - selectedLocationValues.length;
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
    if (!indicators || !selectedIndicator || !selectedIndicator.locations) {
      return null;
    }
    let updatedSelectedIndicator = selectedIndicator;
    if (selectedIndicator.value === 'nz_submission') {
      updatedSelectedIndicator = indicators.find(i => i.slug === 'nz_target');
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
  legend,
  selectedCountriesISO,
  isDefaultLocationSelected
) => {
  if (!emissionsIndicator) return null;
  const emissionPercentages = isDefaultLocationSelected
    ? Object.entries(emissionsIndicator.locations).reduce(
      (acc, [iso, value]) => {
        if (selectedCountriesISO.includes(iso)) {
          acc[iso] = value;
        }
        return acc;
      },
      {}
    )
    : emissionsIndicator.locations;
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
            (acc, iso) =>
              acc +
              (emissionPercentages[iso]
                ? parseFloat(emissionPercentages[iso].value)
                : 0),
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

  return sortBy(
    data.filter(d => d.value !== 0),
    'value'
  ).reverse();
};

export const getEmissionsCardData = createSelector(
  [
    getLegend,
    getMapIndicator,
    getIndicatorsData,
    getSelectedCountriesISO,
    getisDefaultLocationSelected
  ],
  (
    legend,
    selectedIndicator,
    indicators,
    selectedCountriesISO,
    isDefaultLocationSelected
  ) => {
    if (!legend || !selectedIndicator || !indicators) {
      return null;
    }

    const emissionsIndicator = indicators.find(i => i.slug === 'ndce_ghg');
    if (!emissionsIndicator) return null;

    let data = getIndicatorEmissionsData(
      emissionsIndicator,
      selectedIndicator,
      legend,
      selectedCountriesISO,
      isDefaultLocationSelected
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

export const getLocationsNames = createSelector(
  [getSelectedLocations, getRegions, getCountries],
  locationsNamesFunction
);

export const getSummaryCardData = createSelector(
  [
    getIndicatorsData,
    getLocationsNames,
    getSelectedCountriesISO,
    getisDefaultLocationSelected
  ],
  (
    indicators,
    locationNames,
    selectedCountriesISO,
    isDefaultLocationSelected
  ) => {
    if (!indicators) return null;
    const netZeroIndicator = indicators.find(i => i.slug === 'nz_status');
    if (!netZeroIndicator) return null;

    const emissionsIndicator = indicators.find(i => i.slug === 'ndce_ghg');
    if (!emissionsIndicator) return null;

    const positiveLabelIds = Object.entries(netZeroIndicator.labels)
      .filter(([, l]) => NET_ZERO_POSITIVE_LABELS.includes(l.name))
      .map(([key]) => key);
    const netZeroCountries = Object.keys(
      netZeroIndicator.locations
    ).filter(key =>
      positiveLabelIds.includes(
        String(netZeroIndicator.locations[key].label_id)
      )
    );

    let countriesNumber = netZeroCountries.length;
    const partiesNumber = countriesNumber;

    const europeanCountriesWithSubmission = europeanCountries.filter(
      iso => netZeroIndicator.locations[iso]
    );

    countriesNumber +=
      europeanCountries.length - europeanCountriesWithSubmission.length - 1; // To avoid double counting, also substract the EUU 'country'

    const emissionsNumber = Object.keys(emissionsIndicator.locations)
      .filter(
        iso =>
          netZeroCountries.includes(iso) &&
          !europeanCountriesWithSubmission.includes(iso)
      )
      .reduce(
        (acc, iso) => acc + parseFloat(emissionsIndicator.locations[iso].value),
        0
      );
    const roundedEmissions = Math.round(emissionsNumber * 10) / 10;

    return {
      value: isDefaultLocationSelected
        ? partiesNumber
        : selectedCountriesISO.length,
      description: isDefaultLocationSelected
        ? ` Parties, representing ${countriesNumber} countries and ${roundedEmissions}% of global GHG emissions, have communicated a net-zero target`
        : ` Parties (representing ${arrayToSentence(locationNames)})`
    };
  }
);

export const getPngSelectionSubtitle = createSelector(
  [getSelectedIndicator, getSelectedCategory, getLocationsNames],
  (indicator, category, locationNames) => {
    if (!indicator || !category) return null;
    return `Category: ${category.label}; Indicator: ${
      indicator.label
    }; Countries and Regions: ${arrayToSentence(locationNames)}.`;
  }
);
