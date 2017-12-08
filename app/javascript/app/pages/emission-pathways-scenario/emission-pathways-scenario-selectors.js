import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const getSections = state => state.route.sections || null;
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

export const getScenario = createSelector([getData, getId], (data, id) => {
  if (!data) return null;
  return data.find(d => String(d.id) === id) || {};
});

export default {
  getAnchorLinks,
  getScenario,
  getId
};
