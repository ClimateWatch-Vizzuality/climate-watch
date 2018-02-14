import { createSelector } from 'reselect';

const getRouteSections = route => route.sections || [];

export const getAnchorLinks = createSelector(getRouteSections, sections =>
  sections.filter(section => section.anchor).map(section => ({
    label: section.label,
    hash: section.hash
  }))
);

export default { getAnchorLinks };
