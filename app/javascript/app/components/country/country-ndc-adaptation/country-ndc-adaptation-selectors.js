import { createSelector } from 'reselect';
import upperFirst from 'lodash/upperFirst';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';
import _camelCase from 'lodash/camelCase';

import {
  DATABASES_OPTIONS,
  GOALS_COLORS
} from './country-ndc-adaptation-constants';

const getSectors = (state, search) =>
  (state.ndcsAdaptations.data?.sectors || []).filter(
    ({ sector_type: sectorType }) =>
      sectorType === (search?.database || DATABASES_OPTIONS[0].value)
  );
const getActions = state => state.ndcsAdaptations.data?.actions || [];
const getClimateCommitments = state =>
  state.ndcsAdaptations.data?.documents || [];

const getSelectedCommitment = state =>
  state.countryNDCSAdaptation.filters.commitment;

export const getActiveCommitment = createSelector(
  [getClimateCommitments, getSelectedCommitment],
  (_commitments, _selectedCommitment) => {
    let activeCommitment =
      _commitments.find(({ ordering }) => ordering === 1) || {};

    if (_selectedCommitment) {
      const foundCommitment = _commitments.find(
        ({ id }) => id === _selectedCommitment
      );

      if (foundCommitment) activeCommitment = foundCommitment;
    }

    return {
      label: activeCommitment.long_name,
      value: activeCommitment.id
    };
  }
);

export const getActiveDatabase = search =>
  DATABASES_OPTIONS.find(({ value }) => value === search?.database) ||
  DATABASES_OPTIONS[0];

export const getGoals = createSelector([getSectors], sectors =>
  sectors.map(({ id, name }, index) => ({
    id,
    cw_title: name,
    number: index + 1,
    colour: GOALS_COLORS[_camelCase(name)]
  }))
);

export const getTargets = createSelector([getSectors], sectors =>
  sectors.reduce(
    (acc, next, index) => ({
      ...acc,
      [index + 1]: next.subsectors.map(({ id, name }, subsectorIndex) => ({
        id,
        number: `${index + 1}.${subsectorIndex + 1}`,
        goal_number: index + 1,
        title: name
      }))
    }),
    {}
  )
);

const formatTargetsByCountry = (
  goals,
  targets,
  _actions,
  goalNumber,
  _commitment
) => {
  const goalsWithTargets = Object.values(targets);
  const targetWithActions = goalsWithTargets
    .map(_targets => _targets)
    .reduce(
      (acc, next) => [...acc, ...next.map(_n => ({ ..._n, actions: [] }))],
      []
    );

  const targetIds = targetWithActions.map(({ id }) => id);

  _actions
    .filter(({ document_id: documentId }) => _commitment === documentId)
    .forEach(_action => {
      if (_action.sector_ids?.length) {
        _action.sector_ids.forEach(_subsectorId => {
          if (targetIds.includes(_subsectorId)) {
            const currentTarget = targetWithActions.find(
              ({ id }) => _subsectorId === id
            );
            if (currentTarget) {
              const targetIndex = targetWithActions.findIndex(
                ({ id }) => _subsectorId === id
              );

              if (
                targetIndex !== -1 &&
                currentTarget.goal_number === goalNumber
              ) {
                targetWithActions[targetIndex] = {
                  ...targetWithActions[targetIndex],
                  actions: [...targetWithActions[targetIndex].actions, _action]
                };
              }
            }
          }
        });
      }
    });

  return Object.values(
    groupBy(
      targetWithActions.filter(({ actions: _acts }) => _acts.length),
      'goal_number'
    )
  ).reduce((_acc, _next) => {
    const reduced = _next.reduce(
      (_a, _n) => ({ ..._a, [_n.number]: { ..._n } }),
      {}
    );
    return {
      ..._acc,
      ...reduced
    };
  }, {});
};

export const getTargetsByCountry = createSelector(
  [getGoals, getTargets, getActions, getSelectedCommitment],
  (goals, targets, _actions, _commitment) =>
    goals.reduce(
      (acc, next) => ({
        ...acc,
        [next.number]: {
          targets: formatTargetsByCountry(
            goals,
            targets,
            _actions,
            next.number,
            _commitment
          ),
          title: next.cw_title
        }
      }),
      {}
    )
);

export const getCommitmentOptions = createSelector(
  [getClimateCommitments],
  commitments =>
    Object.keys(sortBy(commitments, 'ordering')).map(_commitment => ({
      label: upperFirst(commitments[_commitment].long_name),
      value: commitments[_commitment].id
    }))
);
