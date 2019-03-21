import { createSelector, createStructuredSelector } from 'reselect';
import lowerCase from 'lodash/lowerCase';
import isEmpty from 'lodash/isEmpty';
import some from 'lodash/some';
import flatten from 'lodash/flatten';
import {
  getSelectedCountry,
  getSelectedYear
} from '../../countries-contexts-selectors';

const TRADE_IMPORT = 'Import';
const TRADE_EXPORT = 'Export';

const GDP_FILTER = 'GDP';
const PER_CAPITA_FILTER = 'per_capita';

export const CATEGORY_KEY = 'meatCategory';
export const BREAK_BY_KEY = 'breakBy';
export const COUNTRIES_KEY = 'country';

// DATA && METADATA
const getMeatConsumptionData = ({ meatConsumption }) =>
  meatConsumption && meatConsumption.data;

const getMeatProductionData = ({ meatProduction }) =>
  meatProduction && meatProduction.data;

const getMeatTradeData = ({ meatTrade }) => meatTrade && meatTrade.data;

const getWorldConsumptionData = ({ meatWorldConsumption }) =>
  meatWorldConsumption && meatWorldConsumption.data;

const getWorldProductionData = ({ meatWorldProduction }) =>
  meatWorldProduction && meatWorldProduction.data;

const getWorldTradeData = ({ meatWorldTrade }) =>
  meatWorldTrade && meatWorldTrade.data;

const getMeatConsumptionMeta = ({ meatConsumption }) =>
  meatConsumption && meatConsumption.meta;

const getMeatProductionMeta = ({ meatProduction }) =>
  meatProduction && meatProduction.meta;

const getMeatTradeMeta = ({ meatTrade }) => meatTrade && meatTrade.meta;

const getSearch = ({ search }) => search || null;

const getCountriesCountPerIndicators = createSelector(
  [getMeatConsumptionMeta, getMeatTradeMeta, getMeatProductionMeta],
  (consumptionMeta, tradeMeta, productionMeta) => {
    if (!consumptionMeta || !tradeMeta || !productionMeta) return null;

    return { ...consumptionMeta[0], ...tradeMeta[0], ...productionMeta[0] };
  }
);

const getProductionConsumptionMeta = createSelector(
  [getMeatConsumptionMeta, getMeatProductionMeta],
  (consumptionMeta, productionMeta) => {
    if (!consumptionMeta || !productionMeta) return null;

    return [...consumptionMeta, ...productionMeta];
  }
);

const getConsumptionProductionOptions = createSelector(
  [getMeatConsumptionMeta, getMeatProductionMeta],
  (consumptionMeta, productionMeta) => {
    if (!consumptionMeta || !productionMeta) return null;

    return [consumptionMeta, productionMeta].map(
      meta =>
        meta &&
        meta.length &&
        meta[1] && {
          label: meta[1].indicator,
          value: meta[1].indicator
        }
    );
  }
);

const getTradeOptions = createSelector(getMeatTradeMeta, tradeMeta => {
  if (!tradeMeta) return null;

  return [
    { label: TRADE_IMPORT, value: TRADE_IMPORT },
    { label: TRADE_EXPORT, value: TRADE_EXPORT }
  ];
});

// FILTER OPTIONS
const getCategoriesOptions = createSelector(
  [getConsumptionProductionOptions, getTradeOptions],
  (consumptionProductionMeta, tradeOptions) => {
    if (!consumptionProductionMeta || !tradeOptions) return null;

    return [...consumptionProductionMeta, ...tradeOptions];
  }
);

const getBreakByOptions = createSelector(() => [
  { label: 'GDP', value: GDP_FILTER },
  { label: 'Per capita', value: PER_CAPITA_FILTER }
]);

const getDataOptions = createSelector([getSelectedCountry], selectedCountry => {
  if (isEmpty(selectedCountry)) return null;
  return [
    { label: selectedCountry.label, value: selectedCountry.value },
    { label: 'Other countries', value: 'others' }
  ];
});

const getDefaults = createSelector(
  [getCategoriesOptions, getBreakByOptions, getDataOptions],
  (categoriesOptions, breakByOptions, dataOptions) => {
    if (!categoriesOptions || !breakByOptions || !dataOptions) return null;

    return {
      [BREAK_BY_KEY]: breakByOptions.find(o => o.value === GDP_FILTER),
      [CATEGORY_KEY]: categoriesOptions && categoriesOptions[0],
      [COUNTRIES_KEY]: dataOptions.filter(o => o.value !== 'others')
    };
  }
);

