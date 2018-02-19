import { createSelector } from 'reselect';
import _ from 'lodash-inflection';
import identity from 'lodash/identity';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import _filter from 'lodash/filter';
import { format } from 'd3-format';

import {
  groupDataByScenario,
  pickByKey,
  mergeLineProps,
  getLineProps,
  COLORS
} from './components/charts/line/utils';

export const filters = state => state && state.filters;
export const dataset = state => state.dataset;
export const datasets = state => state && state.datasets.data;
export const categories = state => filters(state) && filters(state).categories;
export const scenarios = state => filters(state) && filters(state).scenarios;
export const indicators = state => filters(state) && filters(state).indicators;
export const vizTypes = state => state && state['viz-types'];
export const visualisation = state => state && state.visualisation;
export const timeseries = state => state && state.timeseries;
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
      _filter(indics.data, i => i.category.id === cats.selected.value).map(
        i => i.subcategory
      )
    )
);

export const getFormatFilters = name =>
  createSelector(identity, filtersSelector, (state, spec) => {
    const { topEmmiters } = state;
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

        case 'top-10':
          // filter.selected = mapFilter(topEmmiters.data);
          filter.selected = [];
          break;

        default:
          filter.selected = selected;
          break;
      }
    }

    return filter;
  });

const processLineData = (idc, scn) => {
  const data = groupDataByScenario(idc, scn);
  const lineData = pickByKey('value', data);

  const lineProps = mergeLineProps(
    {
      type: 'monotone',
      dot: false
    },
    getLineProps(data, COLORS)
  );

  const lines = Object.keys(lineData[0]).slice(1);
  const axis = {
    x: {
      props: {
        dataKey: 'year',
        tick: { stroke: '#8f8fa1', strokeWidth: 0.5, fontSize: '13px' },
        padding: { left: 15, right: 20 },
        tickSize: 8
      }
    },
    y: {
      props: {
        axisLine: false,
        tickFormatter: tick => `${format('.2s')(tick)}t`,
        tickLine: false,
        tick: { stroke: '#8f8fa1', strokeWidth: 0.5, fontSize: '13px' },
        domain: ['auto', 'auto']
      }
    }
  };

  const margin = { top: 20, right: 0, left: -10, bottom: 0 };

  const config = {
    data: lineData,
    margin
  };

  const cartesianGrid = {
    vertical: false
  };

  return {
    config,
    lineProps,
    lines,
    axis,
    cartesianGrid
  };
};

export const timeseriesSelector = createSelector(
  timeseries,
  scenarios,
  (series, scn) =>
    isEmpty(series.data) ? series.data : processLineData(series.data, scn.data)
);
