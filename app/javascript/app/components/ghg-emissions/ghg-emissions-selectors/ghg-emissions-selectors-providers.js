import { createSelector } from 'reselect';
import uniq from 'lodash/uniq';
import { getOptionsSelected } from './ghg-emissions-selectors-filters';

export const getProviderFilters = createSelector(
  [getOptionsSelected],
  selectedOptions => {
    if (!selectedOptions || !selectedOptions.sourcesSelected) return null;
    const {
      sourcesSelected,
      sectorsSelected,
      gasesSelected,
      regionsSelected
    } = selectedOptions;

    const parseValues = selected => uniq(selected.map(s => s.value)).join();
    const regionCountriesSelected = [];
    regionsSelected.forEach(r => {
      if (r.members) regionCountriesSelected.push(r.members);
    });
    const countryValues = regionCountriesSelected.join();
    return {
      source: sourcesSelected.value,
      gas: parseValues(gasesSelected),
      sector: parseValues(sectorsSelected),
      location: `${parseValues(regionsSelected)}${countryValues
        ? `,${countryValues}`
        : ''}`
    };
  }
);
