import variables from './settings.scss';

export const STICKY_OFFSET = {
  mobile: 105,
  desktop: 49
};

const getHeaderColors = () => {
  const headerColors = {};
  Object.keys(variables).forEach(v => {
    if (v.startsWith('headerColor')) {
      const headerColorKey = v.replace('headerColors-', '');
      headerColors[headerColorKey] = variables[v];
    }
  });
  return headerColors;
};

const getHeaderGradients = () => {
  const headerGradients = {};
  Object.keys(variables).forEach(v => {
    if (v.startsWith('headerGradients')) {
      const headerColorKey = v.replace('headerGradients-', '');
      headerGradients[headerColorKey] = variables[v].split(',');
    }
  });
  return headerGradients;
};

export const HEADER_GRADIENTS = getHeaderGradients();
export const HEADER_COLORS = getHeaderColors();
