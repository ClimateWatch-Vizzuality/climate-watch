import { createSelector } from 'reselect';
import remove from 'lodash/remove';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import pick from 'lodash/pick';
import qs from 'query-string';
import { findEqual, isANumber } from 'utils/utils';
import sortBy from 'lodash/sortBy';
import {
  DATA_EXPLORER_BLACKLIST,
  DATA_EXPLORER_METHODOLOGY_SOURCE,
  DATA_EXPLORER_FILTERS,
  DATA_EXPLORER_EXTERNAL_PREFIX,
  DATA_EXPLORER_TO_MODULES_PARAMS,
  MULTIPLE_LEVEL_SECTION_FIELDS,
  FIRST_TABLE_HEADERS,
  DATA_EXPLORER_SECTIONS,
  SECTION_NAMES,
  FILTER_NAMES,
  FILTERED_FIELDS,
  POSSIBLE_LABEL_FIELDS,
  POSSIBLE_VALUE_FIELDS,
  NON_COLUMN_KEYS,
  FILTER_DEFAULTS
} from 'data/data-explorer-constants';
import { SOURCE_VERSIONS } from 'data/constants';
import {
  getPathwaysModelOptions,
  getPathwaysScenarioOptions,
  getPathwaysCategoryOptions,
  getPathwaysSubcategoryOptions,
  getPathwaysIndicatorsOptions
} from './pathway-selector-utils';

const getSection = state => state.section || null;
const getSearch = state => state.search || null;
const getCountries = state => state.countries || null;
const getRegions = state => state.regions || null;
export const getMeta = state => state.meta || null;

const getDataSection = createSelector(
  [state => state.data, getSection],
  (data, section) => {
    if (!data || !section) return null;
    return (data && data[section] && data[section]) || null;
  }
);

