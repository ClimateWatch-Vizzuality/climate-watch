import { createSelector } from 'reselect';
import remove from 'lodash/remove';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import pick from 'lodash/pick';
import qs from 'query-string';
import { parseQuery } from 'utils/data-explorer';
import { findEqual } from 'utils/utils';
import sortBy from 'lodash/sortBy';
import {
  DATA_EXPLORER_BLACKLIST,
  DATA_EXPLORER_METHODOLOGY_SOURCE,
  DATA_EXPLORER_FILTERS,
  SOURCE_VERSIONS,
  ESP_BLACKLIST,
  DATA_EXPLORER_SECTION_BASE_URIS,
  DATA_EXPLORER_EXTERNAL_PREFIX,
  DATA_EXPLORER_TO_MODULES_PARAMS,
  DATA_EXPLORER_MULTIPLE_LEVEL_SECTIONS,
  DATA_EXPLORER_SECTIONS
} from 'data/constants';

const SECTION_NAMES = {
  pathways: 'emission-pathways',
  historicalEmissions: 'historical-emissions'
};

const FILTER_NAMES = {
  models: 'models',
  categories: 'categories',
  subcategories: 'subcategories'
};

const FILTERED_FIELDS = {
  'historical-emissions': {
    sectors: [
      {
        parent: 'source',
        id: 'data_source_id'
      }
    ]
  },
  'ndc-sdg-linkages': {
    targets: [
      {
        parent: 'goals',
        parentId: 'id',
        id: 'goal_id'
      }
    ]
  },
  'ndc-content': {
    indicators: [
      {
        parent: FILTER_NAMES.categories,
        parentId: 'id',
        id: 'category_ids'
      }
    ]
  },
  'emission-pathways': {
    scenarios: [
      {
        parent: 'models',
        idObject: 'model',
        id: 'id'
      }
    ],
    indicators: [
      {
        parent: FILTER_NAMES.categories,
        idObject: 'category',
        id: 'id'
      },
      {
        parent: 'scenarios',
        parentId: 'indicator_ids',
        id: 'id'
      }
    ]
  }
};

const getMeta = state => state.meta || null;
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

export const getSectionLabel = createSelector(
  getSection,
  section => DATA_EXPLORER_SECTIONS[section].label
);

