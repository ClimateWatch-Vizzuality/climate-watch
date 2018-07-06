import { createSelector } from 'reselect';
import remove from 'lodash/remove';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import qs from 'query-string';
import { parseQuery } from 'utils/data-explorer';
import sortBy from 'lodash/sortBy';
import {
  DATA_EXPLORER_BLACKLIST,
  DATA_EXPLORER_METHODOLOGY_SOURCE,
  DATA_EXPLORER_FILTERS,
  SOURCE_IPCC_VERSIONS,
  ESP_BLACKLIST,
  DATA_EXPLORER_SECTION_BASE_URIS,
  DATA_EXPLORER_EXTERNAL_PREFIX,
  DATA_EXPLORER_TO_MODULES_PARAMS
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

const removeFiltersPrefix = (selectedFields, prefix) => {
  const fieldsWithoutPrefix = {};
  Object.keys(selectedFields).forEach(k => {
    const keyWithoutPrefix = k.replace(`${prefix}-`, '');
    fieldsWithoutPrefix[keyWithoutPrefix] = selectedFields[k];
  });
  return fieldsWithoutPrefix;
};

const findEqual = (parent, children, value) =>
  children.find(c => parent[c] === value);

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
        metadata[parsedKey].find(option =>
          findEqual(
            option,
            [
              'name',
              'full_name',
              'value',
              'wri_standard_name',
              'cw_title',
              'slug',
              'number'
            ],
            parsedFilters[key]
          )
        );
      filterIds[parsedKey] =
        filter && (filter.iso_code || filter.id || filter.iso_code3);
    });
    return filterIds;
  }
);

export const parseFilterQuery = createSelector([getFilterQuery], filterIds => {
  if (!filterIds || isEmpty(filterIds)) return null;
  const filterQuery = qs.stringify(filterIds);
  return filterQuery && parseQuery(filterQuery);
});