export const getData = createSelector(
  [getDataSection],
  data => (data && data.data) || null
);
const getAvailableYears = createSelector(
  [getDataSection],
  data => (data && data.meta && data.meta.years) || null
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
      const dataSource = meta[section].data_sources.find(
        s => s.name === option.dataSourceSlug
      );
      const version = meta[section].gwps.find(
        s => s.name === option.versionSlug
      );
      const updatedOption = option;
      updatedOption.dataSourceId = dataSource && dataSource.id;
      updatedOption.versionId = version && version.id;
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

const findSelectedValueObject = (meta, selectedId) =>
  meta.find(
    option =>
      option.iso_code === selectedId ||
      option.iso_code3 === selectedId ||
      option.name === selectedId ||
      String(option.id) === selectedId
  );

function extractFilterIds(parsedFilters, metadata, isLinkQuery = false) {
  const filterIds = {};
  const subcategories =
    metadata.categories && metadata.categories.filter(cat => cat.parent_id);
  // Subcategories are needed on Pathways
  const metadataWithSubcategories = subcategories
    ? { ...metadata, subcategories }
    : metadata;
  Object.keys(parsedFilters).forEach(key => {
    let correctedKey = key;
    if (key === FILTER_NAMES.subcategories && !isLinkQuery) {
      correctedKey = FILTER_NAMES.categories;
    }
    const parsedKey = correctedKey.replace('-', '_');
    const selectedIds = parsedFilters[key].split(',');
    const filters = [];
    if (metadataWithSubcategories[parsedKey]) {
      selectedIds.forEach(selectedId => {
        const foundSelectedOption = findSelectedValueObject(
          metadataWithSubcategories[parsedKey],
          selectedId
        );
        if (foundSelectedOption) filters.push(foundSelectedOption);
      });
    }
    if (filters && filters.length > 0) {
      filterIds[parsedKey] = filters.map(
        f => f.id || f.iso_code || f.iso_code3
      );
    }
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
  (meta, search, section) => {
    const paramsToColumns = { 'data-sources': 'source' };
    const searchKeys = Object.keys(search);
    const parsedSearchKeys = searchKeys.map(k => {
      const keyWithoutSectionPrefix = k.replace(`${section}-`, '');
      return (
        paramsToColumns[keyWithoutSectionPrefix] || keyWithoutSectionPrefix
      );
    });
    const filterDefaultKeys = Object.keys(FILTER_DEFAULTS[section]);
    const noExternalParams = !searchKeys.some(s =>
      s.startsWith(DATA_EXPLORER_EXTERNAL_PREFIX)
    );
    const checkedDefaultParams = filterDefaultKeys.every(defaultKey =>
      parsedSearchKeys.includes(defaultKey, section)
    );
    const isReadyForFetch = noExternalParams && checkedDefaultParams;
    if (!isReadyForFetch) return null;
    return filterQueryIds(meta, search, section, false);
  }
);

export const getLinkFilterQuery = createSelector(
  [getMeta, getSearch, getSection],
  (meta, search, section) => filterQueryIds(meta, search, section, true)
);

export const getNonColumnQuery = createSelector(
  [getSearch, getSection],
  (search, section) => {
    const nonColumnSectionKeys = NON_COLUMN_KEYS.map(k => `${section}-${k}`);
    const nonColumnQuery = pick(
      search,
      ['sort_col', 'sort_dir'].concat(nonColumnSectionKeys)
    );
    return removeFiltersPrefix(nonColumnQuery, section);
  }
);

export const parseFilterQuery = createSelector(
  [getFilterQuery, getNonColumnQuery],
  (filterIds, nonColumnQuery) => {
    if (!filterIds) return null;
    const filterQuery = qs.stringify({ ...filterIds, ...nonColumnQuery });
    return filterQuery;
  }
);

export const getLink = createSelector(
  [getLinkFilterQuery, getSection, getMeta],
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
              findEqual(m, ['id', currentId], filterQuery[key][0])
            )[idLabel]
            : filterQuery[key];
          parsedQuery[parsedKey] = id;
        }
      });
    }
    const stringifiedQuery = qs.stringify(parsedQuery);
    const urlParameters = stringifiedQuery ? `?${stringifiedQuery}` : '';
    const subSection =
      DATA_EXPLORER_SECTIONS[section].moduleName === 'pathways'
        ? '/models'
        : '';
    return `/${DATA_EXPLORER_SECTIONS[section]
      .moduleName}${subSection}${urlParameters}`;
  }
);

export const getCategory = createSelector(
  [getSearch, getSection, getMeta],
  (rawQuery, section, meta) => {
    if (
      !rawQuery ||
      isEmpty(rawQuery) ||
      !section ||
      !meta ||
      isEmpty(meta) ||
      !meta[section] ||
      !meta[section].categories
    ) {
      return null;
    }
    const metadata = meta[section];
    const parsedCategory = removeFiltersPrefix(rawQuery, section).categories;
    return findSelectedValueObject(metadata.categories, parsedCategory);
  }
);

function getOptions(section, filter, filtersMeta, query, category) {
  if (section !== SECTION_NAMES.pathways) return filtersMeta[filter];
  switch (filter) {
    case FILTER_NAMES.models:
      return getPathwaysModelOptions(query, filtersMeta, filter);
    case FILTER_NAMES.scenarios:
      return getPathwaysScenarioOptions(query, filtersMeta, filter);
    case FILTER_NAMES.categories:
      return getPathwaysCategoryOptions(query, filtersMeta);
    case FILTER_NAMES.subcategories:
      return getPathwaysSubcategoryOptions(query, filtersMeta, category);
    case FILTER_NAMES.indicators:
      return getPathwaysIndicatorsOptions(query, filtersMeta, filter);
    default:
      return filtersMeta[filter];
  }
}

const addGroupId = (object, groupId) =>
  object.map(r => {
    const updatedRegion = r;
    updatedRegion.groupId = groupId;
    return updatedRegion;
  });

