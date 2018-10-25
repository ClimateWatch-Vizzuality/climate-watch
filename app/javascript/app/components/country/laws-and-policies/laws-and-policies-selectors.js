import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';

const CARDS_IN_ROW = 2;

const getIso = state => state.iso || null;

const getData = state => state.lawsAndPolicies || null;

const getActiveSector = state => state.activeSector;

export const getSectors = createSelector([getIso, getData], (iso, { data }) => {
  const sectors = (data && data[iso] && data[iso].sectors) || [];
  const parsedSectors = sectors.map(sector => ({
    label: sector.title,
    value: sector.key
  }));

  return parsedSectors;
});

export const getCurrentSector = createSelector(
  [getActiveSector, getSectors],
  (activeSector, sectors) => {
    if (isEmpty(activeSector)) return sectors[0];

    return sectors.find(sector => sector.value === activeSector.sector);
  }
);

export const getNdcContent = createSelector(
  [getIso, getData, getSectors, getActiveSector],
  (iso, { data }, sectors, currentSector) => {
    if (!data) return null;
    const activeSector =
      (!isEmpty(currentSector) && currentSector.sector) || sectors[0];

    const targets = (data && data[iso] && data[iso].targets) || [];
    const ndcTargets = targets.filter(target => target.doc_type === 'ndc');
    const parsedNdcsPerSector = groupBy(ndcTargets, 'sector');

    return (
      parsedNdcsPerSector[activeSector] &&
      parsedNdcsPerSector[activeSector].length &&
      parsedNdcsPerSector[activeSector][0]
    );
  }
);

export const getAllLawsAndPolicies = createSelector(
  [getIso, getData],
  (iso, { data }) => {
    if (!data) return null;

    const allTargets = (data && data[iso] && data[iso].targets) || [];
    return allTargets.filter(target => target.doc_type === 'law');
  }
);

export const getCountryProfileLink = createSelector(
  [getIso, getData],
  (iso, { data }) => {
    if (!data) return null;

    const countryMeta = data && data[iso] && data[iso].country_meta;
    return countryMeta && countryMeta[iso] && countryMeta[iso].country_profile;
  }
);

export const getLawsAndPolicies = createSelector(
  [getIso, getData, getSectors, getActiveSector],
  (iso, { data }, sectors, currentSector) => {
    if (!data) return null;
    const activeSector =
      (!isEmpty(currentSector) && currentSector.sector) || sectors[0];

    const allTargets = (data && data[iso] && data[iso].targets) || [];
    const lawsTargets = allTargets.filter(target => target.doc_type === 'law');
    const parsedLawsTargetsPerSector = groupBy(lawsTargets, 'sector');

    const groupedBySources = [];

    if (parsedLawsTargetsPerSector[activeSector]) {
      parsedLawsTargetsPerSector[activeSector].forEach(target => {
        target.sources.forEach(source => {
          groupedBySources.push({
            id: source.id
          });
        });
      });

      const groupedById = groupBy(groupedBySources, 'id');
      const sourcesIds = Object.keys(groupedById);

      const groupedTargetsBySources = {};
      sourcesIds.forEach(sourceId => {
        groupedTargetsBySources[sourceId] = { source: {}, content: [] };
      });

      sourcesIds.forEach(sourceId => {
        parsedLawsTargetsPerSector[activeSector].forEach(target => {
          const sourceInfo = target.sources.find(
            source => source.id === sourceId
          );
          if (!isEmpty(sourceInfo)) {
            groupedTargetsBySources[sourceId].source = sourceInfo;
            groupedTargetsBySources[sourceId].content.push(target);
          }
        });
      });

      const targetsParsed = Object.values(groupedTargetsBySources);

      const groupedTargetsParsed = targetsParsed.map(target => ({
        source: target.source,
        content: groupBy(target.content, 'type')
      }));

      return groupedTargetsParsed;
    }

    return [];
  }
);

export const getLawsAndPoliciesForCurrentSector = createSelector(
  [getLawsAndPolicies],
  lawsAndPoliciesPerSector => lawsAndPoliciesPerSector.energy
);

export const getCardsInRow = () => CARDS_IN_ROW;
