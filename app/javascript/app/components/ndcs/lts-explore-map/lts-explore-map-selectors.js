/* eslint-disable no-confusing-arrow */
import { createSelector } from 'reselect';
import {
  getColorByIndex,
  createLegendBuckets,
  shouldShowPath
} from 'utils/map';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import uniq from 'lodash/uniq';
import { arrayToSentence } from 'utils/utils';
import { sortLabelByAlpha } from 'utils/graphs';
import { generateLinkToDataExplorer } from 'utils/data-explorer';
import getIPPaths from 'app/data/world-50m-paths';
import {
  COUNTRY_STYLES,
  NO_DOCUMENT_SUBMITTED_COUNTRIES
} from 'components/ndcs/shared/constants';
import { TOP_EMITTERS_OPTION } from 'data/constants';
import { sortByIndexAndNotInfo, getLabels } from 'components/ndcs/shared/utils';
import { europeSlug, europeanCountries } from 'app/data/european-countries';
import { getIsShowEUCountriesChecked } from 'components/ndcs/shared/explore-map/explore-map-selectors';

const NO_DOCUMENT_SUBMITTED = 'No Document Submitted';

const getSearch = state => state.search || null;
const getCategoriesData = state => state.categories || null;
const getIndicatorsData = state => state.indicators || null;
const getZoom = state => state.map.zoom || null;

const getCountries = state => state.countries || null;
export const getRegions = state =>
  (state && state.regions && state.regions.data) || null;

