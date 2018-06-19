import { createSelector } from 'reselect';
import remove from 'lodash/remove';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import {
  DATA_EXPLORER_BLACKLIST,
  DATA_EXPLORER_METADATA_SOURCE,
  DATA_EXPLORER_FILTERS
} from 'data/constants';

const getSection = state => state.section || null;
const getSearch = state => state.search || null;

export const getData = createSelector(
  [state => state.data, getSection],
  (data, section) => {
    if (!data || !section) return null;
    return (data && data[section] && data[section].data) || null;
  }
);

export const getMeta = createSelector(
  [state => state.meta, getSection],
  (meta, section) => {
    if (!meta || isEmpty(meta) || !section) return null;
    const sectionMetadata = meta['section-metadata'];
    return sectionMetadata.find(
      s => s.source === DATA_EXPLORER_METADATA_SOURCE[section]
    );
  }
);

export const getFilterOptions = createSelector(
  [state => state.meta, getSection],
  (meta, section) => {
    if (!section || isEmpty(meta)) return null;
    const filters = DATA_EXPLORER_FILTERS[section];
    const filtersMeta = meta[section];
    if (!filtersMeta) return null;

    const filterOptions = {};
    filters.forEach(f => {
      const options = filtersMeta[f];
      if (options) {
        const parsedOptions = options.map(option => ({
          slug: option.slug || option.name || option.value,
          value: option.name || option.value,
          label: option.name || option.value
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