export const getLink = createSelector(
  [getFilterQuery, getSection, state => state.meta],
  (filterQuery, section, meta) => {
    if (!section) return null;
    const parsedQuery = {};
    if (filterQuery && !isEmpty(filterQuery)) {
      Object.keys(filterQuery).forEach(key => {
        const parsedKeyData = DATA_EXPLORER_TO_MODULES_PARAMS[section][key];
        const parsedKey = parsedKeyData && parsedKeyData.key;
        if (parsedKey) {
          const { idLabel } = parsedKeyData;
          const id = idLabel
            ? meta[section][key].find(m => m.id === filterQuery[key])[idLabel]
            : filterQuery[key];
          parsedQuery[parsedKey] = id;
        }
      });
    }
    const stringifiedQuery = qs.stringify(parsedQuery);
    const urlParameters = stringifiedQuery ? `?${stringifiedQuery}` : '';
    const subSection =
      DATA_EXPLORER_SECTION_BASE_URIS[section] === 'pathways' ? '/models' : '';
    return `/${DATA_EXPLORER_SECTION_BASE_URIS[
      section
    ]}${subSection}${urlParameters}`;
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
            option.full_name ||
            option.value ||
            option.wri_standard_name ||
            option.number;
          let label =
            option.name ||
            option.full_name ||
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

const parseOptions = options => {
  const groupParents = [];
  const finalOptions = options
    .map(option => {
      const updatedOption = option;
      if (!option.parent_id) {
        updatedOption.groupParent = option.name;
        groupParents.push({ parentId: option.id, name: option.name });
      }
      return updatedOption;
    })
    .map(option => {
      const updatedOption = option;
      if (option.parent_id) {
        updatedOption.group = groupParents.find(
          o => option.parent_id === o.parentId
        ).name;
      }
      return updatedOption;
    });
  return sortBy(finalOptions, 'label');
};

export const parseGroupsInOptions = createSelector(
  [getFilterOptions, getSection],
  (options, section) => {
    const MULTIPLE_LEVEL_SECTIONS = { 'ndc-content': ['sectors'] };
    if (
      !options ||
      !section ||
      MULTIPLE_LEVEL_SECTIONS[section] === undefined
    ) {
      return options;
    }
    const updatedOptions = options;
    Object.keys(options).forEach(key => {
      if (MULTIPLE_LEVEL_SECTIONS[section].includes(key)) {
        updatedOptions[key] = parseOptions(updatedOptions[key]);
      }
    });
    return updatedOptions;
  }
);

const mergeSourcesAndVersions = filters => {
  const dataSourceFilter = filters['data-sources'];
  let versionFilter = filters.gwps;
  const updatedFilters = filters;
  if (dataSourceFilter) {
    if (dataSourceFilter === 'CAIT') versionFilter = 'AR2'; // Remove when GHG emissions has the correct version options
    updatedFilters.source = `${dataSourceFilter} - ${versionFilter}`;
    delete updatedFilters['data-sources'];
    delete updatedFilters.gwps;
  }
  return updatedFilters;
};

export const parseExternalParams = createSelector(
  [getSearch, getSection, getFilterOptions, state => state.meta],
  (search, section, filterOptions, meta) => {
    if (!search || !section || !filterOptions || !meta) return null;
    const selectedFields = search;
    const selectedKeys = Object.keys(selectedFields).filter(k =>
      k.startsWith(`${DATA_EXPLORER_EXTERNAL_PREFIX}-${section}`)
    );
    if (selectedKeys.length < 1) return null;
    const externalFields = pick(selectedFields, selectedKeys);
    const parsedFields = {};
    Object.keys(externalFields).forEach(k => {
      const keyWithoutPrefix = k
        .replace(`${DATA_EXPLORER_EXTERNAL_PREFIX}-`, '')
        .replace(`${section}-`, '');
      const metaMatchingKey = keyWithoutPrefix.replace('-', '_');
      if (metaMatchingKey !== 'undefined') {
        const possibleLabelFields = [
          'name',
          'full_name',
          'value',
          'wri_standard_name',
          'slug',
          'number',
          'cw_title'
        ];
        const labelObject = meta[section][metaMatchingKey].find(
          i =>
            i.id === parseInt(externalFields[k], 10) ||
            i.number === externalFields[k]
        );
        const label = possibleLabelFields.find(
          f => labelObject && labelObject[f]
        );
        parsedFields[k.replace(`${DATA_EXPLORER_EXTERNAL_PREFIX}-`, '')] =
          labelObject[label];
      }
    });
    return parsedFields;
  }
);

const getSelectedFilters = createSelector(
  [
    getSearch,
    getSection,
    getFilterOptions,
    state => state.meta,
    parseExternalParams
  ],
  (search, section, filterOptions, meta) => {
    if (!search || !section || !filterOptions || !meta) return null;
    const selectedFields = search;
    const nonExternalKeys = Object.keys(selectedFields).filter(
      k => !k.startsWith(DATA_EXPLORER_EXTERNAL_PREFIX)
    );
    const selectedKeys = nonExternalKeys.filter(k => k.startsWith(section));
    const sectionRelatedFields = pick(selectedFields, selectedKeys);
    const parsedSelectedFilters = mergeSourcesAndVersions(
      removeFiltersPrefix(sectionRelatedFields, section)
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
    const emissionPathwaysSection = section === 'emission-pathways';
    if (
      !meta ||
      isEmpty(meta) ||
      !section ||
      (sectionHasSources &&
        (isEmpty(selectedfilters) || !selectedfilters.source)) ||
      (emissionPathwaysSection &&
        (isEmpty(selectedfilters) ||
          (!selectedfilters.indicators &&
            !selectedfilters.models &&
            !selectedfilters.scenarios)))
    ) {
      return null;
    }

    if (emissionPathwaysSection) {
      const { models, scenarios, indicators } = selectedfilters;
      return [models, scenarios, indicators].filter(m => m);
    }

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
        value: selectedFields[key].label || selectedFields[key].slug,
        label: selectedFields[key].label,
        id: selectedFields[key].iso_code ||
        selectedFields[key].id ||
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

// Pathways Modal Data

const getScenarioSelectedMetadata = createSelector(
  [getSelectedFilters, state => state.meta],
  (filters, meta) => {
    if (!filters || !filters.scenarios || !meta) return null;
    const metadata = meta['emission-pathways'];
    if (!metadata || !metadata.scenarios) return null;
    const scenario = metadata.scenarios.find(
      m => filters.scenarios.id === m.id
    );
    return (
      scenario && {
        name: scenario.name,
        description: scenario.description,
        Link: `/pathways/scenarios/${scenario.id}`
      }
    );
  }
);

const getModelSelectedMetadata = createSelector(
  [getSelectedFilters, state => state.meta],
  (filters, meta) => {
    if (!filters || !filters.models || !meta) return null;
    const metadata = meta['emission-pathways'];
    if (!metadata || !metadata.models) return null;
    return metadata.models.find(m => filters.models.id === m.id);
  }
);

export const getIndicatorSelectedMetadata = createSelector(
  [getSelectedFilters, state => state.meta],
  (filters, meta) => {
    if (!filters || !filters.indicators || !meta) return null;
    const metadata = meta['emission-pathways'];
    if (!metadata || !metadata.indicators) return null;
    return metadata.indicators.find(m => filters.indicators.id === m.id);
  }
);

const addLinktoModelSelectedMetadata = createSelector(
  [getModelSelectedMetadata],
  model => {
    if (!model) return null;
    return {
      ...model,
      Link: `/pathways/models/${model.id}`
    };
  }
);

export const filterModelsByBlackList = createSelector(
  [addLinktoModelSelectedMetadata],
  data => {
    if (!data || isEmpty(data)) return null;
    const whiteList = remove(
      Object.keys(data),
      n => ESP_BLACKLIST.models.indexOf(n) === -1
    );
    return pick(data, whiteList);
  }
);

const filterIndicatorsByBlackList = createSelector(
  [getIndicatorSelectedMetadata],
  data => {
    if (!data || isEmpty(data)) return null;
    const whiteList = remove(
      Object.keys(data),
      n => ESP_BLACKLIST.indicators.indexOf(n) === -1
    );
    return pick(data, whiteList);
  }
);

export const parseObjectsInIndicators = createSelector(
  [filterIndicatorsByBlackList],
  data => {
    if (isEmpty(data)) return null;
    const parsedData = {};
    Object.keys(data).forEach(key => {
      let fieldData = data[key];
      if (
        fieldData &&
        typeof fieldData !== 'string' &&
        typeof fieldData !== 'number'
      ) {
        fieldData = fieldData.name;
      }
      parsedData[key] = fieldData;
    });
    return parsedData;
  }
);

export const getPathwaysMetodology = createSelector(
  [
    filterModelsByBlackList,
    getScenarioSelectedMetadata,
    parseObjectsInIndicators
  ],
  (model, scenario, indicator) => [model, scenario, indicator].filter(m => m)
);
