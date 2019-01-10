import { createSelector } from 'reselect';
// import omit from 'lodash/omit';
// import qs from 'query-string';

const getSections = routeData => routeData.route.sections || null;
const getSearch = routeData => routeData.location.search || null;

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

// export const getRouteLinks = createSelector(
//   [getRoutes, getHash, getSearch],
//   (routes, hash, search) =>
//     routes &&
//     routes.filter(r => r.anchor).map(route => ({
//       label: route.label,
//       path: route.path,
//       search: qs.stringify(omit(qs.parse(search), 'search')), // we want to reset the search on tabs change
//       hash
//     }))
// );

export default {
  getAnchorLinks
  // getRouteLinks
};
