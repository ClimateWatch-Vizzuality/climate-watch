import { createSelector } from 'reselect';

const getIndicators = state =>
  (state.customCompareAccordion && state.customCompareAccordion.data
    ? state.customCompareAccordion.data.indicators
    : {});
const getCategories = state =>
  (state.customCompareAccordion && state.customCompareAccordion.data
    ? state.customCompareAccordion.data.categories
    : {});
// const getSectors = state => (state.customCompareAccordion && state.customCompareAccordion.data ? state.customCompareAccordion.data.sectors : {});
const getSearch = (state, { search }) => search;
const getSelectedSection = (state, { category }) => category;

export const getSelectedCategoryKeys = createSelector(
  [getCategories, getSelectedSection],
  (categories, selectedSection) => {
    if (!categories || !selectedSection) return null;
    return Object.keys(categories).filter(
      key => categories[key].type !== 'map'
    );
  }
);

export const getSelectedTargets = createSelector([getSearch], search => {
  if (!search) return null;
  const queryTargets = search.targets ? search.targets.split(',') : [];
  return [1, 2, 3].map((value, i) => {
    // targets are saved as a string 'ISO3-DOCUMENT', e.g. 'USA-NDC'
    const target =
      queryTargets && queryTargets[i] && queryTargets[i].split('-');
    const country = target && target[0];
    // const document = target && target[1];
    return country;
  });
});

export const parseIndicatorsDefs = createSelector(
  [getIndicators, getSelectedCategoryKeys, getSelectedTargets],
  (indicators, categoryKeys, selectedTargets) => {
    if (!indicators || !categoryKeys || !selectedTargets) return null;
    const parsedIndicators = {};
    categoryKeys.forEach(category => {
      const categoryIndicators = indicators.filter(
        indicator => indicator.category_ids.indexOf(parseInt(category, 10)) > -1
      );
      const parsedDefinitions = categoryIndicators.map(def => {
        const descriptions = selectedTargets.map(isoCode3 => ({
          iso: isoCode3,
          value: def.locations[isoCode3]
            ? def.locations[isoCode3][0].value
            : '-'
        }));
        return {
          title: def.name,
          slug: def.slug,
          descriptions
        };
      });
      if (parsedDefinitions && parsedDefinitions.length) {
        parsedIndicators[category] = parsedDefinitions;
      }
    });
    return parsedIndicators;
  }
);

export const getNDCs = createSelector(
  [getCategories, getSelectedCategoryKeys, parseIndicatorsDefs],
  (categories, categoriesKeys, indicators) => {
    if (!categories) return null;
    if (!indicators) return null;
    const ndcs = categoriesKeys.map(category => ({
      title: categories[category].name,
      slug: categories[category].slug,
      definitions: indicators[category] ? indicators[category] : []
    }));
    return ndcs;
  }
);

export const getData = createSelector([getNDCs], ndcData => {
  if (!ndcData) return [];
  return ndcData;
});
