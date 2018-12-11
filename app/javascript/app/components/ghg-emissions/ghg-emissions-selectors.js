import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import uniqBy from 'lodash/uniqBy';
import union from 'lodash/union';
import isEqual from 'lodash/isEqual';
import { getGhgEmissionDefaults } from 'utils/ghg-emissions';
import { generateLinkToDataExplorer } from 'utils/data-explorer';
import {
  getYColumnValue,
  getThemeConfig,
  getTooltipConfig,
  sortEmissionsByValue,
  sortLabelByAlpha,
  setChartColors,
  setXAxisDomain,
  setYAxisDomain
} from 'utils/graphs';
import {
  TOP_EMITTERS,
  CHART_COLORS,
  CHART_COLORS_EXTENDED,
  DEFAULT_AXES_CONFIG,
  ALLOWED_SECTORS_BY_SOURCE,
  EXTRA_ALLOWED_SECTORS_BY_SOURCE_ONLY_GLOBAL,
  DATA_SCALE,
  METRIC_OPTIONS,
  ALL_SELECTED,
  ALL_SELECTED_OPTION
} from 'data/constants';

const toPlural = model => {
  const plurals = {
    sector: 'sectors',
    gas: 'gases'
  };
  return plurals[model] || model;
};

const BREAK_BY_OPTIONS = [
  {
    label: 'Regions - Absolute',
    value: `regions-${METRIC_OPTIONS.ABSOLUTE_VALUE.value}`
  },
  {
    label: 'Regions - Per GDP',
    value: `regions-${METRIC_OPTIONS.PER_GDP.value}`
  },
  {
    label: 'Regions - Per Capita',
    value: `regions-${METRIC_OPTIONS.PER_CAPITA.value}`
  },
  {
    label: 'Sector - Absolute',
    value: `sector-${METRIC_OPTIONS.ABSOLUTE_VALUE.value}`
  },
  {
    label: 'Sector - Per GDP',
    value: `sector-${METRIC_OPTIONS.PER_CAPITA.value}`
  },
  {
    label: 'Sector - Per Capita',
    value: `sector-${METRIC_OPTIONS.PER_GDP.value}`
  },
  {
    label: 'Gas - Absolute',
    value: `gas-${METRIC_OPTIONS.ABSOLUTE_VALUE.value}`
  },
  { label: 'Gas - Per GDP', value: `gas-${METRIC_OPTIONS.PER_GDP.value}` },
  { label: 'Gas - Per Capita', value: `gas-${METRIC_OPTIONS.PER_CAPITA.value}` }
];

const groups = [
  {
    groupId: 'regions',
    title: 'Regions'
  },
  {
    groupId: 'countries',
    title: 'Countries'
  }
];

// meta data for selectors
const getData = ({ emissions }) => (emissions && emissions.data) || [];
const getMeta = ({ ghgEmissionsMeta }) =>
  (ghgEmissionsMeta && ghgEmissionsMeta.meta) || null;
const getRegions = ({ regions }) => (regions && regions.data) || null;
const getSources = createSelector(
  getMeta,
  meta => (meta && meta.data_source) || null
);
const getVersions = createSelector(getMeta, meta => (meta && meta.gwp) || null);

// values from search
const getSearch = (state, { search }) => search || null;
const getSelection = field =>
  createSelector(getSearch, search => {
    if (!search) return null;
    if (field === 'location') return search.regions || null;
    return search[field] || search[toPlural(field)] || null;
  });

