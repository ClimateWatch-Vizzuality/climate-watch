import { createSelector } from 'reselect';
import { deburrUpper } from 'app/utils';
import upperFirst from 'lodash/upperFirst';

const getSectors = state => state.sectors || null;
const getTargets = state => state.targets || null;
const getGoals = state => state.goals || null;
const getQuery = state => state.query;
const getQueryValues = state => state.queryParams || null;

export const getQueryUpper = state => deburrUpper(state.query);

export const getSectorsMapped = createSelector([getSectors], sectors => {
  if (!sectors) return [];
  return sectors.map(sector => ({
    label: upperFirst(sector.name),
    value: sector.id.toString(),
    groupId: 'sector'
  }));
});

export const getGoalsMapped = createSelector([getGoals], goals => {
  if (!goals) return [];
  return goals.map(goal => ({
    label: `SDG ${goal.number}: ${goal.title}`,
    value: goal.number,
    groupId: 'goal'
  }));
});

export const getTargetsMapped = createSelector([getTargets], targets => {
  if (!targets) return [];
  return targets.map(target => ({
    label: `${target.number}: ${target.title}`,
    value: target.number,
    groupId: 'target'
  }));
});

export const getSearchList = createSelector(
  [getSectorsMapped, getGoalsMapped, getTargetsMapped, getQuery],
  (sectors, goals, targets, query) => {
    const searchOptions = sectors.concat(goals, targets);
    searchOptions.push({
      label: `Search ${query} in document`,
      value: query,
      groupId: 'search'
    });
    return searchOptions;
  }
);

export const getOptionSelected = createSelector(
  [getSearchList, getQueryValues],
  (options, queryValues) => {
    if (!options || !queryValues) return null;
    if (queryValues.search) {
      return {
        label: queryValues.search,
        value: queryValues.search
      };
    }
    return options.find(
      option =>
        option.value === queryValues.sector ||
        option.value === queryValues.goal ||
        option.value === queryValues.target
    );
  }
);

export default {
  getQueryUpper,
  getSearchList,
  getOptionSelected
};
