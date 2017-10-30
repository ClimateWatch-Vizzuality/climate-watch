import { createSelector } from 'reselect';
import { deburrUpper } from 'app/utils';

const getCountries = state => state.countries;
const getAllIndicators = state => (state.data ? state.data.indicators : null);
const getCategories = state => (state.data ? state.data.categories : null);
const getSectors = state => (state.data ? state.data.sectors : null);
const getSearch = state => deburrUpper(state.search);

export const parseIndicatorsDefs = createSelector(
  [getAllIndicators, getCategories, getCountries, getSectors],
  (indicators, categories, countries, sectors) => {
    if (!indicators || !categories || !countries || !sectors) return {};
    const parsedIndicators = {};
    Object.keys(categories).forEach(category => {
      const indicatorsWithCategory = indicators.filter(
        indicator => indicator.category_ids.indexOf(category) > -1
      );
      const parsedDefinitions = indicatorsWithCategory.map(indicator => {
        const sectorIds = [];
        let descriptions = {};
        Object.keys(indicator.locations).forEach(location => {
          indicator.locations[location].forEach(def =>
            sectorIds.push(def.sector_id)
          );
        });
        if (sectorIds && sectorIds.length && sectorIds[0]) {
          sectorIds.forEach(sector => {
            descriptions[sector] = countries.map(country => {
              const value = indicator.locations[country].find(
                indicValue => indicValue.sector_id === sector
              );
              return {
                iso: country,
                value: value ? value.value : null
              };
            });
          });
        } else {
          console.log(countries);
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
    if (!categories) return [];
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
    if (!ndcs) return [];
    const filteredNDCs = ndcs.map(ndc => {
      const defs = ndc.definitions.filter(
        def => deburrUpper(def.title).indexOf(search) > -1
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

export default {
  filterNDCs
};
