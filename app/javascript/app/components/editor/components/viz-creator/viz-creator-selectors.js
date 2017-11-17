import { createSelector } from 'reselect';
import map from 'lodash/map';

export const datasets = state => state.datasets;
export const dataset = state => state.dataset;
export const visualizations = state => state.visualizations;
export const visualization = state => state.visualization;

export const vizSelector = createSelector(
  datasets,
  dataset,
  (sets, set) => (sets[set] && visualizations(sets[set]))
);


export const filtersSelector = createSelector(
  vizSelector,
  visualization,
  (d, viz) => (d && map(d[viz], dd => console.log(({ ...dd, name: dd.title })) || ({ ...dd, name: dd.title })))
);
