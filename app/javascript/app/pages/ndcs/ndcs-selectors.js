import { createSelector } from 'reselect';

const getRoutes = route => route.routes || null;

export const getAnchorLinks = createSelector(
  getRoutes,
  routes =>
    routes &&
    routes.filter(route => route.anchor).map(route => ({
      label: route.label,
      path: route.path
    }))
);

export default {
  getAnchorLinks
};