// Sources selectors
const getSourceOptions = createSelector(
  [getSources, getVersions, getData],
  (sources, versions, data) => {
    if (!sources || !versions || !data) return null;
    const sourceOptionsTemplate = [
      { source: 'CAIT', version: 'AR2' },
      { source: 'CAIT', version: 'AR4' },
      { source: 'PIK', version: 'AR2' },
      { source: 'PIK', version: 'AR4' },
      { source: 'UNFCCC', version: 'AR2' },
      { source: 'UNFCCC', version: 'AR4' }
    ];

    return sourceOptionsTemplate.map(template => {
      const sourceValue = sources.find(
        sourceMeta => template.source === sourceMeta.label
      ).value;
      const versionValue = versions.find(
        versionMeta => template.version === versionMeta.label
      ).value;
      return {
        label: `${template.source}-${template.version}`,
        value: `${sourceValue}-${versionValue}`
      };
    });
  }
);

const getSourceSelected = createSelector(
  [getSourceOptions, getSelection('source')],
  (sources, selected) => {
    if (!sources) return null;
    if (!selected) return sources[0];
    return sources.find(source => source.value === selected);
  }
);

const getVersionSelected = () =>
  createSelector([getSourceOptions, getSourceSelected], (options, selected) => {
    if (!selected) return options[0].label.split('-')[1];
    return selected.label.split('-')[1];
  });

// BreakBy selectors
const getBreakByOptions = () => BREAK_BY_OPTIONS;

const getAllowedSectors = createSelector(
  [getSourceSelected, getVersionSelected],
  (source, version) => {
    if (!source || !version) return null;
    const sourceLabel = source.label.split('-')[0];
    const allowedSectors = ALLOWED_SECTORS_BY_SOURCE[sourceLabel];
    if (sourceLabel === 'UNFCCC') {
      return allowedSectors[version.label];
    }
    const extraGlobalSectors =
      EXTRA_ALLOWED_SECTORS_BY_SOURCE_ONLY_GLOBAL[sourceLabel];
    return extraGlobalSectors
      ? allowedSectors.concat(extraGlobalSectors)
      : allowedSectors;
  }
);

const getBreakByOptionSelected = createSelector(
  [getBreakByOptions, getSelection('breakBy')],
  (breaks, selected) => {
    if (!breaks) return null;
    if (!selected) return breaks[0];
    return breaks.find(category => category.value === selected);
  }
);

const getBreakBySelected = createSelector(
  getBreakByOptionSelected,
  breakBySelected => {
    if (!breakBySelected) return null;
    const breakByArray = breakBySelected.value.split('-');
    return { modelSelected: breakByArray[0], metricSelected: breakByArray[1] };
  }
);

export const getModelSelected = createSelector(
  getBreakBySelected,
  breakBySelected => (breakBySelected && breakBySelected.modelSelected) || null
);
export const getMetricSelected = createSelector(
  getBreakBySelected,
  breakBySelected => (breakBySelected && breakBySelected.metricSelected) || null
);

const sortData = createSelector(getData, data => {
  if (!data || isEmpty(data)) return null;
  return sortEmissionsByValue(data);
});

// use filtered data to get top emitters for each region
export const getRegionsOptions = createSelector(
  [getRegions, sortData],
  (regions, data) => {
    if (!regions || !data) return null;
    const mappedRegions = [
      {
        label: 'Top Emitters',
        value: 'TOP',
        members: TOP_EMITTERS,
        iso: 'TOP',
        groupId: 'regions'
      }
    ];
    regions.forEach(region => {
      const regionMembers = region.members.map(m => m.iso_code3);
      const regionData = data.filter(
        d => regionMembers.indexOf(d.iso_code3) > -1
      );
      const regionIsos = regionData.map(m => m.iso_code3).slice(0, 10);
      if (region.iso_code3 !== 'WORLD') {
        mappedRegions.push({
          label: region.wri_standard_name,
          value: region.iso_code3,
          iso: region.iso_code3,
          members: regionIsos,
          groupId: 'regions'
        });
      }
    });
    return mappedRegions;
  }
);

