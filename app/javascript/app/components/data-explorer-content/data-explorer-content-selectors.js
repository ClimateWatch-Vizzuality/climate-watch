import { createSelector } from 'reselect';
import remove from 'lodash/remove';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import qs from 'query-string';
import { parseQuery } from 'utils/data-explorer';
import {
  DATA_EXPLORER_BLACKLIST,
  DATA_EXPLORER_METHODOLOGY_SOURCE,
  DATA_EXPLORER_FILTERS,
  SOURCE_IPCC_VERSIONS
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

export const getSourceIPCCOptions = createSelector(
  [state => state.meta, getSection],
  (meta, section) => {
    if (
      !meta ||
      isEmpty(meta) ||
      !section ||
      section !== 'historical-emissions' ||
      !meta[section]
    ) {
      return null;
    }
    return SOURCE_IPCC_VERSIONS.map(option => {
      const data_source = meta[section].data_sources.find(
        s => s.name === option.source_slug
      );
      const version = meta[section].gwps.find(
        s => s.name === option.version_slug
      );
      const updatedOption = option;
      updatedOption.source_id = data_source && data_source.id;
      updatedOption.version_id = version && version.id;
      return updatedOption;
    });
  }
);

export const getFilterQuery = createSelector(
  [state => state.meta, getSearch, getSection],
  (meta, search, section) => {
    if (!meta || isEmpty(meta) || !section) return null;
    const metadata = meta[section];
    if (!metadata) return null;
    const parsedFilters = removeFiltersPrefix(search, section);
    const filterIds = {};
    Object.keys(parsedFilters).forEach(key => {
      const parsedKey = key.replace('-', '_');
      const filter =
        metadata[parsedKey] &&
        metadata[parsedKey].find(
          option =>
            option.name === parsedFilters[key] ||
            option.value === parsedFilters[key] ||
            option.wri_standard_name === parsedFilters[key] ||
            option.cw_title === parsedFilters[key] ||
            option.slug === parsedFilters[key] ||
            option.number === parsedFilters[key]
        );
      filterIds[parsedKey] = filter && (filter.id || filter.iso_code3);
    });
    const filterQuery = qs.stringify(filterIds);
    return filterQuery && parseQuery(filterQuery);
  }
);

export const getFilterOptions = createSelector(
  [
    state => state.meta,
    getSection,
    getCountries,
    getRegions,
    getSourceIPCCOptions
  ],
  (meta, section, countries, regions, sourceVersions) => {
    if (!section || isEmpty(meta)) return null;
    const filters = DATA_EXPLORER_FILTERS[section];
    const filtersMeta = meta[section];
    if (!filtersMeta) return null;
    if (filters.includes('regions')) filtersMeta.regions = regions;
    if (filters.includes('countries')) filtersMeta.countries = countries;
    if (filters.includes('source')) {
      filtersMeta.source = sourceVersions;
    }
    const filterOptions = {};
    filters.forEach(f => {
      const options = filtersMeta[f];
      if (options) {
        const parsedOptions = options.map(option => {
          const slug =
            option.slug ||
            option.name ||
            option.value ||
            option.wri_standard_name ||
            option.number;
          let label =
            option.name ||
            option.value ||
            option.wri_standard_name ||
            option.cw_title ||
            option.number;
          if (f === 'goals') label = `${option.number}: ${label}`;
          return {
            slug,
            value: label,
            label,
            ...option
          };
        });
        filterOptions[f] = parsedOptions;
      }
    });
    return filterOptions;
  }
);

const removeFiltersPrefix = (selectedFields, prefix) => {
  const fieldsWithoutPrefix = {};
  Object.keys(selectedFields).forEach(k => {
    const keyWithoutPrefix = k.replace(`${prefix}-`, '');
    fieldsWithoutPrefix[keyWithoutPrefix] = selectedFields[k];
  });
  return fieldsWithoutPrefix;
};

const mergeSourcesAndVersions = filters => {
  const dataSourceFilter = filters['data-sources'];
  const versionFilter = filters.gwps;
  const updatedFilters = filters;
  if (dataSourceFilter) {
    updatedFilters.source = `${dataSourceFilter} - ${versionFilter}`;
    delete updatedFilters['data-sources'];
    delete updatedFilters.gwps;
  }
  return updatedFilters;
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
    const parsedSelectedFilters = mergeSourcesAndVersions(
      removeFiltersPrefix(selectedFields, section)
    );

    const selectedFilterObjects = {};
    Object.keys(parsedSelectedFilters).forEach(filterKey => {
      selectedFilterObjects[filterKey] = filterOptions[filterKey].find(
        f => f.slug === parsedSelectedFilters[filterKey]
      );
    });
    return selectedFilterObjects;
  }
);

export const getMethodology = createSelector(
  [state => state.meta, getSection, getSelectedFilters],
  (meta, section, selectedfilters) => {
    const sectionHasSources = section === 'historical-emissions';
    if (
      !meta ||
      isEmpty(meta) ||
      !section ||
      (sectionHasSources && isEmpty(selectedfilters))
    ) { return null; }
    const methodology = meta.methodology;
    let metaSource = DATA_EXPLORER_METHODOLOGY_SOURCE[section];
    if (sectionHasSources) {
      const source = selectedfilters.source.source_slug;
      metaSource = DATA_EXPLORER_METHODOLOGY_SOURCE[section][source];
    }
    return methodology.filter(s => metaSource.includes(s.source));
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
        label: selectedFields[key].label,
        id: selectedFields[key].id ||
        selectedFields[key].iso_code3 || [
          selectedFields[key].source_id,
          selectedFields[key].version_id
        ]
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