export const getDonutActiveIndex = state =>
  state.exploreMap.activeIndex || null;

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
    const SOURCE = 'CAIT';

    const regionOptions = [TOP_EMITTERS_OPTION];
    const updatedRegions = regions;
    updatedRegions.forEach(region => {
      const regionMembers =
        region.members && region.members.map(m => m.iso_code3 || m.iso);
      const regionCountries =
        region.members &&
        region.members
          .filter(m => !m.ghg_sources || m.ghg_sources.includes(SOURCE))
          .map(country => ({
            label: country.wri_standard_name,
            iso: country.iso_code3
          }));
      regionOptions.push({
        label: region.wri_standard_name,
        value: region.iso_code3,
        iso: region.iso_code3,
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
          groupId: 'countries'
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
  (locations, search) => {
    if (!locations || !locations.length || !locations.length > 2) return null;
    const { regions: selected } = search || {};
    const defaultLocation = locations.find(d => d.value === 'WORLD');
    if (selected) {
      const selectedISOS = selected.split(',');
      return (
        locations.filter(location =>
          selectedISOS.some(iso => iso === location.value)
        ) || [defaultLocation]
      );
    }
    return [defaultLocation];
  }
);

const getSelectedCountries = createSelector(
  [getSelectedLocations, getRegions, getCountries],
  (locations, regions, countries) => {
    if (!locations || !locations.length || !regions || !regions.length) {
      return countries;
    }
    const PARTIES_MISSING_IN_WORLD_SECTION = [
      regions.find(r => r.iso_code3 === 'EUU'),
      ...NO_DOCUMENT_SUBMITTED_COUNTRIES
    ];
    const selectedRegionsCountries = locations.reduce((acc, location) => {
      let members = acc;
      regions.some(region => {
        if (region.iso_code3 === location.iso) {
          members = [...acc, ...region.members];
          return true;
        }
        return false;
      });
      if (location.iso === 'TOP') {
        members = [...members, ...location.regionCountries];
      }
      if (location.iso === 'WORLD') {
        members = [
          ...members,
          ...location.regionCountries,
          ...PARTIES_MISSING_IN_WORLD_SECTION
        ];
      }
      return members;
    }, []);
    const selectedRegionsCountriesISOS = selectedRegionsCountries.map(
      c => c.iso_code3
    );
    const notIncludedSelectedCountries = locations.reduce((acc, location) => {
      const updatedAcc = acc;
      countries.some(country => {
        if (
          country.iso_code3 === location.iso &&
          !selectedRegionsCountriesISOS.includes(country.iso_code3)
        ) {
          updatedAcc.push(country);
          return true;
        }
        return false;
      });
      return updatedAcc;
    }, []);

    return selectedRegionsCountries.length ||
      notIncludedSelectedCountries.length
      ? [...selectedRegionsCountries, ...notIncludedSelectedCountries].filter(
        Boolean
      )
      : countries;
  }
);

export const getSelectedCountriesISO = createSelector(
  [getSelectedCountries],
  selectedCountries => {
    if (!selectedCountries) return null;
    return selectedCountries.map(c => c.iso_code3 || c.iso);
  }
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
  [
    getMapIndicator,
    getZoom,
    getIsShowEUCountriesChecked,
    getIPPaths,
    getSelectedCountriesISO
  ],
  (
    indicator,
    zoom,
    showEUCountriesChecked,
    worldPaths,
    selectedCountriesISO
  ) => {
    if (!indicator || !worldPaths) return [];
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
        if (!selectedCountriesISO.includes(iso)) {
          const color = '#e8ecf5';
          style.default.fill = color;
          style.hover.fill = color;
        } else if (countryData && countryData.label_id) {
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
  [getLegend, getMapIndicator, getIndicatorsData, getSelectedCountriesISO],
  (legend, selectedIndicator, indicators, selectedCountriesISO) => {
    if (!legend || !selectedIndicator || !indicators) {
      return null;
    }

    const emissionsIndicator = indicators.find(i => i.slug === 'lts_ghg');
    if (!emissionsIndicator) return null;

    let data = getIndicatorEmissionsData(
      emissionsIndicator,
      selectedIndicator,
      legend,
      selectedCountriesISO
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

export const getLocationsNames = createSelector(
  [getSelectedLocations, getRegions, getCountries],
  (locations, regions, countries) => {
    if (!locations || !locations.length || (!regions && !countries)) return [];
    const selectedRegionsNames = locations.reduce((acc, location) => {
      let names = acc;
      regions.some(region => {
        if (region.iso_code3 === location.iso) {
          names = [...acc, region.wri_standard_name];
          return true;
        }
        if (location.iso === 'TOP') {
          names = [...acc, location.label];
          return true;
        }

        return false;
      });
      return names;
    }, []);
    const selectedCountriesNames = locations.reduce((acc, location) => {
      const updatedAcc = acc;
      countries.some(country => {
        if (country.iso_code3 === location.iso) {
          updatedAcc.push(country.wri_standard_name);
          return true;
        }
        return false;
      });
      return updatedAcc;
    }, []);
    return uniq([...selectedRegionsNames, ...selectedCountriesNames]);
  }
);

export const getSummaryCardData = createSelector(
  [getIndicatorsData, getLocationsNames, getSelectedCountriesISO],
  (indicators, locationNames, selectedCountriesISO) => {
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
    const isDefaultSelected =
      locationNames.length === 1 && locationNames[0] === 'World';
    countriesNumber +=
      europeanCountries.length - europeanCountriesWithSubmission.length - 1; // To avoid double counting, also substract the EUU 'country'
    return {
      value: isDefaultSelected ? partiesNumber : selectedCountriesISO.length,
      description: isDefaultSelected
        ? ` Parties have submitted a long-term strategy document, representing ${countriesNumber} countries`
        : ` Parties (representing ${arrayToSentence(locationNames)})`
    };
  }
);

export const getPngSelectionSubtitle = createSelector(
  [getSelectedIndicator, getSelectedCategory, getIsShowEUCountriesChecked],
  (indicator, category, euChecked) => {
    if (!indicator || !category) return null;
    return `Category: ${category.label}; Indicator: ${
      indicator.label
    }; EU members are ${euChecked ? '' : 'not'} visualized on the map.`;
  }
);