const getLabel = (option, filterKey) => {
  const labelField = POSSIBLE_LABEL_FIELDS.find(field => option[field]);
  let label = option[labelField];
  if (filterKey === 'goals' || filterKey === 'targets') {
    label = `${option.number}: ${label}`;
  }
  return label;
};

export const getFilterOptions = createSelector(
  [
    getMeta,
    getSection,
    getCountries,
    getRegions,
    getSourceOptions,
    getFilterQuery,
    getCategory
  ],
  (meta, section, countries, regions, sourceVersions, query, category) => {
    if (!section || isEmpty(meta)) return null;
    const filterKeys = DATA_EXPLORER_FILTERS[section];
    const filtersMeta = meta[section];
    if (!filtersMeta) return null;
    if (
      section === SECTION_NAMES.historicalEmissions &&
      filterKeys.includes('regions')
    ) {
      filtersMeta.regions = addGroupId(regions, 'regions').concat(
        addGroupId(countries, 'countries')
      );
    }
    if (filterKeys.includes('countries')) filtersMeta.countries = countries;
    if (filterKeys.includes('source')) filtersMeta.source = sourceVersions;

    const filterOptions = {};
    filterKeys.forEach(f => {
      const options = getOptions(section, f, filtersMeta, query, category);
      if (options) {
        const optionsArray = options.map(option => {
          const label = getLabel(option, f);
          const value =
            option.iso_code ||
            option.iso_code3 ||
            (option.id && String(option.id)) ||
            (option.dataSourceId &&
              `${option.dataSourceId}-${option.versionId}`);
          return { ...option, value, label };
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
      MULTIPLE_LEVEL_SECTION_FIELDS[section] === undefined
    ) {
      return options;
    }
    const updatedOptions = options;
    Object.keys(options).forEach(key => {
      if (MULTIPLE_LEVEL_SECTION_FIELDS[section].find(s => s.key === key)) {
        updatedOptions[key] = parseMultipleLevelOptions(updatedOptions[key]);
      }
    });
    return updatedOptions;
  }
);

const mergeSourcesAndVersions = filters => {
  const dataSourceFilter = filters['data-sources'];
  const versionFilter = filters.gwps;
  const updatedFilters = filters;
  if (dataSourceFilter) {
    updatedFilters.source = `${dataSourceFilter}-${versionFilter}`;
    delete updatedFilters['data-sources'];
    delete updatedFilters.gwps;
  }
  return updatedFilters;
};

export const parseExternalParams = createSelector(
  [getSearch, getSection, getFilterOptions, getMeta],
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
      let metaMatchingKey = keyWithoutPrefix.replace('-', '_');
      if (metaMatchingKey !== 'undefined') {
        if (metaMatchingKey === 'subcategories') metaMatchingKey = 'categories';
        const labelObject = meta[section][metaMatchingKey].find(
          i =>
            i.id === parseInt(externalFields[k], 10) ||
            i.number === externalFields[k]
        );
        const label = POSSIBLE_VALUE_FIELDS.find(
          f => labelObject && labelObject[f]
        );
        parsedFields[k.replace(`${DATA_EXPLORER_EXTERNAL_PREFIX}-`, '')] =
          labelObject[label];
      }
    });
    return parsedFields;
  }
);

const findFilterOptions = (options, selectedFilters) =>
  options.filter(f =>
    POSSIBLE_VALUE_FIELDS.find(field => {
      const value = f[field] && String(f[field]);
      return selectedFilters.includes(value);
    })
  );

const forceAR2OnCAIT = (parsedSelectedFilters, filterOptions) => {
  const dataSourceId = parsedSelectedFilters.source.split('-')[0];
  const selectedOption = filterOptions.source.find(o =>
    o.value.startsWith(dataSourceId)
  );
  if (selectedOption.dataSourceSlug === 'CAIT') {
    const CAIT_AR2_OPTION = filterOptions.source.find(
      o => o.label === 'CAIT - AR2'
    );
    return { ...parsedSelectedFilters, source: CAIT_AR2_OPTION.value };
  }
  return parsedSelectedFilters;
};

export const getSelectedFilters = createSelector(
  [getSearch, getSection, getFilterOptions],
  (search, section, filterOptions) => {
    if (!search || !section || !filterOptions) return null;
    const selectedFields = search;
    const nonExternalKeys = Object.keys(selectedFields).filter(
      k => !k.startsWith(DATA_EXPLORER_EXTERNAL_PREFIX)
    );
    const selectedKeys = nonExternalKeys.filter(k => k.startsWith(section));
    const sectionRelatedFields = pick(selectedFields, selectedKeys);
    let parsedSelectedFilters = mergeSourcesAndVersions(
      removeFiltersPrefix(sectionRelatedFields, section)
    );

    if (parsedSelectedFilters.source) {
      parsedSelectedFilters = forceAR2OnCAIT(
        parsedSelectedFilters,
        filterOptions
      );
    } // Remove when GHG emissions has the correct version options

    const selectedFilterObjects = {};
    Object.keys(parsedSelectedFilters).forEach(filterKey => {
      const filterId = parsedSelectedFilters[filterKey];
      const isNonColumnKey = NON_COLUMN_KEYS.includes(filterKey);

      if (isNonColumnKey) {
        selectedFilterObjects[filterKey] = filterId;
      } else {
        const multipleParsedSelectedFilters = filterId.split(',');
        selectedFilterObjects[filterKey] = findFilterOptions(
          filterOptions[filterKey],
          multipleParsedSelectedFilters
        );
      }
    });
    return selectedFilterObjects;
  }
);

export const getDependentOptions = createSelector(
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
            const { parent: parentLabel } = f;
            const parentIdLabel = f.parentId || f.id;
            let { idObject: idObjectLabel } = f;

            if (
              section === SECTION_NAMES.pathways &&
              parentLabel === FILTER_NAMES.categories &&
              selectedFilters.categories &&
              selectedFilters.categories[0] &&
              selectedFilters.categories[0].parent_id
            ) {
              idObjectLabel = 'subcategory';
            }

            const selectedId =
              selectedFilters[parentLabel] &&
              selectedFilters[parentLabel][0] &&
              selectedFilters[parentLabel][0][parentIdLabel];

            if (!selectedId) return true;

            const { id: idLabelToFilterBy } = f;
            let id = idObjectLabel
              ? i[idObjectLabel][idLabelToFilterBy]
              : i[idLabelToFilterBy];

            if (isArray(id)) return id.includes(selectedId);
            id = parseInt(id, 10);

            return isArray(selectedId)
              ? selectedId.includes(id)
              : id === parseInt(selectedId, 10);
          });
        });
      }
    });
    return updatedOptions;
  }
);

