import { createSelector } from 'reselect';
import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';
import snakeCase from 'lodash/snakeCase';

const getIndicators = state =>
  (state.customCompareAccordion && state.customCompareAccordion.data
    ? state.customCompareAccordion.data.indicators
    : {});
const getCategories = state =>
  (state.customCompareAccordion && state.customCompareAccordion.data
    ? state.customCompareAccordion.data.categories
    : {});
const getSectors = state =>
  (state.customCompareAccordion && state.customCompareAccordion.data
    ? state.customCompareAccordion.data.sectors
    : {});
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

export const getSelectedCountries = createSelector([getSearch], search => {
  if (!search) return null;
  const queryTargets = search.targets ? search.targets.split(',') : [];
  return [1, 2, 3].map((value, i) => {
    const target =
      queryTargets && queryTargets[i] && queryTargets[i].split('-');
    const country = target && target[0];
    return country;
  });
});

export const parseIndicatorsDefs = createSelector(
  [getIndicators, getSelectedCategoryKeys, getSelectedCountries],
  (indicators, categoryKeys, selectedCountries) => {
    if (!indicators || !categoryKeys || !selectedCountries) return null;
    const parsedIndicators = {};
    categoryKeys.forEach(category => {
      const categoryIndicators = indicators.filter(
        indicator => indicator.category_ids.indexOf(parseInt(category, 10)) > -1
      );
      const parsedDefinitions = categoryIndicators.map(def => {
        const descriptions = selectedCountries.map(isoCode3 => ({
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

// data for section 'Overview', 'Mitigation', 'Adaptation'
export const getData = createSelector(
  [getCategories, getSelectedCategoryKeys, parseIndicatorsDefs],
  (categories, categoriesKeys, indicators) => {
    if (!categories || !categoriesKeys || !indicators) return [];
    const ndcs = categoriesKeys.map(category => ({
      title: categories[category].name,
      slug: categories[category].slug,
      definitions: indicators[category] ? indicators[category] : []
    }));
    return ndcs;
  }
);

export const groupIndicatorsByCategory = createSelector(
  [getIndicators, getCategories, getSelectedCategoryKeys],
  (indicators, categories, selectedCategoryKeys) => {
    if (!indicators || !categories || !selectedCategoryKeys) return null;
    return selectedCategoryKeys
      .map(cat => ({
        ...categories[cat],
        indicators: indicators.filter(
          ind => ind.category_ids.indexOf(parseInt(cat, 10)) > -1
        )
      }))
      .filter(cat => cat.indicators.length);
  }
);

export const getCategoriesWithSectors = createSelector(
  [groupIndicatorsByCategory],
  categories => {
    if (!categories) return null;
    return categories.map(cat => {
      const sectorIds = [];
      cat.indicators.forEach(ind => {
        Object.keys(ind.locations).forEach(location => {
          ind.locations[location].forEach(
            value => value.sector_id && sectorIds.push(value.sector_id)
          );
        });
      });
      return {
        ...cat,
        sectors: sectorIds.length ? uniq(sectorIds) : null
      };
    });
  }
);

// data for section 'SectoralInformation'
export const getSectoralInformationData = createSelector(
  [getCategoriesWithSectors, getSectors, getSelectedCountries],
  (categories, sectors, selectedCountries) => {
    if (!categories || !sectors || !selectedCountries) return [];
    return categories.map(cat => {
      const sectorsParsed = sortBy(
        cat.sectors &&
          cat.sectors.length &&
          cat.sectors.map(sec => {
            const definitions = [];
            cat.indicators.forEach(ind => {
              const descriptions = selectedCountries.map(loc => {
                const valueObject = ind.locations[loc]
                  ? ind.locations[loc].find(v => v.sector_id === sec)
                  : null;
                const value =
                  (valueObject && valueObject.value) ||
                  (isNaN(parseInt(loc, 10)) ? '-' : null);
                return {
                  iso: loc,
                  value
                };
              });
              definitions.push({
                title: ind.name,
                slug: ind.slug,
                descriptions
              });
            });
            const parent =
              sectors[sec].parent_id && sectors[sectors[sec].parent_id];
            return {
              title: sectors[sec].name,
              slug: snakeCase(sectors[sec].name),
              parent,
              definitions
            };
          }),
        ['parent.name', 'title']
      );
      return {
        title: cat.name,
        slug: cat.slug,
        sectors: sectorsParsed
      };
    });
  }
);
