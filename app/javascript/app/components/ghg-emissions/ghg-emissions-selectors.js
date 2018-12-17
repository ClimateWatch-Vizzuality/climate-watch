import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import uniqBy from 'lodash/uniqBy';
import union from 'lodash/union';
import isEqual from 'lodash/isEqual';
import { getGhgEmissionDefaults, toPlural } from 'utils/ghg-emissions';
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
  ALL_SELECTED,
  ALL_SELECTED_OPTION
} from 'data/constants';
import { TOP_EMITTERS_OPTION } from 'data/data-explorer-constants';

const BREAK_BY_OPTIONS = [
  {
    label: 'Regions',
    value: 'regions'
  },
  {
    label: 'Sector',
    value: 'sector'
  },
  {
    label: 'Gas',
    value: 'gas'
  }
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

// BreakBy selectors
const getBreakByOptions = () => BREAK_BY_OPTIONS;

const getAllowedSectors = createSelector([getSourceSelected], source => {
  if (!source) return null;
  const sourceLabel = source.label.split('-')[0];
  const versionLabel = source.label.split('-')[1];
  const allowedSectors = ALLOWED_SECTORS_BY_SOURCE[sourceLabel];
  if (sourceLabel === 'UNFCCC') {
    return allowedSectors[versionLabel];
  }
  const extraGlobalSectors =
    EXTRA_ALLOWED_SECTORS_BY_SOURCE_ONLY_GLOBAL[sourceLabel];
  return extraGlobalSectors
    ? allowedSectors.concat(extraGlobalSectors)
    : allowedSectors;
});

const getBreakByOptionSelected = createSelector(
  [getBreakByOptions, getSelection('breakBy')],
  (breaks, selected) => {
    if (!breaks) return null;
    if (!selected) {
      const defaultBreak = breaks.find(b => b.value === 'location');
      return defaultBreak || breaks[0];
    }
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

const getRegionsOptions = createSelector(
  [getRegions, getMeta],
  (regions, meta) => {
    if (!regions || !meta) return null;
    const mappedRegions = [TOP_EMITTERS_OPTION];
    regions.forEach(region => {
      const regionMembers = region.members.map(m => m.iso_code3);
      const regionMeta = (meta.location || [])
        .filter(d => regionMembers.indexOf(d.iso_code3) > -1);
      const regionIsos = regionMeta.map(m => m.iso_code3);
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
      return union(regions.concat(countries), 'iso');
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
    defaults.location = TOP_EMITTERS;
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
    defaultOptions.location.push(TOP_EMITTERS_OPTION);
    return defaultOptions;
  }
);

const getSectorOptions = createSelector(
  [getFieldOptions('sector'), getAllowedSectors, getMeta],
  (options, allowedOptions, meta) => {
    if (!options || isEmpty(options)) return null;
    const { sector: metaSectors } = meta;
    const allowedSectorLabels = [];
    options.forEach(o => {
      if (allowedOptions.includes(o.label)) {
        allowedSectorLabels.push(o.label);
      }
    });

    const sectors = metaSectors.filter(s => !s.parentId).map(d => ({
      label: d.label,
      value: d.value,
      groupParent: String(d.value)
    }));

    const subsectors = metaSectors.filter(s => s.parentId).map(d => ({
      label: d.label,
      value: d.value,
      group: String(d.parentId)
    }));
    return [...sectors, ...subsectors];
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

const getFiltersSelected = field =>
  createSelector(
    [getOptions, getSelection(field), getDefaultOptions],
    (options, selected, defaults) => {
      const fieldOptions =
        options &&
        (field === 'location' ? options.regions : options[toPlural(field)]);
      if (!defaults) return null;
      if (!selected || !fieldOptions || isEmpty(fieldOptions)) {
        return defaults[field];
      }
      let selectedFilters = [];
      if (selected) {
        if (selected === ALL_SELECTED) selectedFilters = [ALL_SELECTED_OPTION];
        else {
          const selectedValues = selected.split(',');
          selectedFilters = fieldOptions.filter(
            filter =>
              selectedValues.indexOf(String(filter.value)) !== -1 ||
              selectedValues.indexOf(filter.iso_code3) !== -1
          );
        }
      }
      return selectedFilters;
    }
  );

const CHART_TYPE_OPTIONS = [
  { label: 'line', value: 'line' },
  { label: 'area', value: 'area' },
  { label: 'percentage', value: 'percentage' }
];

export const getChartTypeSelected = createSelector(
  [() => CHART_TYPE_OPTIONS, getSelection('chartType')],
  (options, selected) => {
    if (!selected) return options[0];
    return options.find(type => type.value === selected);
  }
);

const getOptionsSelected = createStructuredSelector({
  sourcesSelected: getSourceSelected,
  chartTypeSelected: getChartTypeSelected,
  breakBySelected: getBreakByOptionSelected,
  regionsSelected: getFiltersSelected('location'),
  sectorsSelected: getFiltersSelected('sector'),
  gasesSelected: getFiltersSelected('gas')
});

export const getLinkToDataExplorer = createSelector([getSearch], search => {
  const section = 'historical-emissions';
  return generateLinkToDataExplorer(search, section);
});

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
    if (dataSelected && isEqual(dataSelected[0], ALL_SELECTED_OPTION)) {
      return options[model];
    }
    return isArray(dataSelected) ? dataSelected : [dataSelected];
  }
);

const getYColumnOptions = createSelector(
  [getLegendDataSelected],
  legendDataSelected => {
    if (!legendDataSelected) return null;
    const getYOption = columns =>
      columns &&
      columns.filter(c => !isEqual(c, TOP_EMITTERS_OPTION)).map(d => ({
        label: d && d.label,
        value: d && getYColumnValue(d.label)
      }));
    return uniqBy(getYOption(legendDataSelected), 'value');
  }
);

// Map the data from the API

const getDFilterValue = (d, modelSelected) =>
  (modelSelected === 'regions' ? d.location : d[modelSelected]);

export const getChartData = createSelector(
  [sortData, getModelSelected, getYColumnOptions],
  (data, model, yColumnOptions) => {
    if (!data || !data.length || !model) return null;
    const yearValues = data[0].emissions.map(d => d.year);
    const dataParsed = yearValues.map(x => {
      const yItems = {};
      data.forEach(d => {
        const columnObject = yColumnOptions.find(
          c => c.label === getDFilterValue(d, model)
        );
        const yKey = columnObject && columnObject.value;
        const yData = d.emissions.find(e => e.year === x);
        const value =
          yData.value || yData.value === 0 ? yData.value * DATA_SCALE : null;
        const currentValue = yItems[yKey];
        if (value && (currentValue || currentValue === 0)) {
          yItems[yKey] = value + yItems[yKey];
        } else {
          yItems[yKey] = value || currentValue;
        }
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
  return {
    x: setXAxisDomain(),
    y: setYAxisDomain()
  };
});

// variable that caches chart elements assigned color
// to avoid element color changing when the chart is updated
let colorThemeCache = {};

export const getChartConfig = createSelector(
  [getModelSelected, getYColumnOptions],
  (model, yColumns) => {
    if (!model || !yColumns) return null;

    const chartColors = setChartColors(
      yColumns.length,
      CHART_COLORS,
      CHART_COLORS_EXTENDED
    );
    const theme = getThemeConfig(yColumns, chartColors);
    colorThemeCache = {
      ...theme,
      ...colorThemeCache
    };
    const tooltip = getTooltipConfig(yColumns);
    return {
      axes: DEFAULT_AXES_CONFIG,
      theme: colorThemeCache,
      tooltip,
      animation: false,
      columns: {
        x: [
          {
            label: 'year',
            value: 'x'
          }
        ],
        y: yColumns
      }
    };
  }
);

const getLoading = createSelector(
  [getChartConfig, state => state.ghgEmissionsMeta, state => state.emissions],
  (chartConfig, meta, data) =>
    (meta && meta.loading) || (data && data.loading) || !chartConfig || false
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
        : selected
          .filter(s => !isEqual(s, TOP_EMITTERS_OPTION))
          .map(s => s.value)
          .join());
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
  selected: getOptionsSelected,
  fieldToBreakBy: getModelSelected
});
