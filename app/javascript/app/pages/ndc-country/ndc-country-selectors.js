import { createSelector } from 'reselect';
import { deburrUpper } from 'app/utils';
import groupBy from 'lodash/groupBy';

const getCountries = state => state.countries;
const getIso = state => state.iso;
const getAllIndicators = state => (state.data ? state.data.indicators : {});
const getCategories = state => (state.data ? state.data.categories : {});
const getSearch = state => deburrUpper(state.search);

const getCountryByIso = (countries, iso) =>
  countries.find(country => country.iso_code3 === iso);

export const getIndicators = createSelector(getAllIndicators, data =>
  groupBy(data, 'category_id')
);

export const parseIndicatorsDefs = createSelector(
  [getIndicators, getCountries],
  (indicators, countries) => {
    const parsedIndicators = {};
    Object.keys(indicators).forEach(category => {
      const parsedDefinitions = indicators[category].map(def => {
        const descriptions = countries.map(country => ({
          iso: country,
          value: def.locations[country] ? def.locations[country].value : null
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

export const getCountry = createSelector(
  [getCountries, getIso],
  getCountryByIso
);

export default {
  getCountry,
  filterNDCs
};
