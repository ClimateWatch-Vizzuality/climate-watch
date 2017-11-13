import { createSelector } from 'reselect';

const getSections = routeData => routeData.route.sections || null;
const getSearch = routeData => routeData.location.search || null;
const getHash = routeData => routeData.hash || null;
const getRoutes = routeData => routeData.route.routes || null;

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

export default {
  getAnchorLinks,
  getRouteLinks
};
