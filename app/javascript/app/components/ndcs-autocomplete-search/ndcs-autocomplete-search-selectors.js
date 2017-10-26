import { createSelector } from 'reselect';

const getSDGs = state => state.sdgs || null;
const getSearch = state => state.search || null;

export const getGoalsMapped = createSelector([getSDGs], sdgs => {
  if (!sdgs) return [];
  return Object.keys(sdgs).map(goal => ({
    label: `${goal}: ${sdgs[goal].title}`,
    value: goal,
    groupId: 'goal'
  }));
});

export const getTargetsMapped = createSelector([getSDGs], sdgs => {
  if (!sdgs) return [];
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

export const getSearchList = createSelector(
  [getGoalsMapped, getTargetsMapped],
  (goals, targets) => goals.concat(targets)
);

export const getOptionSelected = createSelector(
  [getSearchList, getSearch],
  (options, search) => {
    if (!options || !search) return null;
    if (search.searchBy === 'query') return null;
    return options.find(option => option.value === search.query);
  }
);

export default {
  getSearchList,
  getOptionSelected
};
