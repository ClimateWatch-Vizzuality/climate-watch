import { createSelector, createStructuredSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
import orderBy from 'lodash/orderBy';

const CARDS_IN_ROW = 2;
const DEFAULT_SECTOR_CODE = 'economy-wide';

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
    if (!activeSector || !sectors) return null;

    const defaultSector =
      sectors && sectors.find(sector => sector.value === DEFAULT_SECTOR_CODE);

    return (
      (sectors &&
        sectors.find(sector => sector.value === activeSector.sector)) ||
      defaultSector
    );
  }
);

export const getNdcContent = createSelector(
  [getAllTargets, getSectors, getActiveSector],
  (targets, sectors, currentSector) => {
    if (!targets) return null;
    const activeSector =
      (!isEmpty(currentSector) && currentSector.sector) ||
      (sectors &&
        sectors.find(sector => sector.value === DEFAULT_SECTOR_CODE) &&
        sectors.find(sector => sector.value === DEFAULT_SECTOR_CODE).value);

    const ndcTargets = targets.filter(target => target.doc_type === 'ndc');
    const parsedNdcsPerSector = groupBy(ndcTargets, 'sector');
    const sectorTargets = parsedNdcsPerSector[activeSector];

    if (!sectorTargets?.length) return null;

    return orderBy(sectorTargets, 'year', 'desc')[0];
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
      (sectors &&
        sectors.find(sector => sector.value === DEFAULT_SECTOR_CODE) &&
        sectors.find(sector => sector.value === DEFAULT_SECTOR_CODE).value);

    const lawsTargets = targets.filter(target =>
      ('law', 'policy').includes(target.doc_type)
    );
    const parsedLawsTargetsPerSector = groupBy(lawsTargets, 'sector');

    const groupedBySources = [];

    if (parsedLawsTargetsPerSector[activeSector]) {
      parsedLawsTargetsPerSector[activeSector].forEach(target => {
        target.sources.forEach(source => {
          groupedBySources.push({
            title: source.title
          });
        });
      });

      const groupedByTitle = groupBy(groupedBySources, 'title');
      const sourcesTitles = Object.keys(groupedByTitle);

      const groupedTargetsBySources = {};
      sourcesTitles.forEach(sourceTitle => {
        groupedTargetsBySources[sourceTitle] = { source: {}, content: [] };
      });

      sourcesTitles.forEach(sourceTitle => {
        parsedLawsTargetsPerSector[activeSector].forEach(target => {
          const sourceInfo = target.sources.find(
            source => source.title === sourceTitle
          );
          if (!isEmpty(sourceInfo)) {
            groupedTargetsBySources[sourceTitle].source = sourceInfo;
            groupedTargetsBySources[sourceTitle].content.push(target);
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
  targets.filter(target => ('law', 'policy').includes(target.doc_type))
);

const getSectorLabels = createSelector(
  [getSectors, getAllTargets],
  (sectors, targets) =>
    sectors &&
    targets &&
    sectors.map(sector => {
      const matches = targets.filter(target => target.sector === sector.value)
        .length;
      return {
        label: sector.label,
        targetsAmount: matches,
        value: sector.value
      };
    })
);

const getNationalPoliciesCount = createSelector(
  [getLawsTargets, getCurrentSector],
  (lawsTargets, currentSector) => {
    if (!lawsTargets || !currentSector) return 0;

    const targetsMatches = lawsTargets.filter(
      target => target.sector === currentSector.value
    );
    const lawsMatches = targetsMatches.reduce(
      (acc, t) => acc.concat(t.sources),
      []
    );

    return lawsMatches.length > 0 ? uniqBy(lawsMatches, 'id').length : 0;
  }
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
