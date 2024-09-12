import variables from './settings.scss';

export const STICKY_OFFSET = {
  mobile: 105,
  desktop: 49
};

const getColorsFromSettings = (prefix, isArray) => {
  const colors = {};
  Object.keys(variables).forEach(v => {
    if (v.startsWith(prefix)) {
      const colorKey = v.replace(`${prefix}-`, '');
      colors[colorKey] = isArray ? variables[v].split(',') : variables[v];
    }
  });
  return colors;
};

export const HEADER_GRADIENTS = getColorsFromSettings('headerGradients', true);
export const HEADER_COLORS = getColorsFromSettings('headerColors');
export const CHART_NAMED_COLORS = getColorsFromSettings('chartColors');
export const CHART_NAMED_GRAY_COLORS = getColorsFromSettings('chartGrayColors');
export const CHART_NAMED_EXTENDED_COLORS = getColorsFromSettings(
  'chartColorsExtended'
);

export const CHART_NAMED_EXTRA_COLORS = getColorsFromSettings(
  'chartColorsExtra'
);

export const CONTINOUS_RAMP = getColorsFromSettings('continousRamp');

export const SECTOR_COLORS = getColorsFromSettings('sectorColors');

export const SECTOR_COLORS_BY_LABEL = {
  Energy: SECTOR_COLORS.energy,
  Agriculture: SECTOR_COLORS.agriculture,
  'Industrial Processes': SECTOR_COLORS.industrial,
  // Note: We're keeping the next entry to facilitate a transition from LUCF to LULUCF.
  //       This entry should be able to be removed once all changes (FE, Data, Files) are
  //       merged into production.
  'Land-Use Change and Forestry': SECTOR_COLORS.landUse,
  'Land Use, Land-Use Change and Forestry': SECTOR_COLORS.landUse,
  Waste: SECTOR_COLORS.waste
};
