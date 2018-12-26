import { createSelector } from 'reselect';
import uniq from 'lodash/uniq';
import isEqual from 'lodash/isEqual';
import { ALL_SELECTED_OPTION } from 'data/constants';
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

    const parseValues = selected =>
      (isEqual(selected, [ALL_SELECTED_OPTION])
        ? null
        : uniq(selected.map(s => s.value)).join());
    const regionCountriesSelected = [];
    regionsSelected.forEach(r => {
      if (r.members) regionCountriesSelected.push(r.members);
    });
    const countryValues = regionCountriesSelected.join();
    return {
      source: sourcesSelected.value.split('-')[0],
      gwp: sourcesSelected.value.split('-')[1],
      gas: parseValues(gasesSelected),
      sector: parseValues(sectorsSelected),
      location: `${parseValues(regionsSelected)}${countryValues
        ? `,${countryValues}`
        : ''}`
    };
  }
);
