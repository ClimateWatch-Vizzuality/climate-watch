import { createSelector } from 'reselect';

export const getAnchorLinks = createSelector(
  route => route.routes || [],
  routes =>
    routes.filter(route => route.anchor).map(route => ({
      label: route.label,
      path: route.path
    }))
);

export default {
  getAnchorLinks
};
