import { createSelector } from 'reselect';

const getSections = route => route.sections || null;
export const getRoutes = route => route.routes || null;
export const getAnchorLinks = createSelector(
  getSections,
  sections =>
    sections &&
    sections.filter(route => route.anchor).map(route => ({
      label: route.label,
      path: route.path,
      hash: route.hash
    }))
);

export default {
  getAnchorLinks,
  getRoutes
};
