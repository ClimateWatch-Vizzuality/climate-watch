import { createSelector } from 'reselect';
import { compareIndexByKey } from 'utils/utils';

const getSearch = (state, search) => search || null;
const getSDGs = state => state.sdgs || null;
const getTargets = state => state.data.targets || null;
const getGoals = state => state.data.goals || null;
const getDocuments = state => state.documents && state.documents.data;

export const getDocumentOptions = createSelector([getDocuments], documents => {
  const allDocumentOption = [
    {
      label: 'All documents',
      value: 'all'
    }
  ];
  if (!documents) return allDocumentOption;
  const documentsOptions = Object.values(documents).map(d => ({
    label: d.long_name,
    value: d.slug
  }));
  return [...allDocumentOption, ...documentsOptions];
});

export const getDocumentSelected = createSelector(
  [getDocumentOptions, getSearch],
  (documentOptions, search) => {
    const { document: documentSelected } = search || {};
    if (!documentSelected) return documentOptions[0];
    return documentOptions.find(d => d.value === documentSelected);
  }
);

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

export default {
  getSearchListData,
  getSearchListMeta,
  getOptionSelectedMeta,
  getOptionSelectedData,
  getDocumentSelected
};
