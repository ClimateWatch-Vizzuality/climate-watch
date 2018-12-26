import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import groupBy from 'lodash/groupBy';
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
  CHART_COLORS,
  CHART_COLORS_EXTENDED,
  DEFAULT_AXES_CONFIG,
  ALLOWED_SECTORS_BY_SOURCE,
  EXTRA_ALLOWED_SECTORS_BY_SOURCE_ONLY_GLOBAL,
  DATA_SCALE,
  ALL_SELECTED,
  ALL_SELECTED_OPTION,
  TOP_EMITTERS_OPTION,
  METRIC_OPTIONS
} from 'data/constants';

const BREAK_BY_OPTIONS = [
  {
    label: `Regions-${METRIC_OPTIONS.ABSOLUTE_VALUE.label}`,
    value: `regions-${METRIC_OPTIONS.ABSOLUTE_VALUE.value}`
  },
  {
    label: `Regions-${METRIC_OPTIONS.PER_CAPITA.label}`,
    value: `regions-${METRIC_OPTIONS.PER_CAPITA.value}`
  },
  {
    label: `Regions-${METRIC_OPTIONS.PER_GDP.label}`,
    value: `regions-${METRIC_OPTIONS.PER_GDP.value}`
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
const getWBData = ({ wbCountryData }) => wbCountryData.data || null;

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

const getRegionsOptions = createSelector([getRegions], regions => {
  if (!regions) return null;
  const mappedRegions = [TOP_EMITTERS_OPTION];
  regions.forEach(region => {
    const regionMembers = region.members.map(m => m.iso_code3);
    if (region.iso_code3 !== 'WORLD') {
      mappedRegions.push({
        label: region.wri_standard_name,
        value: region.iso_code3,
        iso: region.iso_code3,
        members: regionMembers,
        groupId: 'regions'
      });
    }
  });
  return mappedRegions;
});

const filterOptionsBySource = field =>
  createSelector([getMeta, getSourceSelected], (meta, sourceSelected) => {
    if (isEmpty(meta)) return null;
    const fieldOptions = meta[field];
    const sourceValue = sourceSelected.value.split('-')[0];
    const sourceMeta = meta.data_source.find(
      s => String(s.value) === sourceValue
    );
    const allowedIds = sourceMeta[field];
    return fieldOptions.filter(o => allowedIds.includes(o.value));
  });

const getFieldOptions = field =>
  createSelector(
    [getMeta, getRegionsOptions, filterOptionsBySource(field)],
    (meta, regions, filteredOptions) => {
      if (!filteredOptions) return [];
      const fieldOptions = filteredOptions;

      if (field === 'location') {
        if (!regions) return [];
        const countries = [];
        const regionIsos = regions.map(r => r.iso);
        fieldOptions.forEach(d => {
          if (!regionIsos.includes(d.iso)) {
            countries.push({
              ...d,
              value: d.iso,
              groupId: 'countries'
            });
          }
        });
        const sortedRegions = sortLabelByAlpha(regions).sort(
          x => (x.value === 'TOP' ? -1 : 0)
        );
        return sortedRegions.concat(sortLabelByAlpha(countries));
      }

      return sortLabelByAlpha(fieldOptions);
    }
  );

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
    });
    defaultOptions.location = [TOP_EMITTERS_OPTION];
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

const countriesSelectedFromRegions = regionsSelected => {
  let regionCountriesSelected = [];
  regionsSelected.forEach(r => {
    if (r.members) {
      regionCountriesSelected = regionCountriesSelected.concat(r.members);
    } else regionCountriesSelected.push(r.iso);
  });
  return regionCountriesSelected;
};

const getDisableAccumulatedCharts = createSelector(
  [getFieldOptions('location'), getSelection('location')],
  (locationOptions, locationSelected) => {
    if (!locationOptions.length || !locationSelected) return false;
    const selectedLocations = locationSelected.split(',');
    const locationOptionsSelected = locationOptions.filter(location =>
      selectedLocations.includes(location.iso)
    );
    const countriesSelected = countriesSelectedFromRegions(
      locationOptionsSelected
    );
    return !isEqual(countriesSelected, uniq(countriesSelected));
  }
);

