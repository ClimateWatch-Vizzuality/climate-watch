import { createSelector } from 'reselect';
import { uniq, sortBy, snakeCase } from 'lodash';

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
export const getSelectedTargets = (state, { targets }) => targets;

export const parseIndicatorsDefs = createSelector(
  [getIndicators, getCategories, getSelectedTargets],
  (indicators, categories, selectedTargets) => {
    if (!indicators || !categories || !selectedTargets) return null;
    const parsedIndicators = {};
    Object.keys(categories).forEach(category => {
      const categoryIndicators = indicators.filter(
        indicator => indicator.category_ids.indexOf(parseInt(category, 10)) > -1
      );
      const parsedDefinitions = categoryIndicators.map(def => {
        const descriptions = selectedTargets.map(({ country, document }) => {
          const valueByDocument = def.locations[country]
            ? def.locations[country].find(
              ({ document_slug }) => document_slug === document
            )
            : null;
          return {
            iso: country,
            value: valueByDocument ? valueByDocument.value : '-'
          };
        });
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
  [getCategories, parseIndicatorsDefs],
  (categories, indicators) => {
    if (!categories || !indicators) return null;
    const ndcs = Object.keys(categories).map(category => ({
      title: categories[category].name,
      slug: categories[category].slug,
      definitions: indicators[category] ? indicators[category] : []
    }));
    return ndcs;
  }
);

export const groupIndicatorsByCategory = createSelector(
  [getIndicators, getCategories],
  (indicators, categories) => {
    if (!indicators || !categories) return null;
    return Object.keys(categories)
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
  [getCategoriesWithSectors, getSectors, getSelectedTargets],
  (categoriesWithSectors, sectors, selectedTargets) => {
    if (!categoriesWithSectors || !sectors || !selectedTargets) return null;
    const sectoralInformationData = categoriesWithSectors.map(cat => {
      const sectorsParsed = sortBy(
        cat.sectors &&
          cat.sectors.length &&
          cat.sectors.map(sec => {
            const definitions = [];
            cat.indicators.forEach(ind => {
              const descriptions = selectedTargets.map(
                ({ country, document }) => {
                  const valueObject = ind.locations[country]
                    ? ind.locations[country].find(
                      v => v.sector_id === sec && v.document_slug === document
                    )
                    : null;
                  const value =
                    (valueObject && valueObject.value) ||
                    (isNaN(parseInt(country, 10)) ? '-' : null);
                  return {
                    iso: country,
                    value
                  };
                }
              );
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
    const sectoralInformationDataWithSectors = sectoralInformationData.filter(
      ({ sectors: _sectors }) => _sectors && _sectors.length
    );
    return sectoralInformationDataWithSectors;
  }
);