export const getFieldOptions = field =>
  createSelector([getMeta, getRegionsOptions], (meta, regions) => {
    if (isEmpty(meta)) return [];
    const fieldOptions = meta[field];
    if (field === 'location') {
      if (!regions) return [];
      const countries = fieldOptions.map(d => ({
        ...d,
        value: d.iso,
        groupId: 'countries'
      }));
      return sortLabelByAlpha(union(regions.concat(countries), 'iso'));
    }
    return sortLabelByAlpha(fieldOptions);
  });

const getDefaultOptions = createSelector(
  [getSourceSelected, getMeta],
  (sourceSelected, meta) => {
    if (!sourceSelected || !meta) return null;
    const defaults = getGhgEmissionDefaults(
      sourceSelected.label.split('-')[0],
      meta
    );
    const defaultOptions = {};
    Object.keys(defaults).forEach(key => {
      const keyDefault = String(defaults[key]).split(',');
      defaultOptions[key] = meta[key].filter(
        m =>
          keyDefault.includes(m.iso) ||
          keyDefault.includes(m.label) ||
          keyDefault.includes(String(m.value))
      );
      // Correction for Regions value
      if (defaultOptions[key][0].iso) {
        defaultOptions[key] = defaultOptions[key].map(o => ({
          ...o,
          value: o.iso
        }));
      }
    });
    return defaultOptions;
  }
);

const getFiltersSelected = field =>
  createSelector(
    [getFieldOptions(field), getSelection(field), getDefaultOptions],
    (options, selected, defaults) => {
      if (!defaults) return null;
      if (!selected || isEmpty(options)) return defaults[field];
      let selectedFilters = [];
      if (selected) {
        if (selected === ALL_SELECTED) selectedFilters = [ALL_SELECTED_OPTION];
        else {
          const selectedValues = selected.split(',');
          selectedFilters = options.filter(
            filter => selectedValues.indexOf(`${filter.value}`) > -1
          );
        }
      } else {
        if (field !== 'location') return options;
        const selectedValues = TOP_EMITTERS;
        selectedFilters = options.filter(
          filter => selectedValues.indexOf(filter.value) > -1
        );
      }
      return selectedFilters;
    }
  );

const CHART_TYPE_OPTIONS = [
  { label: 'line', value: 'line' },
  { label: 'area', value: 'area' }
];

export const getChartTypeSelected = createSelector(
  [() => CHART_TYPE_OPTIONS, getSelection('chartType')],
  (options, selected) => {
    if (!selected) return options[0];
    return options.find(type => type.value === selected);
  }
);

const getSectorOptions = createSelector(
  [getFieldOptions('sector'), getAllowedSectors],
  (options, allowedOptions) => {
    if (!options || isEmpty(options)) return null;
    return options.filter(o => allowedOptions.includes(o.label));
  }
);

const getOptions = createStructuredSelector({
  sources: getSourceOptions,
  chartType: () => CHART_TYPE_OPTIONS,
  breakBy: getBreakByOptions,
  regions: getFieldOptions('location'),
  sectors: getSectorOptions,
  gases: getFieldOptions('gas')
});

const getOptionsSelected = createStructuredSelector({
  sourcesSelected: getSourceSelected,
  chartTypeSelected: getChartTypeSelected,
  breakBySelected: getBreakByOptionSelected,
  regionsSelected: getFiltersSelected('location'),
  sectorsSelected: getFiltersSelected('sector'),
  gasesSelected: getFiltersSelected('gas')
});

// Map the data from the API
const filterData = createSelector(
  [sortData, getOptionsSelected],
  (data, filters) => {
    if (!data || !data.length || !filters) return null;
    return data;
    // Already filtered by source- version, gas, region, sector
    // Missing metric?
  }
);

export const getChartData = createSelector(
  [filterData, getModelSelected, getOptionsSelected],
  (data, model, filters) => {
    if (!data || !data.length || !model || !filters) return null;
    const xValues = data[0].emissions.map(d => d.year);
    const dataParsed = xValues.map(x => {
      const yItems = {};
      data.forEach(d => {
        const yKey = getYColumnValue(d[model]);
        const yData = d.emissions.find(e => e.year === x);
        yItems[yKey] = yData.value ? yData.value * DATA_SCALE : null;
      });
      const item = {
        x,
        ...yItems
      };
      return item;
    });
    return dataParsed;
  }
);

