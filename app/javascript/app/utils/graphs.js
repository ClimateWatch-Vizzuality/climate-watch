import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import chroma from 'chroma-js';
import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';
import uniq from 'lodash/uniq';
import isArray from 'lodash/isArray';
import { getNiceTickValues } from 'recharts-scale';
import map from 'lodash/map';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';
import { OTHER_COLOR } from 'data/constants';

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

const flatmap = (res, v) => Object.assign(res, v);
export const extractValues = data => key =>
  data.map(d => map(d, (v, k) => ({ [k]: d[k][key] || v })).reduce(flatmap, {}));

export const getColumns = data =>
  Object.keys(data[0]).map(d => ({ label: data[0][d].label, value: d }));

const found = v => v !== -1;

export const groupDataByScenario = (data, scenarios) =>
  data.reduce((res, d) => {
    const year = d.year;
    const idx = findIndex(res, { year });
    // append y values if x exists, otherwise create new row
    const row = found(idx) ? res[idx] : { year };

    const label = scenarios
      ? // use real name if scenarios are passed
      find(scenarios, { id: d.scenario_id }).name
      : d.scenario_id;
    const key = getColumnValue(label);

    row[key] = parseInt(d.value, 10);
    // override row if exists otherwise append new row
    res[found(idx) ? idx : res.length] = row;
    return res;
  }, []);

export const sortEmissionsByValue = array =>
  array.sort((a, b) => {
    if (!a.emissions.length || !b.emissions.length) return 0;
    if (a.emissions[a.emissions.length - 1].value > b.emissions[a.emissions.length - 1].value) {
      return -1;
    }
    if (a.emissions[a.emissions.length - 1].value < b.emissions[a.emissions.length - 1].value) {
      return 1;
    }
    return 0;
  });

export const getColumnValue = column => upperFirst(camelCase(column));
export const getYColumnValue = column => `y${getColumnValue(column)}`;

export const getThemeConfig = (columns, colors, colorCache = {}) => {
  const theme = {};
  let newColumns = columns;
  let usedColors = [];
  if (colorCache && !isEmpty(colorCache)) {
    const usedColumns = columns.filter(c => colorCache[c.value]);
    usedColors = uniq(usedColumns.map(c => colorCache[c.value].stroke));
    newColumns = columns.filter(c => !usedColumns.includes(c.value));
  }
  const themeUsedColors = [];
  let availableColors = colors.filter(c => !usedColors.includes(c));
  newColumns.forEach((column, i) => {
    availableColors = availableColors.filter(c => !themeUsedColors.includes(c));
    if (!availableColors.length) availableColors = colors;
    let index;
    if (column.index || column.index === 0) {
      index = column.index;
    } else {
      index = i % availableColors.length;
      themeUsedColors.push(selectedColor);
    }
    const selectedColor = availableColors[index];
    theme[column.value] = {
      stroke: selectedColor,
      fill: selectedColor
    };
    if (column.hideLegend || column.hideData) {
      theme[column.value] = {
        stroke: OTHER_COLOR,
        fill: OTHER_COLOR
      };
    }
  });
  return {
    ...theme,
    ...colorCache
  };
};

export const getPieChartThemeConfig = (columns, colors) => {
  const theme = {};
  columns.forEach((column, i) => {
    const index = column.index || i;
    const correctedIndex = index < colors.length ? index : index - colors.length;
    theme[column.value] = {
      label: column.label,
      stroke: colors[correctedIndex],
      fill: colors[correctedIndex]
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

export const setChartColors = (chartElementsLength, palette, extendedPalette) =>
  (chartElementsLength < 11 ? palette : extendedPalette);

export const getColorPalette = (colorRange, quantity) => chroma.scale(colorRange).colors(quantity);

export const darkenColor = color => chroma(color).darken();

export function setYAxisDomain() {
  return [setBuffer, 'auto'];
}

function setBuffer(min) {
  if (min <= 0.1) return min;
  return min * 0.7;
}

export function setXAxisDomain() {
  return ['auto', 'auto'];
}

export function getCustomTicks(columns, data, tickNumber = 8, decimals = false) {
  const totalValues = [];
  const yValues = columns.y.map(c => data.map(d => d[[c.value]]));
  const getSign = value => (value > 0 ? 'positive' : 'negative');
  for (let index = 0; index < yValues[0].length; index++) {
    const total = {
      positive: 0,
      negative: 0
    };
    for (let e = 0; e < yValues.length; e++) {
      let value = yValues[e][index];
      if (isArray(value)) value = value[1]; // Take the biggest value of the quantification pair
      total[getSign(value)] += value || 0;
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