const CHART_TYPE_OPTIONS = [
  { label: 'line', value: 'line' },
  { label: 'area', value: 'area' },
  { label: 'percentage', value: 'percentage' }
];

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

const getLegendDataOptions = createSelector(
  [getModelSelected, getOptions],
  (modelSelected, options) => {
    if (!options || !modelSelected || !options[toPlural(modelSelected)]) {
      return null;
    }
    return options[toPlural(modelSelected)];
  }
);

const getChartTypeSelected = createSelector(
  [
    () => CHART_TYPE_OPTIONS,
    getSelection('chartType'),
    getDisableAccumulatedCharts
  ],
  (options, selected, disableAccumulatedCharts) => {
    if (!selected || disableAccumulatedCharts) return options[0];
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

export const onlyOneRegionSelected = createSelector(
  [getModelSelected, getOptionsSelected],
  (modelSelected, selectedOptions) => {
    const model = modelSelected && toPlural(modelSelected);
    if (
      !selectedOptions ||
      !model ||
      model !== 'regions' ||
      !selectedOptions.regionsSelected
    ) {
      return false;
    }
    const dataSelected = selectedOptions.regionsSelected;
    return dataSelected.length === 1 && dataSelected[0].groupId === 'regions';
  }
);

const getExpandedLegendRegionsSelected = createSelector(
  [
    getModelSelected,
    getOptions,
    getOptionsSelected,
    onlyOneRegionSelected,
    sortData
  ],
  (
    modelSelected,
    options,
    selectedOptions,
    shouldExpandIntoCountries,
    data
  ) => {
    const model = toPlural(modelSelected);
    if (
      !shouldExpandIntoCountries ||
      !selectedOptions ||
      !model ||
      model !== 'regions' ||
      !selectedOptions.regionsSelected ||
      !data
    ) {
      return null;
    }
    const dataSelected = selectedOptions.regionsSelected;
    if (!shouldExpandIntoCountries) return null;
    const countryOptions = dataSelected[0].members.map(iso =>
      options[model].find(o => o.iso === iso)
    );
    const groupedCountries = data && groupBy(data, 'iso_code3');
    const getLastValue = x => x.emissions[x.emissions.length - 1].value;

    const latestValuesHash = {};
    Object.keys(groupedCountries).forEach(c => {
      latestValuesHash[c] = groupedCountries[c].reduce(
        (acc, v) => acc + getLastValue(v),
        0
      );
    });
    const compare = (a, b) =>
      (latestValuesHash[a.iso] > latestValuesHash[b.iso] ? -1 : 1);
    const sortedCountries = countryOptions.sort(compare);
    const LEGEND_LIMIT = 10;
    if (data && sortedCountries.length > LEGEND_LIMIT) {
      const othersGroup = data && sortedCountries.slice(LEGEND_LIMIT, -1);
      const othersOption = {
        iso: 'OTHERS',
        label: 'Others',
        value: othersGroup.map(o => o.iso).join(),
        members: othersGroup.map(o => o.iso),
        groupId: 'regions',
        hideData: true
      };
      const updatedOthers = othersGroup.map(o => ({
        ...o,
        hideLegend: true,
        legendColumn: 'Others'
      }));
      return (
        data && [
          ...sortedCountries.slice(0, LEGEND_LIMIT),
          othersOption,
          ...updatedOthers
        ]
      );
    }
    return sortedCountries;
  }
);

const getLegendDataSelected = createSelector(
  [
    getModelSelected,
    getOptions,
    getOptionsSelected,
    getExpandedLegendRegionsSelected
  ],
  (modelSelected, options, selectedOptions, expandedLegendRegionsSelected) => {
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
    if (expandedLegendRegionsSelected) {
      return expandedLegendRegionsSelected.filter(c => !c.hideLegend);
    }
    return isArray(dataSelected) ? dataSelected : [dataSelected];
  }
);

const getYColumnOptions = createSelector(
  [getLegendDataSelected, getExpandedLegendRegionsSelected],
  (legendDataSelected, expandedLegendRegionsSelected) => {
    if (!legendDataSelected) return null;
    const dataSelected = expandedLegendRegionsSelected || legendDataSelected;
    const getYOption = columns =>
      columns &&
      columns.map(d => ({
        ...d,
        value: d && getYColumnValue(d.label)
      }));
    return uniqBy(getYOption(dataSelected), 'value');
  }
);

// Map the data from the API

const getDFilterValue = (d, modelSelected) =>
  (modelSelected === 'regions' ? d.location : d[modelSelected]);

const getCalculationData = createSelector([getWBData], data => {
  if (!data || isEmpty(data)) return null;
  const yearData = {};
  Object.keys(data).forEach(iso => {
    data[iso].forEach(d => {
      if (!yearData[d.year]) yearData[d.year] = {};
      yearData[d.year][iso] = { population: d.population, gdp: d.gdp };
    });
  });
  return yearData;
});

export const getMetricRatio = (selected, calculationData, x) => {
  if (!calculationData || !calculationData[x]) return 1;
  if (selected === METRIC_OPTIONS.PER_GDP.value) {
    // GDP is in dollars and we want to display it in million dollars
    return calculationData[x][0].gdp / 1000000;
  }
  if (selected === METRIC_OPTIONS.PER_CAPITA.value) {
    return calculationData[x][0].population;
  }
  return 1;
};

const calculateValue = (currentValue, value, metricData) => {
  const metricRatio = metricData || 1;
  const updatedValue =
    value || value === 0 ? value * DATA_SCALE / metricRatio : null;
  if (updatedValue && (currentValue || currentValue === 0)) {
    return updatedValue + currentValue;
  }
  return updatedValue || currentValue;
};

const getChartData = createSelector(
  [
    sortData,
    getModelSelected,
    getYColumnOptions,
    getMetricSelected,
    getCalculationData
  ],
  (data, model, yColumnOptions, metric, calculationData) => {
    if (!data || !data.length || !model) return null;
    const yearValues = data[0].emissions.map(d => d.year);
    const shouldHaveMetricData =
      metric && metric !== METRIC_OPTIONS.ABSOLUTE_VALUE.value;
    let metricField = null;
    if (shouldHaveMetricData) {
      metricField =
        metric === METRIC_OPTIONS.PER_CAPITA.value ? 'population' : 'gdp';
    }
    const dataParsed = yearValues.map(x => {
      const yItems = {};
      data.forEach(d => {
        const columnObjects = yColumnOptions.filter(
          c =>
            c.label === getDFilterValue(d, model) ||
            (c.members && c.members.includes(d.iso_code3))
        );
        const yKeys = columnObjects.map(k => k.value);
        const yData = d.emissions.find(e => e.year === x);
        let metricData =
          metricField &&
          calculationData &&
          calculationData[x] &&
          calculationData[x][d.iso_code3] &&
          calculationData[x][d.iso_code3][metricField];
        // GDP is in dollars and we want to display it in million dollars
        if (metricField === 'gdp' && metricData) metricData /= 1000000;
        yKeys.forEach(key => {
          if (!shouldHaveMetricData || metricData) {
            yItems[key] = calculateValue(yItems[key], yData.value, metricData);
          }
        });
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

const getChartDomain = createSelector([getChartData], data => {
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
    const tooltip = getTooltipConfig(yColumns.filter(c => !c.hideLegend));
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
        : uniq(selected.map(s => s.value)).join());
    const regionCountriesSelected = [];
    regionsSelected.forEach(r => {
      if (r.members) regionCountriesSelected.push(r.members);
    });
    const countryValues = regionCountriesSelected.join();
    return {
      source: sourcesSelected.value.split('-')[0],
      gwp: sourcesSelected.value.split('-')[1],
      gas: parseValues(gasesSelected),
      sector: parseValues(sectorsSelected),
      location: `${parseValues(regionsSelected)}${countryValues
        ? `,${countryValues}`
        : ''}`
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
  fieldToBreakBy: getModelSelected,
  chartTypeDisabled: getDisableAccumulatedCharts,
  hideRemoveOptions: onlyOneRegionSelected
});
