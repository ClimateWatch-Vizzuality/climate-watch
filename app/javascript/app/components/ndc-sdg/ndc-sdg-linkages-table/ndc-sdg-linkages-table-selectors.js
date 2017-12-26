import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';

const getGoals = state => state.meta.goals || null;
const getTargets = state => state.meta.targets || null;
const getSelectedGoal = state => parseInt(state.selectedGoal, 10) || null;

export const getTargetsByGoal = createSelector(getTargets, targets => {
  if (!targets) return null;
  return groupBy(targets, 'goal_number');
});

export const getParsedGoals = createSelector(
  [getGoals, getTargetsByGoal],
  (goals, targets) => {
    if (!goals || !targets) return null;
    const parsedGoals = goals.map(goal => ({
      id: goal.id,
      title: goal.cw_title,
      colour: goal.colour,
      number: parseInt(goal.number, 10),
      targets: sortBy(targets[goal.number], 'number')
    }));
    // pushing an extra empty goal to have a round number of elements
    parsedGoals.push({ title: '' });
    return parsedGoals;
  }
);

export const getGoalSelected = createSelector(
  [getParsedGoals, getSelectedGoal],
  (goals, selected) => {
    if (!goals || !selected) return null;
    return goals.find(g => g.number === selected);
  }
);

export default {
  getParsedGoals,
  getGoalSelected
};
