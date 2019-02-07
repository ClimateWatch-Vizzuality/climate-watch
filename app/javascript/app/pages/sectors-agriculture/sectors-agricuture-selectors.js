import { createSelector } from 'reselect';

const getSections = routeData => routeData.route.sections || null;

export const getAnchorLinks = createSelector([getSections], sections =>
  sections.filter(route => route.anchor).map(route => ({
    label: route.label,
    path: route.path,
    hash: route.hash,
    component: route.component
  }))
);

export default {
  getAnchorLinks
};
