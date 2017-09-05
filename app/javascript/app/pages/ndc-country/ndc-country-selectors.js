import { createSelector } from 'reselect';
import { deburrUpper } from 'app/utils';
import groupBy from 'lodash/groupBy';
import uniqBy from 'lodash/uniqBy';

const getCountries = state => state.countries;
const getIso = state => state.iso;
const getAllIndicators = state => state.data.indicators || {};
const getCategories = state => state.data.categories;
const getSearch = state => deburrUpper(state.search);

const getCountryByIso = (countries, iso) =>
  countries.find(country => country.iso_code3 === iso);

export const getIndicators = createSelector(getAllIndicators, data =>
  groupBy(data, 'category_id')
);

export const parseIndicatorsDefs = createSelector(
  [getIndicators, getCountries],
  (indicators, countries) => {
    const parsedIndicators = Object.keys(indicators).map(category => {
      const parsedDefinitions = indicators[category].map(indicator => {
        const descriptions = countries.map(country => ({
          iso: country,
          value: indicator.locations[country]
            ? indicator.locations[country].value
            : null
        }));
        return {
          title: indicator.name,
          descriptions
        };
      });
      return uniqBy(parsedDefinitions, 'title');
    });
    return parsedIndicators;
  }
);

export const getNDCs = createSelector(
  [getCategories, parseIndicatorsDefs],
  (categories, indicators) => {
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
    const filteredNDCs = ndcs.map(ndc => {
      const defs = ndc.definitions.filter(
        def => deburrUpper(def.title).indexOf(search) > -1
      );

      return {
        ...ndc,
        definitions: defs
      };
    });
    return filteredNDCs;
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
