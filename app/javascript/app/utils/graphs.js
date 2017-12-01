import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import chroma from 'chroma-js';
import map from 'lodash/map';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

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
  data.map(d =>
    map(d, (v, k) => ({ [k]: d[k][key] || v })).reduce(flatmap, {})
  );

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

export const getColumnValue = column => upperFirst(camelCase(column));
export const getYColumnValue = column => `y${getColumnValue(column)}`;

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
