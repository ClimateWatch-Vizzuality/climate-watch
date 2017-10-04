import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

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
      stroke: colors[index % 10],
      strokeWidth: 5
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
