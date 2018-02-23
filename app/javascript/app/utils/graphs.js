import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import chroma from 'chroma-js';
import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';
import { getNiceTickValues } from 'recharts-scale';

export const parseRegions = regions =>
  regions.map(region => ({
    label: region.wri_standard_name,
    value: region.iso_code3
  }));

export const sortLabelByAlpha = array =>
  array.sort((a, b) => {
    if (a.label < b.label) return -1;
    if (a.label > b.label) return 1;
    return 0;
  });

export const sortEmissionsByValue = array =>
  array.sort((a, b) => {
    if (
      a.emissions[a.emissions.length - 1].value >
      b.emissions[a.emissions.length - 1].value
    ) {
      return -1;
    }
    if (
      a.emissions[a.emissions.length - 1].value <
      b.emissions[a.emissions.length - 1].value
    ) {
      return 1;
    }
    return 0;
  });

export const getYColumnValue = column => `y${upperFirst(camelCase(column))}`;

export const getThemeConfig = (columns, colors) => {
  const theme = {};
  columns.forEach((column, index) => {
    theme[column.value] = {
      stroke: colors[index],
      fill: colors[index]
    };
  });
  return theme;
};

export const getTooltipConfig = columns => {
  const tooltip = {};
  columns.forEach(column => {
    tooltip[column.value] = { label: column.label };
  });
  return tooltip;
};

export const getColorPalette = (colorRange, quantity) =>
  chroma.scale(colorRange).colors(quantity);

export function getCustomTicks(
  columns,
  data,
  tickNumber = 8,
  decimals = false
) {
  const totalValues = [];
  const yValues = columns.y.map(c => data.map(d => d[[c.value]]));
  for (let index = 0; index < yValues[0].length; index++) {
    const total = {
      positive: 0,
      negative: 0
    };
    for (let e = 0; e < yValues.length; e++) {
      if (yValues[e][index] > 0) {
        total.positive += yValues[e][index] || 0;
      } else {
        total.negative += yValues[e][index] || 0;
      }
    }
    totalValues.push(total);
  }

  const minValue = minBy(totalValues, 'negative').negative;
  const maxValue = maxBy(totalValues, 'positive').positive;
  return {
    min: minValue,
    max: maxValue,
    ticks: getNiceTickValues([minValue, maxValue], tickNumber, decimals)
  };
}
