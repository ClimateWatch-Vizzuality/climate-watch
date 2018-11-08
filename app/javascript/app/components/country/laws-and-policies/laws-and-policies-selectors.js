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
    const defaultSector =
      sectors && sectors.find(sector => sector.value === 'economy-wide');
    if (isEmpty(activeSector)) {
      return sectors && sectors.length && defaultSector;
    }

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

const getCountryMeta = createSelector([getIso, getData], (iso, { data }) => {
  if (!data) return null;

  return (data && data[iso] && data[iso].country_meta) || null;
});

export const getCountryProfileLink = createSelector(
  [getCountryMeta, getIso],
  (countryMeta, iso) =>
    countryMeta && countryMeta[iso] && countryMeta[iso].country_profile
);

export const getLawsAndPoliciesCount = createSelector(
  [getCountryMeta, getIso],
  (countryMeta, iso) =>
    (countryMeta && countryMeta[iso] && countryMeta[iso].lnp_count) || 0
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

const getLawsTargets = createSelector([getAllTargets], targets =>
  targets.filter(target => target.doc_type === 'law')
);

const getSectorLabels = createSelector(
  [getSectors, getLawsTargets],
  (sectors, lawTargets) =>
    sectors &&
    lawTargets &&
    sectors.map(sector => {
      const matches = lawTargets.filter(
        target => target.sector === sector.value
      ).length;
      let labelText = '';
      if (matches) {
        labelText =
          matches === 1
            ? `${sector.label} (${matches} target)`
            : `${sector.label} (${matches} targets)`;
      } else {
        labelText = `${sector.label} (no targets)`;
      }
      return {
        label: labelText,
        value: sector.value
      };
    })
);

const getNationalPoliciesCount = createSelector(
  [getLawsTargets, getCurrentSector],
  (lawsTargets, currentSector) =>
    lawsTargets.filter(target => target.sector === currentSector.value).length
);

export const getCardsInRow = () => CARDS_IN_ROW;

export const getAllData = createStructuredSelector({
  sectors: getSectorLabels,
  ndcContent: getNdcContent,
  lawsTargets: getLawsAndPolicies,
  currentSector: getCurrentSector,
  countryProfileLink: getCountryProfileLink,
  lawsAndPoliciesCount: getLawsAndPoliciesCount,
  nationalPoliciesCount: getNationalPoliciesCount
});
