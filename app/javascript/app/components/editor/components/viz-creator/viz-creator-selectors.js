import { createSelector } from 'reselect';
import find from 'lodash/find';

export const datasets = state => state.datasets.data;
export const dataset = state => state.dataset;
export const vizTypes = state => state && state['viz-types'];
export const visualisation = state => state && state.visualisation;

const visualisations = state => state && state.visualisations;
const filters = state => state && state.filters;

const mergeViz = t => t.reduce((r, c) => r.concat([...visualisations(c)]), []);

export const vizSelector = createSelector(datasets, dataset, (sets, set) =>
  vizTypes(find(sets, { id: set }))
);

export const filtersSelector = createSelector(
  vizSelector,
  visualisation,
  (d, viz) => d && filters(find(mergeViz(d), { id: viz }))
);

// .filter(dd => find(dd.visualisations, { id: viz }))[0]
