import { createSelector } from 'reselect';
import { uniq, sortBy, groupBy, orderBy, snakeCase } from 'lodash';

const getIndicators = state =>
  state.customCompareAccordion && state.customCompareAccordion.data
    ? state.customCompareAccordion.data.indicators
    : {};
const getCategories = state =>
  state.customCompareAccordion && state.customCompareAccordion.data
    ? state.customCompareAccordion.data.categories
    : {};
const getSectors = state =>
  state.customCompareAccordion && state.customCompareAccordion.data
    ? state.customCompareAccordion.data.sectors
    : {};
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
    return Object.keys(categories).reduce((acc, category) => {
      if (indicators[category] && indicators[category].length) {
        acc.push({
          title: categories[category].name,
          slug: categories[category].slug,
          definitions: indicators[category] ? indicators[category] : []
        });
      }
      return acc;
    }, []);
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
          cat.sectors.reduce((acc, sector) => {
            const definitions = [];
            cat.indicators.forEach((ind, indIndex) => {
              const values = selectedTargets.reduce(
                (accV, { country, document }) => [
                  ...accV,
                  ...(ind.locations[country] || [])
                    .filter(
                      v =>
                        v.sector_id === sector && v.document_slug === document
                    )
                    .map(v => ({ ...v, country }))
                ],
                []
              );
              const countries = uniq(
                selectedTargets.map(({ country }) => country)
              );

              Object.entries(groupBy(values, 'group_index')).forEach(
                ([groupIndex, groupIndexValues]) => {
                  const descriptions = [];
                  countries.forEach(country => {
                    const valueObject = groupIndexValues.find(
                      v => v.country === country
                    );
                    const value =
                      (valueObject && valueObject.value) ||
                      (isNaN(parseInt(country, 10)) ? '-' : null);
                    descriptions.push({ iso: country, value });
                  });
                  const anyDescriptions =
                    descriptions.filter(d => d.value && d.value !== '-')
                      .length > 0;

                  if (anyDescriptions) {
                    definitions.push({
                      title: ind.name,
                      slug: ind.slug,
                      separator: ind.grouping_indicator && groupIndex > 1,
                      indIndex,
                      groupIndex,
                      descriptions
                    });
                  }
                }
              );
            });
            const sectorObj = sectors[sector];
            const parent = sectorObj.parent_id && sectors[sectorObj.parent_id];
            // place titles with "General" word at first place in subsector's order
            const order = sectorObj.name.toLowerCase().includes('general')
              ? `!${sectorObj.name}`
              : sectorObj.name;

            if (definitions && definitions.length) {
              acc.push({
                title: sectorObj.name,
                slug: snakeCase(sectorObj.name),
                order,
                parent,
                definitions: orderBy(definitions, ['groupIndex', 'indIndex'])
              });
            }
            return acc;
          }, []),
        ['parent.name', 'order']
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
