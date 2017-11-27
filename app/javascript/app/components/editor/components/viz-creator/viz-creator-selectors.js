import { createSelector } from 'reselect';
import _ from 'lodash-inflection';
import keys from 'lodash/keys';
import identity from 'lodash/identity';
import isEmpty from 'lodash/isEmpty';
import findIndex from 'lodash/findIndex';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import find from 'lodash/find';
import filter from 'lodash/filter';

export const filters = state => state && state.filters;
export const dataset = state => state.dataset;
export const datasets = state => state && state.datasets.data;
export const categories = state => filters(state) && filters(state).categories;
export const indicators = state => filters(state) && filters(state).indicators;
export const vizTypes = state => state && state['viz-types'];
export const visualisation = state => state && state.visualisation;
const visualisations = state => state && state.visualisations;

const mergeViz = t => t.reduce((r, c) => r.concat([...visualisations(c)]), []);

export const vizSelector = createSelector(datasets, dataset, (sets, set) =>
  vizTypes(find(sets, { id: set }))
);

export const filtersSelector = createSelector(
  vizSelector,
  visualisation,
  (d, viz) => d && filters(find(mergeViz(d), { id: viz }))
);

const uniqueById = data =>
  data.reduce(
    (res, current) =>
      (current &&
        (find(res, { id: current.id }) ? res : res.concat([current]))) ||
      res,
    []
  );

// maps filters to dropdown/multiselect format
const mapFilter = data =>
  (data &&
    data.map &&
    data.map(o => ({
      label: o.label || o.name || o.full_name || o.alias,
      value: o.value || o.id
    }))) ||
  null;

export const subcategoriesSelector = createSelector(
  categories,
  indicators,
  (cats, indics) =>
    cats &&
    cats.selected &&
    indics &&
    uniqueById(
      filter(indics.data, i => i.category.id === cats.selected.value).map(
        i => i.subcategory
      )
    )
);

export const getFormatFilters = name =>
  createSelector(identity, filtersSelector, (state, spec) => {
    const filter = { ...state.filters[name] };
    filter.data = mapFilter(filter.data);
    filter.placeholder = `Select ${_.singularize(_.titleize(name))}`;
    filter.label = _.titleize(name);

    const selected =
      spec && find(spec, { name }) && find(spec, { name }).selected;

    if (!filter.selected) {
      switch (selected) {
        case 'all':
          filter.selected = mapFilter(filter.data);
          break;

        default:
          filter.selected = selected;
          break;
      }
    }

    return filter;
  });
