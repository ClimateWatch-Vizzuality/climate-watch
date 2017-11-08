import { createSelector } from 'reselect';

const getRoutes = route => route.sections || null;
export const getAnchorLinks = createSelector(
  getRoutes,
  sections =>
    sections &&
    sections.filter(route => route.anchor).map(route => ({
      label: route.label,
      path: route.path,
      hash: route.hash
    }))
);

export default {
  getAnchorLinks
};
