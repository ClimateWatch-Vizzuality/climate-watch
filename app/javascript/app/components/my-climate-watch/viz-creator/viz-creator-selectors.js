import { createSelector } from 'reselect';
import { get } from 'js-lenses';
import _ from 'lodash-inflection';
import _find from 'lodash/find';
// import identity from 'lodash/identity';
// import isEmpty from 'lodash/isEmpty';
// import _filter from 'lodash/filter';
// import { format } from 'd3-format';
import { processLineData, flatMapVis } from './viz-creator-utils';
import * as lenses from './viz-creator-lenses';

// import {
//   groupDataByScenario,
//   pickByKey,
//   mergeLineProps,
//   getLineProps,
//   COLORS
// } from './components/charts/line/utils';

// const mergeViz = t => t.reduce((r, c) => r.concat([...visualisations(c)]), []);

export const dataSelector = state => state;
export const datasetsSelector = state => get(lenses.$datasets, state);
export const visualisationsSelector = state =>
  get(lenses.$visualisations, state);
export const locationsSelector = state => get(lenses.$locations, state);
export const modelsSelector = state => get(lenses.$models, state);
export const scenariosSelector = state => get(lenses.$scenarios, state);
export const indicatorsSelector = state => get(lenses.$indicators, state);
export const categoriesSelector = state => get(lenses.$categories, state);
export const subcategoriesSelector = state => get(lenses.$subcategories, state);
export const timeseriesSelector = state => get(lenses.$timeseries, state);

export const hasDataSelector = createSelector(
  datasetsSelector,
  visualisationsSelector,
  locationsSelector,
  modelsSelector,
  scenariosSelector,
  indicatorsSelector,
  categoriesSelector,
  subcategoriesSelector,
  (
    datasets,
    visualisations,
    locations,
    models,
    scenarios,
    indicators,
    categories
    // subcategories
  ) =>
    datasets.selected &&
    visualisations.selected &&
    locations.selected &&
    models.selected &&
    scenarios.selected &&
    indicators.selected &&
    categories.selected
  // subcategories.selected
);

export const vizTypes = data => data && data['viz-types'];
export const vizSelector = createSelector(datasetsSelector, sets =>
  vizTypes(_find(sets.data, { id: sets.selected }))
);

export const chartDataSelector = createSelector(
  [hasDataSelector, timeseriesSelector, scenariosSelector],
  (hasData, timeseries, scenarios) => {
    if (!hasData) return {};
    return { ...processLineData(timeseries.data, scenarios.data) };
  }
);

export const filtersSelector = createSelector(
  [vizSelector, visualisationsSelector, locationsSelector],
  (vizStructure, visualisations) => {
    const selectedStructure = _find(flatMapVis(vizStructure), {
      id: visualisations && visualisations.selected
    });
    return (selectedStructure && selectedStructure.filters) || [];
  }
);

// const uniqueById = data =>
//   data.reduce(
//     (res, current) =>
//       (current &&
//         (find(res, { id: current.id }) ? res : res.concat([current]))) ||
//       res,
//     []
//   );

// // maps filters to dropdown/multiselect format
const mapFilter = data =>
  (data &&
    data.map &&
    data.map(o => ({
      label: o.label || o.name || o.full_name || o.alias,
      value: o.value || o.id
    }))) ||
  null;

export const getFormatFilters = name =>
  createSelector([dataSelector, filtersSelector], (state, spec) => {
    if (!spec || !spec.length > 0) return {};

    const filter = _find(spec, { name }) || {};
    const lense = get(lenses[`$${name}`], state) || {};
    filter.data = mapFilter(lense.data || []);
    filter.placeholder = `Select ${_.singularize(_.titleize(name))}`;
    filter.label = _.titleize(name);

    if (lense.selected) {
      filter.selected = filter.multi
        ? [...lense.selected]
        : { ...lense.selected };
    } else {
      switch (filter.selected) {
        case 'all':
          filter.selected = mapFilter(filter.data);
          break;

        case 'top-10':
          // filter.selected = mapFilter(topEmmiters.data);
          filter.selected = [];
          break;

        default:
          filter.selected = filter.multi ? [] : {};
          break;
      }
    }

    return filter;
  });

// const processLineData = (idc, scn) => {
//   const data = groupDataByScenario(idc, scn);
//   const lineData = pickByKey('value', data);

//   const lineProps = mergeLineProps(
//     {
//       type: 'monotone',
//       dot: false
//     },
//     getLineProps(data, COLORS)
//   );

//   const lines = Object.keys(lineData[0]).slice(1);
//   const axis = {
//     x: {
//       props: {
//         dataKey: 'year',
//         tick: { stroke: '#8f8fa1', strokeWidth: 0.5, fontSize: '13px' },
//         padding: { left: 15, right: 20 },
//         tickSize: 8
//       }
//     },
//     y: {
//       props: {
//         axisLine: false,
//         tickFormatter: tick => `${format('.2s')(tick)}t`,
//         tickLine: false,
//         tick: { stroke: '#8f8fa1', strokeWidth: 0.5, fontSize: '13px' },
//         domain: ['auto', 'auto']
//       }
//     }
//   };

//   const margin = { top: 20, right: 0, left: -10, bottom: 0 };

//   const config = {
//     data: lineData,
//     margin
//   };

//   const cartesianGrid = {
//     vertical: false
//   };

//   return {
//     config,
//     lineProps,
//     lines,
//     axis,
//     cartesianGrid
//   };
// };

// export const timeseriesSelector = createSelector(
//   timeseries,
//   scenarios,
//   (series, scn) =>
//     (isEmpty(series.data) ? series.data : processLineData(series.data, scn.data))
// );
