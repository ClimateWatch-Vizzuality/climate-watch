import { CHART_COLORS } from 'data/constants';
import sortBy from 'lodash/sortBy';

/**
 * Gets the data format that most of recharts charts expect
 */
export function mergeForChart({ data, mergeBy, labelKey, valueKey }) {
  if (!data || !data.length) return [];
  const dataObj = {};
  data.forEach(rd => {
    dataObj[rd[mergeBy]] = {
      x: rd[mergeBy],
      ...dataObj[rd[mergeBy]],
      [rd[labelKey]]: rd[valueKey]
    };
  });
  return sortBy(Object.values(dataObj), mergeBy);
}

export function getChartConfig(categories) {
  const getTheme = values =>
    values.reduce(
      (acc, value, i) => ({
        ...acc,
        [value]: { stroke: CHART_COLORS[i], fill: CHART_COLORS[i] }
      }),
      {}
    );
  const getTooltipConfig = values =>
    values.reduce((acc, value) => ({ ...acc, [value]: { label: value } }), {});

  return {
    axes: {
      xBottom: { name: 'Year', unit: 'date', format: 'YYYY' },
      yLeft: { format: 'number' }
    },
    animation: false,
    columns: {
      x: [{ label: 'Year', value: 'x' }],
      y: categories.map(b => ({ label: b, value: b }))
    },
    tooltip: getTooltipConfig(categories),
    theme: getTheme(categories)
  };
}
