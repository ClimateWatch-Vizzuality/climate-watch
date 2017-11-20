import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';

const getSections = state => state.route.sections || null;
const getHash = state => state.hash || null;
const getRoutes = state => state.route.routes || null;
const getData = state =>
  (!state.modelData || isEmpty(state.modelData.data)
    ? null
    : state.modelData.data);

export const getId = state => state.id || null;
export const getAnchorLinks = createSelector([getSections], sections =>
  sections.filter(route => route.anchor).map(route => ({
    label: route.label,
    path: route.path,
    hash: route.hash
  }))
);

export const getRouteLinks = createSelector(
  [getRoutes, getHash, getId],
  (routes, hash, id) =>
    routes &&
    routes.filter(r => r.anchor).map(route => ({
      label: route.label,
      path: route.path.replace(':id', id),
      hash
    }))
);

export const getModel = createSelector([getData, getId], (data, id) => {
  if (!data) return null;
  return data.find(d => String(d.id) === id) || {};
});

export const getOverviewData = createSelector([getModel], data => {
  if (!data) return null;
  const overviewFields = [
    'maintainer_name',
    'geographic_coverage_region',
    'sectoral_coverage',
    'time_horizon',
    'license'
  ];

  return pick(data, overviewFields);
});

export default {
  getAnchorLinks,
  getRouteLinks,
  getOverviewData,
  getModel,
  getId
};
