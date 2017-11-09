import { createSelector } from 'reselect';

const getRoutes = routes => routes || null;
export const getRouteLinks = createSelector(
  getRoutes,
  routes =>
    routes &&
    routes.map(route => ({
      label: route.label,
      path: route.path
    }))
);

export default {
  getRoutes
};
