import { createSelector } from 'reselect';
import { deburrUpper } from 'app/utils';

const getCountries = state => state.countries;
const getAllIndicators = state => (state.data ? state.data.indicators : {});
const getCategories = state => (state.data ? state.data.categories : {});
const getSectors = state => (state.data ? state.data.sectors : {});
const getSearch = state => deburrUpper(state.search);

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
        const descriptions = countries.map(country => ({
          iso: country,
          value: def.locations[country] ? def.locations[country][0].value : null
        }));
        return {
          title: def.name,
          slug: def.slug,
          descriptions
        };
      });
      parsedIndicators[category] = parsedDefinitions;
    });
    return parsedIndicators;
  }
);

export const parseIndicatorsDefsWithSectors = createSelector(
  [getAllIndicators, getCategories, getCountries, getSectors],
  (indicators, categories, countries, sectors) => {
    if (!indicators || !categories || !countries || !sectors) return null;
    const parsedIndicators = [];
    Object.keys(categories).forEach(category => {
      const indicatorsWithCategory = indicators.filter(
        indicator => indicator.category_ids.indexOf(category) > -1
      );
      const parsedDefinitions = indicatorsWithCategory.map(indicator => {
        const sectorIds = [];
        let descriptions = [];
        Object.keys(indicator.locations).forEach(location => {
          indicator.locations[location].forEach(def =>
            sectorIds.push(def.sector_id)
          );
        });
        if (sectorIds && sectorIds.length && sectorIds[0]) {
          sectorIds.forEach(sector => {
            const descriptionsBySector = countries.map(country => {
              const value = indicator.locations[country]
                ? indicator.locations[country].find(
                  indicValue => indicValue.sector_id === sector
                )
                : '';
              return {
                iso: country,
                value: value ? value.value : null
              };
            });
            descriptions.push({
              title: sectors[sector].name,
              slug: sector,
              descriptions: descriptionsBySector
            });
          });
        } else {
          descriptions = countries.map(country => ({
            iso: country,
            values: indicator.locations[country]
              ? indicator.locations[country]
              : null
          }));
        }
        return {
          title: indicator.name,
          slug: indicator.slug,
          descriptions
        };
      });
      parsedIndicators[category] = parsedDefinitions;
    });
    return parsedIndicators;
  }
);

export const getNDCs = createSelector(
  [getCategories, parseIndicatorsDefs],
  (categories, indicators) => {
    if (!categories) return null;
    const ndcs = Object.keys(categories).map(category => ({
      title: categories[category].name,
      slug: categories[category].slug,
      definitions: indicators[category] ? indicators[category] : []
    }));
    return ndcs;
  }
);

export const getSectoralNDCs = createSelector(
  [getCategories, parseIndicatorsDefsWithSectors],
  (categories, indicators) => {
    if (!categories || !indicators) return null;
    const ndcs = Object.keys(categories).map(category => ({
      title: categories[category].name,
      slug: categories[category].slug,
      indicators: indicators[category] ? indicators[category] : []
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
          deburrUpper(def.title).indexOf(search) > -1 ||
          deburrUpper(def.descriptions[0].value).indexOf(search) > -1
      );

      return {
        ...ndc,
        definitions: defs
      };
    });
    const reducedNDCs = filteredNDCs.filter(ndc => ndc.definitions.length > 0);
    return reducedNDCs;
  }
);

export const filterSectoralNDCs = createSelector(
  [getSectoralNDCs, getSearch],
  (ndcs, search) => {
    if (!ndcs) return null;
    const reducedNDCs = ndcs.filter(
      ndc => ndc.indicators && ndc.indicators.length
    );
    const filteredNDCs = reducedNDCs.map(ndc => {
      const defs = [];
      ndc.indicators.forEach(def => {
        const descs = def.descriptions.filter(
          desc =>
            deburrUpper(desc.title).indexOf(search) > -1 ||
            deburrUpper(desc.descriptions[0].value).indexOf(search) > -1
        );
        if (descs && descs.length) {
          defs.push({
            ...def,
            descriptions: descs
          });
        }
      });

      return {
        ...ndc,
        indicators: defs
      };
    });
    return filteredNDCs;
  }
);

export default {
  filterNDCs,
  filterSectoralNDCs
};