const getSelectedCategory = createSelector(
  [getSearch, getDefaults, getCategoriesOptions],
  (query, defaults, categories) => {
    if (!defaults || !categories) return null;
    if (!query || !query[CATEGORY_KEY]) return defaults[CATEGORY_KEY];
    return categories.find(c => c.value === query[CATEGORY_KEY]);
  }
);

const getSelectedData = createSelector(
  [getSearch, getDefaults, getDataOptions],
  (query, defaults, dataOptions) => {
    if (!defaults || !dataOptions) return null;
    if (!query || !query.tradeChart) return defaults[COUNTRIES_KEY];
    return query.tradeChart.includes('others')
      ? dataOptions
      : dataOptions.filter(o => o.value !== 'others');
  }
);

const getSelectedBreakBy = createSelector(
  [getSearch, getDefaults, getBreakByOptions],
  (query, defaults, breakByOptions) => {
    if (!defaults || !breakByOptions) return null;
    if (!query || !query[BREAK_BY_KEY]) return defaults[BREAK_BY_KEY];
    return breakByOptions.find(o => o.value === query[BREAK_BY_KEY]);
  }
);

const getSelectedFilters = createSelector(
  [getSelectedCategory, getSelectedBreakBy],
  (selectedCategory, selectedBreakBy) => {
    if (!selectedCategory || !selectedBreakBy) return null;

    return {
      [CATEGORY_KEY]: selectedCategory,
      [BREAK_BY_KEY]: selectedBreakBy
    };
  }
);

const getBreakByValue = createSelector(getSelectedFilters, selectedFilters => {
  if (!selectedFilters) return null;

  const isPerCapitaSelected =
    selectedFilters[BREAK_BY_KEY] &&
    selectedFilters[BREAK_BY_KEY].value === PER_CAPITA_FILTER;

  return isPerCapitaSelected ? PER_CAPITA_FILTER : ''; // 'GDP' is not explicitly indicated in the API
});

const getChartData = createSelector(
  [
    getSelectedFilters,
    getSelectedData,
    getProductionConsumptionMeta,
    getMeatTradeMeta,
    getMeatConsumptionData,
    getMeatProductionData,
    getMeatTradeData,
    getSelectedCountry,
    getBreakByValue,
    getWorldConsumptionData,
    getWorldProductionData,
    getWorldTradeData,
    getCountriesCountPerIndicators
  ],
  (
    selectedFilters,
    selectedData,
    productionConsumptionMeta,
    tradeMeta,
    consumptionData,
    productionData,
    tradeData,
    selectedCountry,
    breakByValue,
    worldConsumptionData,
    worldProductionData,
    worldTradeData,
    countriesCountPerIndicators
  ) => {
    if (
      !selectedFilters ||
      !productionConsumptionMeta ||
      !tradeMeta ||
      !selectedData ||
      isEmpty(selectedCountry) ||
      !worldConsumptionData ||
      !worldProductionData ||
      !worldTradeData ||
      isEmpty(countriesCountPerIndicators)
    ) {
      return null;
    }

    const filterBreakByFn = o =>
      o.short_name && o.short_name.includes(breakByValue);

    const isTradeIndicator =
      selectedFilters[CATEGORY_KEY] &&
      (selectedFilters[CATEGORY_KEY].value === TRADE_IMPORT ||
        selectedFilters[CATEGORY_KEY].value === TRADE_EXPORT);

    const showCountryData = selectedData.find(
      o => o.value === selectedCountry.value
    );
    const showOthersData = selectedData.find(o => o.value === 'others');

    const xValues = isTradeIndicator
      ? tradeMeta
        .filter(o => o.category === selectedFilters[CATEGORY_KEY].value)
        .map(o => o.subcategory)
      : productionConsumptionMeta
        .filter(o => o.indicator === selectedFilters[CATEGORY_KEY].value)
        .map(o => o.category);

    const data = { ...consumptionData, ...productionData, ...tradeData };
    const worldData = {
      ...worldConsumptionData,
      ...worldProductionData,
      ...worldTradeData
    };

    const dataParsed = xValues.map(x => {
      const yItems = {};

      const dataID = isTradeIndicator
        ? tradeMeta.filter(filterBreakByFn).find(o => o.subcategory === x) &&
          tradeMeta.filter(filterBreakByFn).find(o => o.subcategory === x)
            .short_name
        : productionConsumptionMeta
          .filter(filterBreakByFn)
          .find(o => o.category === x) &&
          productionConsumptionMeta
            .filter(filterBreakByFn)
            .find(o => o.category === x).short_name;
      const parsedDataID = lowerCase(dataID)
        .split(' ')
        .join('_');

      const countryValue = !isEmpty(data) && data[parsedDataID];
      if (showCountryData) {
        yItems.yCountry = countryValue || undefined;
      }
      if (showOthersData) {
        const worldValue =
          (!isEmpty(worldData) && worldData[parsedDataID]) || undefined;
        yItems.yOthers = worldValue;
      }
      const item = {
        x,
        ...yItems,
        countriesCount: countriesCountPerIndicators[parsedDataID]
      };
      return item;
    });

    const parsed = dataParsed.map(o =>
      Object.keys(o)
        .filter(key => !['x'].includes(key))
        .reduce((obj, key) => {
          // eslint-disable-next-line no-param-reassign
          obj[key] = o[key];
          return obj;
        }, {})
    );

    const anyValues = some(flatten(parsed.map(o => Object.values(o))));
    return { data: dataParsed, hasValues: anyValues };
  }
);

