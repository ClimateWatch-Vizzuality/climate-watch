import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import _camelCase from 'lodash/camelCase';

import {
  DATABASES_OPTIONS,
  SECTORS_COLORS
} from './country-ndc-adaptation-constants';

const getDatabase = ({ search }) => search?.database || null;
const getAdaptationSectors = state =>
  state.ndcsAdaptations.data?.sectors || null;
const getActions = state => state.ndcsAdaptations.data?.actions || [];
const getCountryDocuments = state => state.countriesDocuments.data || [];
const getIso = ({ iso }) => iso || null;

const getSelectedDocumentId = state =>
  state.countryNDCSAdaptation.filters.document;

export const getActiveDatabase = createSelector(
  [getDatabase],
  database =>
    DATABASES_OPTIONS.find(({ value }) => value === database) ||
    DATABASES_OPTIONS[0]
);

const getDatabaseSectors = createSelector(
  [getDatabase, getAdaptationSectors],
  (database, sectors) => {
    if (!sectors) return null;
    return sectors.filter(sector =>
      database
        ? sector.sector_type === database
        : sector.sector_type === DATABASES_OPTIONS[0].value
    );
  }
);

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
  [getDocuments, getSelectedDocumentId],
  (_documents = [], selectedDocument) => {
    if (!selectedDocument) return null;
    return _documents.find(({ value }) => value === selectedDocument);
  }
);

export const getSectors = createSelector([getDatabaseSectors], sectors => {
  if (!sectors) return null;
  return sectors.map(({ id, name }, index) => ({
    id,
    cw_title: name,
    number: index + 1,
    colour: SECTORS_COLORS[_camelCase(name)]
  }));
});

export const getTargets = createSelector([getDatabaseSectors], sectors => {
  if (!sectors) return null;
  return sectors.reduce(
    (acc, next, index) => ({
      ...acc,
      [index + 1]: next.subsectors.map(({ id, name }, subsectorIndex) => ({
        id,
        number: `${index + 1}.${subsectorIndex + 1}`,
        sectorNumber: index + 1,
        subSectorId: id,
        sectorId: next.id,
        title: name
      }))
    }),
    {}
  );
});

const formatSectorTargets = (targets, actions, sectorId, documentId) => {
  // First populate targets with an empty actions array
  const targetsWithActions = Object.values(targets).reduce(
    (acc, target) => [...acc, ...target.map(_n => ({ ..._n, actions: [] }))],
    []
  );

  // Add action to targetsWithActions actions if matches with the document and sub-sector ids
  actions
    .filter(
      action => documentId === action.document_id && action.sector_ids?.length
    )
    .forEach(action => {
      // Sector ids are actually subsector ids
      action.sector_ids.forEach(subSectorId => {
        const currentTarget = targetsWithActions.find(
          target => subSectorId === target.subSectorId
        );
        if (currentTarget) {
          const targetIndex = targetsWithActions.indexOf(currentTarget);
          if (currentTarget.sectorId === sectorId) {
            targetsWithActions[targetIndex] = {
              ...targetsWithActions[targetIndex],
              actions: [...targetsWithActions[targetIndex].actions, action]
            };
          }
        }
      });
    });

  const targetsWithActionsBySectorNumber = Object.values(
    groupBy(
      targetsWithActions.filter(t => t.actions.length),
      'sectorNumber'
    )
  );
  return targetsWithActionsBySectorNumber.reduce((acc, next) => {
    const reduced = next.reduce((a, n) => ({ ...a, [n.number]: { ...n } }), {});
    return {
      ...acc,
      ...reduced
    };
  }, {});
};

export const getSectorTargets = createSelector(
  [getSectors, getTargets, getActions, getSelectedDocumentId],
  (sectors, targets, actions, documentId) => {
    if (!sectors) return null;
    return sectors.reduce(
      (acc, sector) => ({
        ...acc,
        [sector.number]: {
          targets: formatSectorTargets(targets, actions, sector.id, documentId),
          title: sector.cw_title
        }
      }),
      {}
    );
  }
);