export const parseEmissionsInData = createSelector([getData], data => {
  if (!data || !data.length > 0) return null;
  const updatedData = data;
  if (!updatedData[0].emissions) return updatedData;
  return updatedData.map(d => {
    const yearEmissions = {};
    if (d.emissions) {
      d.emissions.forEach(e => {
        yearEmissions[e.year] = e.value;
      });
    }
    return { ...d, ...yearEmissions };
  });
});

export const addYearOptions = createSelector(
  [getDependentOptions, getSection, getSelectedFilters, getAvailableYears],
  (options, section, selectedFilters, yearColumns) => {
    const sectionsWithYearsFilter = [
      SECTION_NAMES.historicalEmissions,
      SECTION_NAMES.pathways
    ];
    if (
      !section ||
      !sectionsWithYearsFilter.includes(section) ||
      !options ||
      !yearColumns
    ) {
      return options;
    }
    const yearOptions = years =>
      years.map(y => ({ label: String(y), value: String(y) }));
    const updatedOptions = { ...options };
    const startYearValues =
      selectedFilters && selectedFilters.end_year
        ? yearColumns.filter(y => y <= selectedFilters.end_year)
        : yearColumns;
    const endYearValues =
      selectedFilters && selectedFilters.start_year
        ? yearColumns.filter(y => y >= selectedFilters.start_year)
        : yearColumns;
    updatedOptions.start_year = yearOptions(startYearValues);
    updatedOptions.end_year = yearOptions(endYearValues);
    return updatedOptions;
  }
);

