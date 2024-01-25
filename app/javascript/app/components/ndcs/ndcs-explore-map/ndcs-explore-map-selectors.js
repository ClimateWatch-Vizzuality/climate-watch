/* eslint-disable max-len */
/* eslint-disable no-confusing-arrow */
import { createSelector } from 'reselect';
import { getColorByIndex } from 'utils/map';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import intersection from 'lodash/intersection';
import { arrayToSentence } from 'utils/utils';
import { generateLinkToDataExplorer } from 'utils/data-explorer';
import getIPPaths from 'app/data/world-50m-paths';
import { sortLabelByAlpha } from 'utils/graphs';
import { getIsShowEUCountriesChecked } from 'components/ndcs/shared/explore-map/explore-map-selectors';
import {
  sortByIndexAndNotInfo,
  getIndicatorEmissionsData,
  getLabels
} from 'components/ndcs/shared/utils';
import {
  europeSlug,
  europeGroupExplorerPagesSlug,
  europeanCountries,
  europeLabel,
  europeGroupLabel
} from 'app/data/european-countries';
import {
  DEFAULT_NDC_EXPLORE_CATEGORY_SLUG,
  CATEGORY_SOURCES,
  NOT_COVERED_LABEL,
  INDICATOR_SLUGS,
  TOP_EMITTERS_OPTION
} from 'data/constants';
import { getSubmitted2020Isos } from 'utils/indicatorCalculations';
import {
  selectedLocationsFunction,
  selectedCountriesISOFunction,
  selectedMapCountriesISOFunction,
  selectedCountriesFunction,
  categoryIndicatorsFunction,
  pathsWithStylesFunction,
  getColorException,
  locationsNamesFunction,
  getVulnerabilityDataFunction,
  isDefaultLocationSelectedFunction
} from '../shared/selectors';

const NOT_APPLICABLE_LABEL = 'Not Applicable';

const getSearch = state => state.search || null;
const getSectors = state => state.sectors || null;
const getDocumentData = state => state.documents && state.documents.data;
const getCountries = state => state.countries || null;
const getRegions = state =>
  (state && state.regions && state.regions.data) || null;

export const getMetadata = state =>
  !state.metadata.loading ? state.metadata.data : null;

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
    const SOURCES = ['Climate Watch'];

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

export const getDocuments = createSelector([getDocumentData], documents => {
  const allDocumentOption = [
    {
      label: 'All documents',
      value: 'all'
    }
  ];
  if (!documents) return allDocumentOption;
  const documentsOptions = sortBy(Object.values(documents), 'ordering').map(
    d => ({
      label: d.long_name,
      value: d.slug
    })
  );
  return [...allDocumentOption, ...documentsOptions];
});

export const getSelectedDocument = createSelector(
  [getDocuments, getSearch],
  (documents = [], search) => {
    if (!documents || !documents.length) return null;
    const { document: selected } = search || {};
    const defaultDocument = documents.find(d => d.value === 'all');
    if (selected) {
      return (
        documents.find(document => document.value === selected) ||
        defaultDocument
      );
    }
    return defaultDocument;
  }
);

const getIndicatorsData = state => state.indicators || null;
const getZoom = state => state.map.zoom || null;

export const getDonutActiveIndex = state =>
  state.exploreMap.activeIndex || null;

export const getCategories = createSelector(
  [getCategoriesData, getIndicatorsData],
  (categories, indicators) => {
    if (!categories) return null;
    const indicatorsWithData = indicators.filter(i => !isEmpty(i.locations));
    const availableCategoryIds = indicatorsWithData.reduce(
      (acc, value) => acc.concat(value.category_ids),
      []
    );
    const uniqAvailableCategoryIds = uniq(availableCategoryIds);
    const availableCategoryKeys = Object.keys(categories).filter(categoryId =>
      uniqAvailableCategoryIds.includes(+categoryId)
    );

    return availableCategoryKeys.map(category => ({
      label: categories[category].name,
      value: categories[category].slug,
      id: category
    }));
  }
);

const getSelectedCountries = createSelector(
  [getSelectedLocations, getRegions, getCountries],
  selectedCountriesFunction
);

const getisDefaultLocationSelected = createSelector(
  [getSelectedLocations],
  isDefaultLocationSelectedFunction
);

export const getSelectedCountriesISO = createSelector(
  [getSelectedCountries],
  selectedCountriesISOFunction
);

export const getSelectedMapCountriesISO = createSelector(
  [getIsShowEUCountriesChecked, getSelectedCountriesISO],
  selectedMapCountriesISOFunction
);

export const getMaximumCountries = createSelector(
  getSelectedCountriesISO,
  countries => countries.length
);

