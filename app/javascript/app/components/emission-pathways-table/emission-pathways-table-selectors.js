import { createSelector } from 'reselect';

const getRoutes = routeData => (routeData && routeData.routes) || null;
const getHash = routeData => (routeData && routeData.hash) || null;
export const getRouteLinks = createSelector(
  [getRoutes, getHash],
  (routes, hash) =>
    routes &&
    routes.map(route => ({
      label: route.label,
      path: route.path,
      hash
    }))
);

export default {
  getRoutes
};
