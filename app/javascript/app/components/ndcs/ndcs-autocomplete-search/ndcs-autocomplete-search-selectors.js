import { createSelector } from 'reselect';
import { compareIndexByKey } from 'utils/utils';

const getSDGs = state => state.sdgs || null;
const getTargets = state => state.data.targets || null;
const getGoals = state => state.data.goals || null;
const getSearch = state => state.search || null;
const getDocSelected = state => state.search.document || null;

export const getGoalsMapped = createSelector([getSDGs], sdgs => {
  if (!sdgs) return null;
  return Object.keys(sdgs).map(goal => ({
    label: `${goal}: ${sdgs[goal].title}`,
    value: goal,
    groupId: 'goal'
  }));
});

export const getTargetsMapped = createSelector([getSDGs], sdgs => {
  if (!sdgs) return null;
  const targets = [];
  Object.keys(sdgs).forEach(goal => {
    Object.keys(sdgs[goal].targets).forEach(target => {
      targets.push({
        label: `${target}: ${sdgs[goal].targets[target].title}`,
        value: target,
        groupId: 'target'
      });
    });
  });
  return targets;
});

export const getGoalsParsed = createSelector([getGoals], goals => {
  if (!goals) return null;
  return goals.map(goal => ({
    label: `${goal.number}: ${goal.title}`,
    value: goal.number,
    groupId: 'goal'
  }));
});

export const getTargetsParsed = createSelector([getTargets], targets => {
  if (!targets) return null;
  return targets
    .map(target => ({
      label: `${target.number}: ${target.title}`,
      value: target.number,
      groupId: 'target'
    }))
    .sort(compareIndexByKey('value'));
});

export const getSearchListData = createSelector(
  [getGoalsMapped, getTargetsMapped],
  (goals, targets) => (goals && targets ? goals.concat(targets) : null)
);

export const getSearchListMeta = createSelector(
  [getGoalsParsed, getTargetsParsed],
  (goals, targets) => (goals && targets ? goals.concat(targets) : null)
);

export const getOptionSelectedData = createSelector(
  [getSearchListData, getSearch],
  (options, search) => {
    if (!options || !search) return null;
    if (search.searchBy === 'query') return null;
    return options.find(option => option.value === search.query);
  }
);

export const getOptionSelectedMeta = createSelector(
  [getSearchListMeta, getSearch],
  (options, search) => {
    if (!options || !search) return null;
    if (search.searchBy === 'query') return null;
    return options.find(option => option.value === search.query);
  }
);

export const documentOptions = [
  {
    label: 'All documents',
    value: 'all'
  },
  {
    label: 'NDC',
    value: 'ndc'
  },
  {
    label: 'INDC',
    value: 'indc'
  }
];

export const getDocumentSelected = createSelector(
  [getDocSelected],
  documentSelected => {
    if (!documentSelected) return documentOptions[0];
    return documentOptions.find(d => d.value === documentSelected);
  }
);

export default {
  getSearchListData,
  getSearchListMeta,
  getOptionSelectedMeta,
  getOptionSelectedData,
  getDocumentSelected,
  documentOptions
};
