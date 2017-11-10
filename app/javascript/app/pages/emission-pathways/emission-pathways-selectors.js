import { createSelector } from 'reselect';

const getSections = data => data.route.sections || null;
export const getRoutes = data => data.route.routes || null;
export const getSearch = data => data.location.search || null;
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

export default {
  getAnchorLinks,
  getRoutes
};
