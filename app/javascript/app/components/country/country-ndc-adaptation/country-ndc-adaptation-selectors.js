import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import _camelCase from 'lodash/camelCase';

import {
  DATABASES_OPTIONS,
  SECTORS_COLORS
} from './country-ndc-adaptation-constants';

const getRawSectors = (state, search) =>
  (state.ndcsAdaptations.data?.sectors || []).filter(
    ({ sector_type: sectorType }) =>
      sectorType === (search?.database || DATABASES_OPTIONS[0].value)
  );
const getActions = state => state.ndcsAdaptations.data?.actions || [];

const getIso = (state, props) => props?.iso || null;
const getCountryDocuments = state => state.countriesDocuments.data || [];

const getSelectedDocument = state =>
  state.countryNDCSAdaptation.filters.document;

export const getDocuments = createSelector(
  [getCountryDocuments, getIso],
  (_documents, _iso) =>
    uniqBy(
      sortBy(
        (_documents[_iso] || []).filter(({ is_ndc }) => is_ndc),
        'ordering'
      ).map(({ long_name, id, slug }) => ({
        label: long_name,
        value: id,
        slug
      })),
      'slug'
    ).reverse()
);

export const getActiveDocument = createSelector(
  [getDocuments, getSelectedDocument],
  (_documents = [], _selectedDocument) => {
    if (!_selectedDocument) return null;
    return _documents.find(({ value }) => value === _selectedDocument);
  }
);

export const getActiveDatabase = search =>
  DATABASES_OPTIONS.find(({ value }) => value === search?.database) ||
  DATABASES_OPTIONS[0];

export const getSectors = createSelector([getRawSectors], sectors =>
  sectors.map(({ id, name }, index) => ({
    id,
    cw_title: name,
    number: index + 1,
    colour: SECTORS_COLORS[_camelCase(name)]
  }))
);

export const getTargets = createSelector([getRawSectors], sectors => {
  if (!sectors) return null;
  return sectors.reduce(
    (acc, next, index) => ({
      ...acc,
      [index + 1]: next.subsectors.map(({ id, name }, subsectorIndex) => ({
        id,
        number: `${index + 1}.${subsectorIndex + 1}`,
        sectorNumber: index + 1,
        title: name
      }))
    }),
    {}
  );
});

const formatTargetsByCountry = (targets, _actions, sectorNumber, _document) => {
  const goalsWithTargets = Object.values(targets);
  const targetWithActions = goalsWithTargets
    .map(_targets => _targets)
    .reduce(
      (acc, next) => [...acc, ...next.map(_n => ({ ..._n, actions: [] }))],
      []
    );

  const targetIds = targetWithActions.map(({ id }) => id);

  _actions
    .filter(({ document_id: documentId }) => _document === documentId)
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
                currentTarget.sectorNumber === sectorNumber
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
      'sectorNumber'
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
  [getSectors, getTargets, getActions, getSelectedDocument],
  (goals, targets, _actions, _document) =>
    goals.reduce(
      (acc, next) => ({
        ...acc,
        [next.number]: {
          targets: formatTargetsByCountry(
            targets,
            _actions,
            next.number,
            _document
          ),
          title: next.cw_title
        }
      }),
      {}
    )
);
