import { createSelector } from 'reselect';

const getRouteSections = state => state.route.sections || [];
const getSearch = state => state.location.search;
const getIsContained = state => state.isContained || null;

export const getAnchorLinks = createSelector(
  [getRouteSections, getSearch, getIsContained],
  (sections, search, isContained) =>
    sections
      .filter(
        section =>
          section.anchor &&
          !(isContained && section.hash === 'climate-vulnerability')
      )
      .map(section => ({
        label: section.label,
        hash: section.hash,
        path: section.path,
        search
      }))
);

export default { getAnchorLinks };