export const getChartDomain = createSelector([getChartData], data => {
  if (!data) return null;
  return { x: setXAxisDomain(), y: setYAxisDomain() };
});

// variable that caches chart elements assigned color
// to avoid element color changing when the chart is updated
let colorThemeCache = {};

export const getChartConfig = createSelector(
  [filterData, getModelSelected],
  (data, model) => {
    if (!data || !model) return null;
    const yColumns = data.map(d => ({
      label: d[model],
      value: getYColumnValue(d[model])
    }));
    const yColumnsChecked = uniqBy(yColumns, 'value');
    const chartColors = setChartColors(
      yColumnsChecked.length,
      CHART_COLORS,
      CHART_COLORS_EXTENDED
    );
    const theme = getThemeConfig(yColumnsChecked, chartColors);
    colorThemeCache = { ...theme, ...colorThemeCache };
    const tooltip = getTooltipConfig(yColumnsChecked);
    return {
      axes: DEFAULT_AXES_CONFIG,
      theme: colorThemeCache,
      tooltip,
      animation: false,
      columns: {
        x: [{ label: 'year', value: 'x' }],
        y: yColumnsChecked
      }
    };
  }
);

export const getLinkToDataExplorer = createSelector([getSearch], search => {
  const section = 'historical-emissions';
  return generateLinkToDataExplorer(search, section);
});

const getLoading = createSelector(
  [getChartConfig, state => state.ghgEmissionsMeta, state => state.emissions],
  (chartConfig, meta, data) =>
    (meta && meta.loading) || (data && data.loading) || !chartConfig || false
);

const getLegendDataOptions = createSelector(
  [getModelSelected, getOptions],
  (modelSelected, options) => {
    if (!options || !modelSelected || !options[toPlural(modelSelected)]) {
      return null;
    }
    return options[toPlural(modelSelected)];
  }
);

const getLegendDataSelected = createSelector(
  [getModelSelected, getOptions, getOptionsSelected],
  (modelSelected, options, selectedOptions) => {
    const model = toPlural(modelSelected);
    const selectedModel = `${model}Selected`;
    if (
      !selectedOptions ||
      !modelSelected ||
      !selectedOptions[selectedModel] ||
      !options
    ) {
      return null;
    }

    const dataSelected = selectedOptions[selectedModel];
    if (!isArray(dataSelected)) {
      if (dataSelected.value === ALL_SELECTED) return options[model];
    }
    return isArray(dataSelected) ? dataSelected : [dataSelected];
  }
);

const getProviderFilters = createSelector(
  [getOptionsSelected],
  selectedOptions => {
    if (!selectedOptions || !selectedOptions.sourcesSelected) return null;
    const {
      sourcesSelected,
      sectorsSelected,
      gasesSelected,
      regionsSelected
    } = selectedOptions;
    const parseValues = selected =>
      (isEqual(selected, [ALL_SELECTED_OPTION])
        ? null
        : selected.map(s => s.value).join());
    return {
      source: sourcesSelected.value.split('-')[0],
      gwp: sourcesSelected.value.split('-')[1],
      gas: parseValues(gasesSelected),
      sector: parseValues(sectorsSelected),
      location: parseValues(regionsSelected)
    };
  }
);

export const getGHGEmissions = createStructuredSelector({
  data: getChartData,
  domain: getChartDomain,
  config: getChartConfig,
  providerFilters: getProviderFilters,
  downloadLink: getLinkToDataExplorer,
  loading: getLoading,
  groups: () => groups,
  search: getSearch,
  options: getOptions,
  legendOptions: getLegendDataOptions,
  legendSelected: getLegendDataSelected,
  selected: getOptionsSelected
});
