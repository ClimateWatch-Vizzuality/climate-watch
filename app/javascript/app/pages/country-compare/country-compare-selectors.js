import { createSelector } from 'reselect';

const getRouteSections = state => state.route.sections || [];
const getSearch = state => state.location.search;

export const getAnchorLinks = createSelector(
  [getRouteSections, getSearch],
  (sections, search) =>
    sections.filter(section => section.anchor).map(section => ({
      label: section.label,
      hash: section.hash,
      path: section.path,
      search
    }))
);

export default { getAnchorLinks };
