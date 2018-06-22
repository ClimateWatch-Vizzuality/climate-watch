import { createSelector } from 'reselect';
import remove from 'lodash/remove';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import {
  DATA_EXPLORER_BLACKLIST,
  DATA_EXPLORER_METADATA_SOURCE,
  DATA_EXPLORER_FILTERS,
  DATA_EXPLORER_SOURCE_IPCC_VERSIONS
} from 'data/constants';

const getSection = state => state.section || null;
const getSearch = state => state.search || null;
const getCountries = state => state.countries || null;
const getRegions = state => state.regions || null;

export const getData = createSelector(
  [state => state.data, getSection],
  (data, section) => {
    if (!data || !section) return null;
    return (data && data[section] && data[section].data) || null;
  }
);

export const getFilterOptions = createSelector(
  [state => state.meta, getSection, getCountries, getRegions],
  (meta, section, countries, regions) => {
    if (!section || isEmpty(meta)) return null;
    const filters = DATA_EXPLORER_FILTERS[section];
    const filtersMeta = meta[section];
    if (!filtersMeta) return null;

    const filterOptions = {};
    if (filters.includes('regions')) filtersMeta.regions = regions;
    if (filters.includes('countries')) filtersMeta.countries = countries;
    if (filters.includes('source_IPCC_version')) {
      filtersMeta.source_IPCC_version = DATA_EXPLORER_SOURCE_IPCC_VERSIONS;
    }
    filters.forEach(f => {
      const options = filtersMeta[f];
      if (options) {
        const parsedOptions = options.map(option => ({
          slug:
            option.slug ||
            option.name ||
            option.value ||
            option.wri_standard_name,
          value: option.name || option.value || option.wri_standard_name,
          label: option.name || option.value || option.wri_standard_name,
          ...option
        }));
        filterOptions[f] = parsedOptions;
      }
    });
    return filterOptions;
  }
);

const removeSelectedFiltersPrefix = (selectedFields, prefix) => {
  const fieldsWithoutPrefix = {};
  Object.keys(selectedFields).forEach(k => {
    const keyWithoutPrefix = k.replace(`${prefix}-`, '');
    fieldsWithoutPrefix[keyWithoutPrefix] = selectedFields[k];
  });
  return fieldsWithoutPrefix;
};

const getSelectedFilters = createSelector(
  [getSearch, getSection, getFilterOptions],
  (search, section, filterOptions) => {
    if (!search || !section || !filterOptions) return null;
    let selectedFields = search;
    const selectedKeys = Object.keys(selectedFields).filter(k =>
      k.startsWith(section)
    );
    selectedFields = pick(selectedFields, selectedKeys);
    const cleanSelectedFilters = removeSelectedFiltersPrefix(
      selectedFields,
      section
    );
    const selectedFilterObjects = {};
    Object.keys(cleanSelectedFilters).forEach(filterKey => {
      selectedFilterObjects[filterKey] = filterOptions[filterKey].find(
        f => f.slug === cleanSelectedFilters[filterKey]
      );
    });
    return selectedFilterObjects;
  }
);

export const getInfoMetadata = createSelector(
  [state => state.meta, getSection, getSelectedFilters],
  (meta, section, selectedfilters) => {
    if (!meta || isEmpty(meta) || !section || !selectedfilters) return null;
    const sectionMetadata = meta['section-metadata'];
    let metaSource = DATA_EXPLORER_METADATA_SOURCE[section];
    if (selectedfilters.source_IPCC_version) {
      const source = selectedfilters.source_IPCC_version.source_slug;
      metaSource = DATA_EXPLORER_METADATA_SOURCE[section][source];
    }
    if (selectedfilters.data_sources) {
      const source = selectedfilters.data_sources.value;
      metaSource = DATA_EXPLORER_METADATA_SOURCE[section][source];
    }
    return sectionMetadata.find(s => s.source === metaSource);
  }
);

export const getSelectedOptions = createSelector(
  [getSelectedFilters],
  selectedFields => {
    if (!selectedFields) return null;
    const selectedOptions = {};

    Object.keys(selectedFields).forEach(key => {
      selectedOptions[key] = {
        value: selectedFields[key].slug || selectedFields[key].label,
        label: selectedFields[key].label
      };
    });
    return selectedOptions;
  }
);

export const parseData = createSelector([getData], data => {
  if (!data || !data.length) return null;
  let updatedData = data;
  if (updatedData[0].emissions) {
    updatedData = updatedData.map(d => {
      const yearEmissions = {};
      d.emissions.forEach(e => {
        yearEmissions[e.year] = e.value;
      });
      return { ...d, ...yearEmissions };
    });
  }
  const whiteList = remove(
    Object.keys(updatedData[0]),
    n => DATA_EXPLORER_BLACKLIST.indexOf(n) === -1
  );
  return updatedData.map(d => pick(d, whiteList));
});