export const getSourceOptions = createSelector(
  [getMeta, getSection],
  (meta, section) => {
    if (
      !meta ||
      isEmpty(meta) ||
      !section ||
      section !== SECTION_NAMES.historicalEmissions ||
      !meta[section]
    ) {
      return null;
    }
    return SOURCE_VERSIONS.map(option => {
      const data_source = meta[section].data_sources.find(
        s => s.name === option.data_source_slug
      );
      const version = meta[section].gwps.find(
        s => s.name === option.version_slug
      );
      const updatedOption = option;
      updatedOption.data_source_id = data_source && data_source.id;
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

function extractFilterIds(parsedFilters, metadata, isLinkQuery = false) {
  const filterIds = {};
  Object.keys(parsedFilters).forEach(key => {
    let correctedKey = key;
    if (key === FILTER_NAMES.subcategories && !isLinkQuery) {
      correctedKey = FILTER_NAMES.categories;
    }
    const parsedKey = correctedKey.replace('-', '_');
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
    filterIds[parsedKey] = filter && (filter.id || filter.iso_code3);
  });
  return filterIds;
}

function filterQueryIds(meta, search, section, isLinkQuery) {
  if (!meta || isEmpty(meta) || !section) return null;
  const metadata = meta[section];
  if (!metadata) return null;
  const parsedFilters = removeFiltersPrefix(search, section);
  const filterIds = extractFilterIds(parsedFilters, metadata, isLinkQuery);
  return filterIds;
}

export const getFilterQuery = createSelector(
  [getMeta, getSearch, getSection],
  (meta, search, section) => filterQueryIds(meta, search, section, false)
);

export const getLinkFilterQuery = createSelector(
  [getMeta, getSearch, getSection],
  (meta, search, section) => filterQueryIds(meta, search, section, true)
);

export const parseFilterQuery = createSelector([getFilterQuery], filterIds => {
  if (!filterIds || isEmpty(filterIds)) return null;
  const filterQuery = qs.stringify(filterIds);
  return filterQuery && parseQuery(filterQuery);
});

export const getLink = createSelector(
  [getLinkFilterQuery, getSection, state => state.meta],
  (filterQuery, section, meta) => {
    if (!section) return null;
    const parsedQuery = {};
    if (filterQuery && !isEmpty(filterQuery)) {
      Object.keys(filterQuery).forEach(key => {
        const parsedKeyData = DATA_EXPLORER_TO_MODULES_PARAMS[section][key];
        const parsedKey = parsedKeyData && parsedKeyData.key;
        if (parsedKey) {
          const { idLabel, currentId } = parsedKeyData;
          const id = idLabel
            ? meta[section][key].find(m =>
              findEqual(m, ['id', currentId], filterQuery[key])
            )[idLabel]
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

function getPathwaysModelOptions(query, filtersMeta, filter) {
  if (!query || !query.locations) return filtersMeta[filter];
  const locationId = query.locations;
  const locationsSelected = filtersMeta.locations.filter(
    location => location.id === locationId
  );
  return filtersMeta[filter].filter(model =>
    model.geographic_coverage.includes(locationsSelected[0].name)
  );
}

function getPathwaysScenarioOptions(query, filtersMeta, filter) {
  if (!query || !query.models) return filtersMeta[filter];
  const selectedModelId = query.models;
  return filtersMeta[filter].filter(
    scenario => scenario.model.id === selectedModelId
  );
}

function getOptions(section, filter, filtersMeta, query) {
  if (section !== SECTION_NAMES.pathways) return filtersMeta[filter];
  switch (filter) {
    case FILTER_NAMES.models:
      return getPathwaysModelOptions(query, filtersMeta, filter);
    case FILTER_NAMES.scenarios:
      return getPathwaysScenarioOptions(query, filtersMeta, filter);
    case FILTER_NAMES.subcategories:
      return filtersMeta.categories;
    default:
      return filtersMeta[filter];
  }
}

function parseOptions(section, filter, options) {
  if (section !== SECTION_NAMES.pathways) return options;
  switch (filter) {
    case FILTER_NAMES.categories:
      return options.filter(option => option.parent_id === null);
    case FILTER_NAMES.subcategories:
      return options.filter(option => option.parent_id !== null);
    default:
      return options;
  }
}

export const getFilterOptions = createSelector(
  [
    getMeta,
    getSection,
    getCountries,
    getRegions,
    getSourceOptions,
    getFilterQuery
  ],
  (meta, section, countries, regions, sourceVersions, query) => {
    if (!section || isEmpty(meta)) return null;
    const filterKeys = DATA_EXPLORER_FILTERS[section];
    const filtersMeta = meta[section];

    if (!filtersMeta) return null;
    if (filterKeys.includes('regions')) filtersMeta.regions = regions;
    if (filterKeys.includes('countries')) filtersMeta.countries = countries;
    if (filterKeys.includes('source')) {
      filtersMeta.source = sourceVersions;
    }
    const filterOptions = {};
    filterKeys.forEach(f => {
      const options = getOptions(section, f, filtersMeta, query);
      if (options) {
        const parsedOptions = parseOptions(section, f, options);
        const optionsArray = parsedOptions.map(option => {
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
        filterOptions[f] = optionsArray;
      }
    });
    return filterOptions;
  }
);

const parseMultipleLevelOptions = options => {
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

const parseGroupsInOptions = createSelector(
  [getFilterOptions, getSection],
  (options, section) => {
    if (
      !options ||
      !section ||
      DATA_EXPLORER_MULTIPLE_LEVEL_SECTIONS[section] === undefined
    ) {
      return options;
    }
    const updatedOptions = options;
    Object.keys(options).forEach(key => {
      if (
        DATA_EXPLORER_MULTIPLE_LEVEL_SECTIONS[section].find(s => s.key === key)
      ) {
        updatedOptions[key] = parseMultipleLevelOptions(updatedOptions[key]);
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
  [getSearch, getSection, getFilterOptions],
  (search, section, filterOptions) => {
    if (!search || !section || !filterOptions) return null;
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
        f =>
          f.slug === parsedSelectedFilters[filterKey] ||
          f.label === parsedSelectedFilters[filterKey]
      );
    });
    return selectedFilterObjects;
  }
);

export const getFilteredOptions = createSelector(
  [parseGroupsInOptions, getSection, getSelectedFilters],
  (options, section, selectedFilters) => {
    if (
      !section ||
      !FILTERED_FIELDS[section] ||
      !selectedFilters ||
      isEmpty(selectedFilters) ||
      FILTERED_FIELDS[section] === undefined
    ) {
      return options;
    }
    const updatedOptions = { ...options };
    Object.keys(updatedOptions).forEach(key => {
      const filterableKeys = Object.keys(FILTERED_FIELDS[section]);
      if (filterableKeys.includes(key)) {
        FILTERED_FIELDS[section][key].forEach(f => {
          updatedOptions[key] = updatedOptions[key].filter(i => {
            const parentIdLabel = f.parentId || f.id;

            const { id: idLabelToFilterBy, parent: parentLabel } = f;
            let { idObject: idObjectLabel } = f;

            if (
              section === SECTION_NAMES.pathways &&
              parentLabel === FILTER_NAMES.categories &&
              selectedFilters.categories &&
              selectedFilters.categories.parent_id
            ) {
              idObjectLabel = 'subcategory';
            }

            const selectedId =
              selectedFilters[parentLabel] &&
              selectedFilters[parentLabel][parentIdLabel];
            if (!selectedId) return true;
            const id = idObjectLabel
              ? i[idObjectLabel][idLabelToFilterBy]
              : i[idLabelToFilterBy];

            if (isArray(id)) return id.includes(selectedId);
            return isArray(selectedId)
              ? selectedId.includes(id)
              : id === selectedId;
          });
        });
      }
    });
    return updatedOptions;
  }
);

export const getMethodology = createSelector(
  [getMeta, getSection, getSelectedFilters],
  (meta, section, selectedfilters) => {
    const sectionHasSources = section === SECTION_NAMES.historicalEmissions;
    const emissionPathwaysSection = section === SECTION_NAMES.pathways;
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
      const source = selectedfilters.source.data_source_slug;
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
        id: selectedFields[key].id ||
        selectedFields[key].iso_code3 || [
          selectedFields[key].data_source_id,
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
    const metadata = meta[SECTION_NAMES.pathways];
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
    const metadata = meta[SECTION_NAMES.pathways];
    if (!metadata || !metadata.models) return null;
    return metadata.models.find(m => filters.models.id === m.id);
  }
);

export const getIndicatorSelectedMetadata = createSelector(
  [getSelectedFilters, state => state.meta],
  (filters, meta) => {
    if (!filters || !filters.indicators || !meta) return null;
    const metadata = meta[SECTION_NAMES.pathways];
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