export const getIndicatorsParsed = createSelector(
  [getCategories, getIndicatorsData, getSectors],
  (categories, indicators, sectors) => {
    if (!categories || !indicators || !indicators.length) return null;
    let parentIndicatorNames = [];
    const parsedIndicators = sortBy(
      uniqBy(
        indicators.map(i => {
          if (!(i.locations && Object.values(i.locations)[0])) return null;

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
        }).filter((i) => i !== null),
        'value'
      ),
      'label'
    );

    parentIndicatorNames = uniq(parentIndicatorNames);

    return parsedIndicators.map(i =>
      parentIndicatorNames.includes(i.label)
        ? { ...i, groupParent: i.label }
        : i
    );
  }
);

export const getSelectedCategory = createSelector(
  [state => state.categorySelected, getCategories, getSelectedDocument],
  (selected, categories = [], selectedDocument) => {
    if (!categories || !categories.length || !selectedDocument) return null;
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
  (indicatorsParsed, selectedCategory) => categoryIndicatorsFunction(indicatorsParsed, selectedCategory)
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
  [getMapIndicator, getMaximumCountries, getSelectedCountriesISO],
  (indicator, maximumCountries, selectedCountriesISO) => {
    if (!indicator || !indicator.legendBuckets || !maximumCountries) {
      return null;
    }
    const bucketsWithId = Object.keys(indicator.legendBuckets).map(id => ({
      ...indicator.legendBuckets[id],
      id
    }));
    const legendItems = [];
    const selectedLocationValues = Object.entries(indicator.locations)
      .map(([iso, value]) =>
        selectedCountriesISO.includes(iso) ? value : undefined
      )
      .filter(Boolean);

    bucketsWithId.forEach(label => {
      const partiesNumber = selectedLocationValues.filter(
        l => l.label_id === parseInt(label.id, 10)
      ).length;
      legendItems.push({
        ...label,
        value: percentage(partiesNumber, maximumCountries),
        partiesNumber,
        color:
          getColorException(indicator, label) ||
          getColorByIndex(indicator.legendBuckets, label.index)
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
    const data = getIndicatorEmissionsData(
      emissionsIndicator,
      selectedIndicator,
      legend,
      selectedCountriesISO,
      isDefaultLocationSelected
    );
    // Info tooltip only available for this indicator
    const tooltip = selectedIndicator.value === 'child_sensitive_NDC' && {
      'Category A':
        'The NDC is Category A because it meets 4 of 4 criteria for child sensitivity',
      'Category B':
        'The NDC is Category B because it meets 3 of 4 criteria for child sensitivity',
      'Category C':
        'The NDC is Category C because it meets 0-2 of 4 criteria for child sensitivity'
    };

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
      data,
      tooltip
    };
  }
);

export const getVulnerabilityData = createSelector(
  [getLegend, getMapIndicator, getIndicatorsData, getSelectedCountriesISO],
  getVulnerabilityDataFunction
);

const getCountriesAndParties = submissions => {
  const countriesSubmissions = submissions.filter(s => s !== europeSlug);
  const partiesNumber = submissions.length;
  let countriesNumber = countriesSubmissions.length;

  if (submissions.includes(europeGroupExplorerPagesSlug)) {
    const europeanCountriesWithSubmission = intersection(
      europeanCountries,
      countriesSubmissions
    );

    countriesNumber +=
      europeanCountries.length - (europeanCountriesWithSubmission.length - 1);
  }

  return { partiesNumber, countriesNumber };
};

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
    const submittedIndicator = indicators.find(
      ind => ind.slug === INDICATOR_SLUGS.enhancements
    );
    const submittedIsos = getSubmitted2020Isos(submittedIndicator);
    if (!submittedIsos || !submittedIsos.length) return null;
    const submittedCountriesAndParties = getCountriesAndParties(submittedIsos);
    return [
      {
        value: isDefaultLocationSelected
          ? submittedCountriesAndParties.partiesNumber
          : selectedCountriesISO.length,
        description: isDefaultLocationSelected
          ? ` Parties (representing ${submittedCountriesAndParties.countriesNumber} countries) have submitted their new or updated NDCs. `
          : ` Parties (representing ${arrayToSentence(locationNames)})`
      }
    ];
  }
);

export const getPngSelectionSubtitle = createSelector(
  [
    getSelectedIndicator,
    getSelectedCategory,
    getSelectedDocument,
    getLocationsNames
  ],
  (indicator, category, document, locationNames) => {
    if (!indicator || !category) return null;
    const documentText = document ? `Document: ${document.label}; ` : '';
    return `${documentText}Category: ${category.label}; Indicator: ${
      indicator.label
    }; Countries and Regions: ${arrayToSentence(locationNames)}.`;
  }
);
