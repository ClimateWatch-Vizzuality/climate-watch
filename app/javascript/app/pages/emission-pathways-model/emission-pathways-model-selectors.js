import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const getSections = espModelData => espModelData.route.sections || null;
const getSearch = espModelData => espModelData.location.search || null;
const getHash = espModelData => espModelData.hash || null;
const getRoutes = espModelData => espModelData.route.routes || null;
const getId = espModelData => espModelData.id || null;
const getData = espModelData =>
  (!espModelData.modelData || isEmpty(espModelData.modelData.data)
    ? null
    : espModelData.modelData.data);

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
  [getRoutes, getHash, getSearch],
  (routes, hash, search) =>
    routes &&
    routes.filter(r => r.anchor).map(route => ({
      label: route.label,
      path: route.path,
      search,
      hash
    }))
);

export const getModel = createSelector([getData, getId], (data, id) => {
  if (!data) return null;
  return data.find(d => String(d.id) === id) || {};
});

export default {
  getAnchorLinks,
  getRouteLinks,
  getModel
};
