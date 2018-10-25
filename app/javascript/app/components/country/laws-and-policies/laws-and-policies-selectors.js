import { createSelector, createStructuredSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';

const CARDS_IN_ROW = 2;

const getIso = state => state.iso || null;

const getData = state => state.lawsAndPolicies || null;

const getActiveSector = state => state.activeSector;

export const getSectors = createSelector([getIso, getData], (iso, { data }) => {
  const sectors = (data && data[iso] && data[iso].sectors) || null;
  const parsedSectors =
    sectors &&
    sectors.map(sector => ({
      label: sector.title,
      value: sector.key
    }));

  return parsedSectors;
});

const getAllTargets = createSelector(
  [getIso, getData],
  (iso, { data }) => (data && data[iso] && data[iso].targets) || []
);

export const getCurrentSector = createSelector(
  [getActiveSector, getSectors],
  (activeSector, sectors) => {
    if (isEmpty(activeSector)) return sectors && sectors[0];

    return (
      sectors && sectors.find(sector => sector.value === activeSector.sector)
    );
  }
);

export const getNdcContent = createSelector(
  [getAllTargets, getSectors, getActiveSector],
  (targets, sectors, currentSector) => {
    if (!targets) return null;
    const activeSector =
      (!isEmpty(currentSector) && currentSector.sector) ||
      (sectors && sectors[0]);

    const ndcTargets = targets.filter(target => target.doc_type === 'ndc');
    const parsedNdcsPerSector = groupBy(ndcTargets, 'sector');

    return (
      parsedNdcsPerSector[activeSector] &&
      parsedNdcsPerSector[activeSector].length &&
      parsedNdcsPerSector[activeSector][0]
    );
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
  [getAllTargets, getSectors, getActiveSector],
  (targets, sectors, currentSector) => {
    if (!targets) return null;
    const activeSector =
      (!isEmpty(currentSector) && currentSector.sector) ||
      (sectors && sectors[0]);

    const lawsTargets = targets.filter(target => target.doc_type === 'law');
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

export const getAllData = createStructuredSelector({
  sectors: getSectors,
  ndcContent: getNdcContent,
  lawsTargets: getLawsAndPolicies,
  currentSector: getCurrentSector,
  countryProfileLink: getCountryProfileLink
});
