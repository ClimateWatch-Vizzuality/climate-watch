import { createSelector } from 'reselect';

const getNdcsSdgsGoals = state => {
  if (!state.data) return null;
  return state.data.goals;
};

export const parsedNdcsSdgs = createSelector(getNdcsSdgsGoals, goals => {
  if (!goals) return [];
  const parsedGoals = goals.map(goal => ({
    id: goal.id,
    title: goal.cw_title,
    number: parseInt(goal.number, 10)
  }));
  parsedGoals.push({ title: 'empty to have round number of elements' });
  return parsedGoals;
});

export default {
  parsedNdcsSdgs
};
