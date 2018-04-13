import { createSelector } from 'reselect';
import { isPageContained } from 'utils/navigation';

const getRouteSections = state => state.route.sections || [];
const getSearch = state => state.location.search;

export const getAnchorLinks = createSelector(
  [getRouteSections, getSearch],
  (sections, search) =>
    sections
      .filter(
        section =>
          section.anchor && !(isPageContained && section.excludeFromContained)
      )
      .map(section => ({
        label: section.label,
        hash: section.hash,
        path: section.path,
        search
      }))
);

export default { getAnchorLinks };
