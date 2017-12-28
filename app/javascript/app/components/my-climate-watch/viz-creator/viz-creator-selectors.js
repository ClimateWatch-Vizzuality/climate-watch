import { createSelector } from 'reselect';
import { get } from 'js-lenses';
import _ from 'lodash-inflection';
import _find from 'lodash/find';
// import identity from 'lodash/identity';
// import isEmpty from 'lodash/isEmpty';
// import _filter from 'lodash/filter';
// import { format } from 'd3-format';
import { flatMapVis } from './viz-creator-utils';
import {
  $visualisations,
  $locations,
  $models,
  $scenarios,
  $indicators,
  $categories,
  $subcategories,
  $timeseries
} from './viz-creator-lenses';

const lenses = {
  visualisations: $visualisations,
  locations: $locations,
  models: $models,
  scenarios: $scenarios,
  indicators: $indicators,
  categories: $categories,
  subcategories: $subcategories,
  timeseries: $timeseries
};

// import {
//   groupDataByScenario,
//   pickByKey,
//   mergeLineProps,
//   getLineProps,
//   COLORS
// } from './components/charts/line/utils';

// const mergeViz = t => t.reduce((r, c) => r.concat([...visualisations(c)]), []);

export const datasetsSelector = state => state;
export const visualisationsSelector = state => get($visualisations, state);
export const locationsSelector = state => get($locations, state);
export const modelsSelector = state => get($models, state);
export const scenariosSelector = state => get($scenarios, state);
export const indicatorsSelector = state => get($indicators, state);
export const categoriesSelector = state => get($categories, state);
export const subcategoriesSelector = state => get($subcategories, state);
export const timeseriesSelector = state => get($timeseries, state);

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
    categories,
    subcategories
  ) =>
    datasets.selected &&
    visualisations.selected &&
    locations.selected &&
    models.selected &&
    scenarios.selected &&
    indicators.selected &&
    categories.selected &&
    subcategories.selected
);

export const vizTypes = data => data && data['viz-types'];
export const vizSelector = createSelector(datasetsSelector, sets =>
  vizTypes(_find(sets.data, { id: sets.selected }))
);

export const filtersSelector = createSelector(
  vizSelector,
  visualisationsSelector,
  locationsSelector,
  (vizStructure, visualisations) => {
    const selectedStructure = _find(flatMapVis(vizStructure), {
      id: visualisations.selected
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
  createSelector(datasetsSelector, filtersSelector, (state, spec) => {
    // const { topEmmiters } = state;
    const filter = get(lenses[name], state);
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
