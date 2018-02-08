import { ofPath } from 'js-lenses';

export const times = (n, s, sep = '|') =>
  `${s}${sep}`
    .repeat(n)
    .split(sep)
    .slice(0, -1);

export const $datasets = ofPath('datasets');
export const $visualisations = ofPath('datasets', 'child');
export const $locations = ofPath('datasets', ...times(2, 'child'));
export const $models = ofPath('datasets', ...times(3, 'child'));
export const $scenarios = ofPath('datasets', ...times(4, 'child'));
export const $categories = ofPath('datasets', ...times(5, 'child'));
export const $subcategories = ofPath('datasets', ...times(6, 'child'));
export const $indicators = ofPath('datasets', ...times(7, 'child'));
export const $years = ofPath('datasets', ...times(8, 'child'));
export const $timeseries = ofPath('datasets', ...times(9, 'child'));
