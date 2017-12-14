import { ofPath } from 'js-lenses';

const times = (n, s, sep = '|') =>
  `${s}${sep}`
    .repeat(n)
    .split(sep)
    .slice(0, -1);

export const $visualisations = ofPath('child');
export const $locations = ofPath(...times(2, 'child'));
export const $models = ofPath(...times(3, 'child'));
export const $scenarios = ofPath(...times(4, 'child'));
export const $indicators = ofPath(...times(5, 'child'));
export const $categories = ofPath(...times(6, 'child'));
export const $subcategories = ofPath(...times(7, 'child'));
export const $timeseries = ofPath(...times(8, 'child'));
