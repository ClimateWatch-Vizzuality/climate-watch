import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';

const getSections = espModelData => espModelData.route.sections || null;
const getSearch = espModelData => espModelData.location.search || null;
const getHash = espModelData => espModelData.hash || null;
const getRoutes = espModelData => espModelData.route.routes || null;
const getData = espModelData =>
  (!espModelData.modelData || isEmpty(espModelData.modelData.data)
    ? null
    : espModelData.modelData.data);

export const getId = espModelData => espModelData.id || null;
export const getAnchorLinks = createSelector(
  [getSections, getSearch],
  (sections, search) =>
    sections.filter(route => route.anchor).map(route => ({
      label: route.label,
      path: route.path,
      hash: route.hash,
      search
    }))
);

export const getRouteLinks = createSelector(
  [getRoutes, getHash, getSearch, getId],
  (routes, hash, search, id) =>
    routes &&
    routes.filter(r => r.anchor).map(route => ({
      label: route.label,
      path: route.path.replace(':id', id),
      search,
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
