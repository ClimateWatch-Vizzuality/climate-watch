import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const getSections = state => state.route.sections || null;
const getHash = state => state.hash || null;
const getRoutes = state => state.route.routes || null;
const getData = state =>
  (isEmpty(state.scenarioData) ? null : state.scenarioData);

export const getId = state => state.id || null;
export const getAnchorLinks = createSelector([getSections], sections =>
  sections.filter(route => route.anchor).map(route => ({
    label: route.label,
    path: route.path,
    hash: route.hash
  }))
);

export const getRouteLinks = createSelector(
  [getRoutes, getHash, getId],
  (routes, hash, id) =>
    routes &&
    routes.filter(r => r.anchor).map(route => ({
      label: route.label,
      path: route.path.replace(':id', id),
      hash
    }))
);

export const getScenario = createSelector([getData, getId], (data, id) => {
  if (!data) return null;
  return data.find(d => String(d.id) === id) || {};
});

export default {
  getAnchorLinks,
  getRouteLinks,
  getScenario,
  getId
};
