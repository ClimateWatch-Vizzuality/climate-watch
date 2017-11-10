import { createSelector } from 'reselect';

const getRoutes = routeData => routeData.routes || null;
const getHash = routeData => routeData.hash || null;
const getSearch = routeData =>
  (routeData.location && routeData.location.search) || null;
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
  getRoutes
};