const getAxesConfig = createSelector(
  [
    getSelectedFilters,
    getMeatProductionMeta,
    getMeatConsumptionMeta,
    getMeatTradeMeta,
    getBreakByValue
  ],
  (
    selectedFilters,
    productionMeta,
    consumptionMeta,
    tradeMeta,
    breakByValue
  ) => {
    if (!selectedFilters || !productionMeta || !consumptionMeta || !tradeMeta) {
      return null;
    }

    const allMeta = [...productionMeta, ...consumptionMeta, ...tradeMeta];
    const filterBreakByFn = o =>
      o.short_name && o.short_name.includes(breakByValue);

    const indicatorMeta = allMeta
      .filter(filterBreakByFn)
      .find(
        o =>
          o.indicator.includes(selectedFilters[CATEGORY_KEY].value) ||
          o.category.includes(selectedFilters[CATEGORY_KEY].value)
      );

    return {
      xBottom: {
        name: 'Category',
        unit: '',
        format: 'string',
        label: { dx: 0, dy: 0, className: '' }
      },
      yLeft: {
        name: 'Meat',
        unit: indicatorMeta && indicatorMeta.unit,
        format: 'number',
        label: { dx: 2, dy: 14, className: '' }
      }
    };
  }
);

const getTooltipConfig = createSelector(
  [getSelectedCountry, getSelectedData],
  (selectedCountry, selectedData) => {
    if (isEmpty(selectedCountry) || !selectedData) return null;
    return selectedData.find(o => o.value === 'others')
      ? {
        yCountry: { label: selectedCountry.label },
        yOthers: { label: 'Other countries' }
      }
      : { yCountry: { label: selectedCountry.label } };
  }
);

const getChartConfig = createSelector(
  [getSelectedCountry, getAxesConfig, getTooltipConfig],
  (selectedCountry, axesConfig, tooltipConfig) => {
    if (isEmpty(selectedCountry) || !axesConfig) return null;
    return {
      axes: axesConfig,
      tooltip: tooltipConfig,
      animation: false,
      columns: {
        x: [{ label: 'category', value: 'x' }],
        y: [
          {
            label: selectedCountry.label,
            value: 'yCountry',
            stackId: 'stackA'
          },
          { label: 'Other countries', value: 'yOthers', stackId: 'stackA' }
        ]
      },
      theme: {
        yCountry: { stroke: '#0677B3', fill: '#0677B3' },
        yOthers: { stroke: '#D4D6D8', fill: '#D4D6D8' }
      }
    };
  }
);

const getDomain = createSelector(() => ({
  x: ['auto', 'auto'],
  y: [0, 'auto']
}));

export const meatData = createStructuredSelector({
  selectedYear: getSelectedYear,
  selectedCountry: getSelectedCountry,
  categories: getCategoriesOptions,
  breakByOptions: getBreakByOptions,
  selectedCategory: getSelectedCategory,
  selectedBreakBy: getSelectedBreakBy,
  chartData: getChartData,
  chartConfig: getChartConfig,
  dataSelected: getSelectedData,
  dataOptions: getDataOptions,
  domain: getDomain
});
