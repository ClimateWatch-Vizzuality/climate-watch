import { createSelector } from 'reselect';

const getRouteSections = state => state.route.sections || [];

export const getAnchorLinks = createSelector(getRouteSections, sections =>
  sections.filter(section => section.anchor).map(section => ({
    label: section.label,
    hash: section.hash
  }))
);

export default { getAnchorLinks };
