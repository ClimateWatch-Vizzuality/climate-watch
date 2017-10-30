import { createSelector } from 'reselect';
import { deburrUpper } from 'app/utils';

const getCountries = state => state.countries;
const getAllIndicators = state => (state.data ? state.data.indicators : null);
const getCategories = state => (state.data ? state.data.categories : null);
const getSearch = state => deburrUpper(state.search);

export const parseIndicatorsDefs = createSelector(
  [getAllIndicators, getCategories, getCountries],
  (indicators, categories, countries) => {
    if (!indicators || !categories || !countries) return {};
    const parsedIndicators = {};
    Object.keys(categories).forEach(category => {
      const categoryIndicators = indicators.filter(
        indicator => indicator.category_ids.indexOf(category) > -1
      );
      const parsedDefinitions = categoryIndicators.map(def => {
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

export const getAnchorLinks = createSelector(
  [
    state => state.route.routes || [],
    state => state.iso,
    state => state.location.search
  ],
  (routes, iso, search) =>
    routes.filter(route => route.anchor).map(route => ({
      label: route.label,
      path: `/ndcs/country/${iso}/${route.param ? route.param : ''}`,
      search
    }))
);

export default {
  filterNDCs
};
