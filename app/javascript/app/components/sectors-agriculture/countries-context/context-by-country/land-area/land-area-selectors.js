import { createSelector, createStructuredSelector } from 'reselect';
import {
  getSelectedCountry,
  getSelectedYear
} from '../../countries-contexts-selectors';

const AVAILABLE_COLORS_FOR_AGRICULTURAL = [
  '#0677B3',
  '#009CC6',
  '#00B4D2',
  '#045480'
];

const AVAILABLE_COLORS_FOR_OTHERS = ['#CACCD0', '#999B9E'];

const TOTAL_INDICATOR = 'share_in_land_area_1';
const NON_AGRICULTURE_INDICATORS = [
  'share_in_land_area_3',
  'share_in_land_area_4'
];
const AGRICULTURE_INDICATOR = 'share_in_land_area_2';

const AGRICULTURE_SHARE_AREAS = [
  'share_in_agricultural_area_1',
  'share_in_agricultural_area_2',
  'share_in_agricultural_area_3'
];

const getLandAreaData = ({ agricultureLandArea }) =>
  agricultureLandArea && agricultureLandArea.data;

const getLandAreaMetadata = ({ agricultureLandArea }) =>
  agricultureLandArea && agricultureLandArea.meta;

const getTotalValue = createSelector([getLandAreaData], data => {
  if (!data) return null;

  return data[TOTAL_INDICATOR];
});

const getAgriculturalValue = createSelector([getLandAreaData], data => {
  if (!data) return null;

  return data[AGRICULTURE_INDICATOR];
});

const getNonAgriculturalAreas = createSelector(
  [getLandAreaData, getLandAreaMetadata, getTotalValue],
  (data, meta, totalValue) => {
    if (!data || !meta || !totalValue) return null;

    if (data.share_in_land_area_3 || data.share_in_land_area_4) {
      return NON_AGRICULTURE_INDICATORS.map(indKey => ({
        name: meta.find(m => m.short_name === indKey).category,
        size: data[indKey],
        percentageValue: data[indKey] * 100 / totalValue
      }));
    }

    const otherThanAgricultureValue =
      data[TOTAL_INDICATOR] - data[AGRICULTURE_INDICATOR];

    return [
      {
        name: 'Other Land and Forest',
        size: otherThanAgricultureValue,
        percentageValue: otherThanAgricultureValue * 100 / totalValue
      }
    ];
  }
);

const getAgricultureShareAreas = createSelector(
  [getLandAreaData, getLandAreaMetadata, getAgriculturalValue],
  (data, meta, totalAgriculturalValue) => {
    if (!data || !meta || !totalAgriculturalValue) return null;

    return AGRICULTURE_SHARE_AREAS.map(indKey => ({
      name: meta.find(m => m.short_name === indKey).category,
      size: data[indKey],
      percentageValue: data[indKey] * 100 / totalAgriculturalValue
    }));
  }
);

const getAgricultureName = createSelector([getLandAreaMetadata], meta => {
  if (!meta) return null;

  return meta.find(m => m.short_name === AGRICULTURE_INDICATOR).category;
});

const getChartData = createSelector(
  [
    getNonAgriculturalAreas,
    getAgricultureShareAreas,
    getAgricultureName,
    getTotalValue,
    getAgriculturalValue
  ],
  (
    nonAgriculturalAreas,
    agriculturalAreas,
    agriculturalCategory,
    totalValue,
    agriculturalValue
  ) => {
    if (!nonAgriculturalAreas || !agriculturalAreas || !agriculturalCategory) {
      return null;
    }

    return [
      ...nonAgriculturalAreas,
      {
        name: agriculturalCategory,
        percentageValue: agriculturalValue * 100 / totalValue,
        children: agriculturalAreas
      }
    ];
  }
);

const getChartColors = createSelector(
  [getNonAgriculturalAreas, getAgricultureShareAreas, getAgricultureName],
  (nonAgriculturalAreas, agriculturalAreas, agriculturalCategory) => {
    if (!nonAgriculturalAreas || !agriculturalAreas || !agriculturalCategory) {
      return null;
    }

    const nonAgriculturalAreasNames = nonAgriculturalAreas.map(a => a.name);
    const agriculturalAreasNames = agriculturalAreas.map(a => a.name);

    const allAgricultural = [...agriculturalAreasNames, agriculturalCategory];
    const allOthers = [...nonAgriculturalAreasNames];

    const chartColors = {};
    allOthers.forEach((name, i) => {
      chartColors[name] = AVAILABLE_COLORS_FOR_OTHERS[i];
    });

    allAgricultural.forEach((name, i) => {
      chartColors[name] = AVAILABLE_COLORS_FOR_AGRICULTURAL[i];
    });

    return chartColors;
  }
);

const getTooltipConfig = columnsWithColors =>
  Object.keys(columnsWithColors).reduce((tooltip, category) => {
    // eslint-disable-next-line no-param-reassign
    tooltip[category] = { label: category };
    return tooltip;
  }, {});

const getTheme = (
  columnsWithColors,
  agricultureName,
  agricultureShareAreas
) => {
  const withLabels = getTooltipConfig(columnsWithColors);
  const agricultureShareAreasNames = agricultureShareAreas.map(a => a.name);
  withLabels[agricultureName].children = agricultureShareAreasNames;

  agricultureShareAreasNames.forEach(
    // eslint-disable-next-line no-return-assign
    name => (withLabels[name].nestedLegend = true)
  );

  Object.keys(withLabels).forEach(
    // eslint-disable-next-line no-return-assign
    name => (withLabels[name].stroke = columnsWithColors[name])
  );

  return withLabels;
};

const getChartConfig = createSelector(
  [getChartColors, getAgricultureName, getAgricultureShareAreas],
  (columnsWithColors, agricultureName, agricultureShareAreas) => {
    if (!columnsWithColors || !agricultureName || !agricultureShareAreas) {
      return null;
    }

    return {
      tooltip: getTooltipConfig(columnsWithColors),
      theme: getTheme(
        columnsWithColors,
        agricultureName,
        agricultureShareAreas
      ),
      animation: false,
      axes: {
        yLeft: {
          unit: 'Ha'
        }
      },
      hideLegend: true
    };
  }
);

const getFirstLevelLegend = createSelector([getChartConfig], config => {
  if (!config) return null;

  return Object.keys(config.theme).filter(
    key => !config.theme[key].nestedLegend
  );
});

export const landArea = createStructuredSelector({
  selectedYear: getSelectedYear,
  selectedCountry: getSelectedCountry,
  chartData: getChartData,
  chartColors: getChartColors,
  chartConfig: getChartConfig,
  firstLevelLegend: getFirstLevelLegend
});
