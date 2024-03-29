import { createSelector } from 'reselect';
import { deburrUpper } from 'app/utils';
import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import snakeCase from 'lodash/snakeCase';

const getCountries = state => state.countries;
const getAllIndicators = state => (state.data ? state.data.indicators : {});
const getCategories = state => (state.data ? state.data.categories : {});
const getSectors = state => (state.data ? state.data.sectors : {});
const getSearch = (state, { search }) =>
  search ? deburrUpper(search.search) : null;
const getSearchDocument = (state, { search }) =>
  (search && search.document) || null;
const getDocuments = state => state.documents && state.documents.data;

export const getDocumentSlug = createSelector(
  [getDocuments, getSearchDocument],
  (documents, searchDocument) => {
    if (!searchDocument || !documents) {
      return null;
    }
    const selectedDocument = Object.values(documents).find(
      d => d.slug === searchDocument.split('-')[0]
    );
    if (selectedDocument) return selectedDocument.slug;
    const documentValues = Object.values(documents);
    const lastDocument = documentValues[documentValues.length - 1];
    return (lastDocument && lastDocument.slug) || null;
  }
);

export const parseIndicatorsDefs = createSelector(
  [getAllIndicators, getCategories, getCountries],
  (indicators, categories, countries) => {
    if (!indicators || !categories || !countries) return null;
    const parsedIndicators = {};
    Object.keys(categories).forEach(category => {
      const categoryIndicators = indicators.filter(
        indicator => indicator.category_ids.indexOf(parseInt(category, 10)) > -1
      );
      const parsedDefinitions = categoryIndicators.map(def => {
        const descriptions = countries.reduce((acc, country) => {
          if (def.locations[country]) {
            return [
              ...acc,
              {
                iso: country,
                value: def.locations[country][0].value
              }
            ];
          }
          return acc;
        }, []);
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

export const groupIndicatorsByCategory = createSelector(
  [getAllIndicators, getCategories],
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

export const parsedCategoriesWithSectors = createSelector(
  [getCategoriesWithSectors, getSectors, getCountries],
  (categories, sectors, countries) => {
    if (!categories) return null;
    return categories.map(cat => {
      const sectorsParsed = sortBy(
        cat.sectors &&
          cat.sectors.length &&
          cat.sectors.map(sec => {
            const definitions = [];
            cat.indicators.forEach((ind, indIndex) => {
              const values = countries.reduce(
                (acc, loc) => [
                  ...acc,
                  ...(ind.locations[loc] || [])
                    .filter(v => v.sector_id === sec)
                    .map(v => ({ ...v, loc }))
                ],
                []
              );
              Object.entries(groupBy(values, 'group_index')).forEach(
                ([groupIndex, groupIndexValues]) => {
                  const descriptions = [];
                  countries.forEach(loc => {
                    const value = groupIndexValues.find(v => v.loc === loc);
                    if (value) {
                      descriptions.push({ iso: loc, value: value.value });
                    }
                  });
                  definitions.push({
                    title: ind.name,
                    slug: ind.slug,
                    separator: ind.grouping_indicator && groupIndex > 1,
                    indIndex,
                    groupIndex,
                    descriptions
                  });
                }
              );
            });
            const sector = sectors[sec];
            const parent = sector.parent_id && sectors[sector.parent_id];
            // place titles with "General" word at first place in subsector's order
            const order = sector.name.toLowerCase().includes('general')
              ? `!${sector.name}`
              : sector.name;

            return {
              title: sector.name,
              slug: snakeCase(sector.name),
              order,
              parent,
              definitions: orderBy(definitions, ['groupIndex', 'indIndex'])
            };
          }),
        ['parent.name', 'order']
      );
      return {
        title: cat.name,
        slug: cat.slug,
        sectors: sectorsParsed
      };
    });
  }
);

export const getNDCs = createSelector(
  [getCategories, parseIndicatorsDefs],
  (categories, indicators) => {
    if (!categories) return null;
    if (!indicators) return null;
    const ndcs = Object.keys(categories).map(category => ({
      title: categories[category].name,
      slug: categories[category].slug,
      definitions: indicators[category] ? indicators[category] : []
    }));
    return ndcs;
  }
);

export const filterNDCs = createSelector(
  [getNDCs, getSearch],
  (ndcs, search) => {
    if (!ndcs) return null;
    const filteredNDCs = ndcs.map(ndc => {
      const defs = ndc.definitions.filter(
        def =>
          (deburrUpper(def.title).indexOf(search) > -1 ||
            deburrUpper(def.descriptions[0].value).indexOf(search) > -1) &&
          def.descriptions.length > 0
      );

      return {
        ...ndc,
        definitions: defs
      };
    });
    return filteredNDCs.filter(ndc => ndc.definitions.length > 0);
  }
);

export const filterSectoralNDCs = createSelector(
  [parsedCategoriesWithSectors, getSearch],
  (ndcs, search) => {
    if (!ndcs) return null;
    return ndcs.reduce((acc, ndc) => {
      const sectors = ndc.sectors.reduce((sectorAcc, sec) => {
        const definitions = search
          ? sec.definitions.filter(
            def =>
              deburrUpper(def.title).indexOf(search) > -1 ||
                deburrUpper(def.descriptions[0].value).indexOf(search) > -1
          )
          : sec.definitions;
        if (definitions.length) {
          sectorAcc.push(sec);
        }
        return sectorAcc;
      }, []);
      if (sectors.length) {
        acc.push({
          ...ndc,
          sectors
        });
      }
      return acc;
    }, []);
  }
);

export default {
  filterNDCs,
  filterSectoralNDCs
};
