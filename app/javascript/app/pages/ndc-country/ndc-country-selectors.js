import { createSelector } from 'reselect';
import { deburrUpper } from 'app/utils';

const getCountries = state => state.countries;
const getIso = state => state.iso;
const getDefs = state => state.ndcs;
const getSearch = state => deburrUpper(state.search);

const getCountryByIso = (countries, iso) =>
  countries.find(country => country.iso_code3 === iso);

const filterNDCsDefinition = (ndcs, search) => {
  const filteredNdcs = ndcs.map(ndc => {
    const defs = ndc.definitions.filter(
      def =>
        deburrUpper(def.title).indexOf(search) > -1 ||
        deburrUpper(def.description).indexOf(search) > -1
    );

    return {
      ...ndc,
      definitions: defs
    };
  });

  return filteredNdcs;
};

export const getCountry = createSelector(
  [getCountries, getIso],
  getCountryByIso
);

export const filterDefs = createSelector(
  [getDefs, getSearch],
  filterNDCsDefinition
);

export default {
  getCountry,
  filterDefs
};