export const getMethodology = createSelector(
  [getMeta, getSection, getSelectedFilters],
  (meta, section, selectedFilters) => {
    const sectionHasSources = section === SECTION_NAMES.historicalEmissions;
    const emissionPathwaysSection = section === SECTION_NAMES.pathways;
    if (
      !meta ||
      isEmpty(meta) ||
      !section ||
      (sectionHasSources &&
        (isEmpty(selectedFilters) ||
          !selectedFilters.source ||
          !selectedFilters.source.length > 0)) ||
      (emissionPathwaysSection &&
        (isEmpty(selectedFilters) ||
          (!selectedFilters.indicators &&
            !selectedFilters.models &&
            !selectedFilters.scenarios)))
    ) {
      return null;
    }

    if (emissionPathwaysSection) {
      const { models, scenarios, indicators } = selectedFilters;
      return [models, scenarios, indicators].filter(m => m);
    }

    const methodology = meta.methodology;
    let metaSource = DATA_EXPLORER_METHODOLOGY_SOURCE[section];
    if (sectionHasSources) {
      const source = selectedFilters.source[0].dataSourceSlug;
      metaSource = DATA_EXPLORER_METHODOLOGY_SOURCE[section][source];
    }
    return methodology.filter(s => metaSource.includes(s.source));
  }
);

export const getActiveFilterLabel = createSelector(
  [getSelectedFilters],
  selectedFields => {
    const regions = selectedFields && selectedFields.regions;
    if (!regions || regions.length > 1) return null;
    return regions[0] && regions[0].label;
  }
);

export const getSelectedOptions = createSelector(
  [getSelectedFilters],
  selectedFields => {
    if (!selectedFields) return null;
    const selectedOptions = {};
    Object.keys(selectedFields).forEach(key => {
      if (NON_COLUMN_KEYS.includes(key)) {
        selectedOptions[key] = {
          value: selectedFields[key],
          label: selectedFields[key]
        };
      } else {
        selectedOptions[key] = selectedFields[key].map(f => ({
          value: f.value || f.slug,
          label: f.label,
          id: f.iso_code3 || f.id || `${f.data_source_id}-${f.version_id}`
        }));
      }
    });

    return selectedOptions;
  }
);

export const parseData = createSelector([parseEmissionsInData], data => {
  if (!data || !data.length > 0) return null;
  const updatedData = data;
  const whiteList = remove(
    Object.keys(updatedData[0]),
    n => DATA_EXPLORER_BLACKLIST.indexOf(n) === -1
  );
  return updatedData.map(d => pick(d, whiteList));
});

export const getTitleLinks = createSelector(
  [parseData, getSection, getCountries],
  (data, section, countries) => {
    if (!data || !data.length || section !== 'ndc-sdg-linkages') return null;
    return data.map(d => {
      const country = countries.find(c => c.wri_standard_name === d.country);
      return [
        {
          columnName: 'indc_text',
          url: `/ndcs/country/${country &&
            country.iso_code3}/full?query=${d.target_number}&searchBy=target&document=${d.document_type}-${d.language}`
        }
      ];
    });
  }
);
export const getFirstTableHeaders = createSelector(
  [parseData, getSection],
  (data, section) => {
    if (!data || !data.length || !section) return null;
    const yearColumnKeys = Object.keys(data[0])
      .filter(k => isANumber(k))
      .reverse();
    return FIRST_TABLE_HEADERS[section].concat(yearColumnKeys);
  }
);
