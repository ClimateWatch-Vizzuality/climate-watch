import { createSelector } from 'reselect';
import uniq from 'lodash/uniq';
import flatMap from 'lodash/flatMap';
import { getOptionsSelected } from './ghg-emissions-selectors-filters';

export const getProviderFilters = createSelector([getOptionsSelected], selectedOptions => {
  if (!selectedOptions || !selectedOptions.sourcesSelected) return null;
  const { sourcesSelected, sectorsSelected, gasesSelected, regionsSelected } = selectedOptions;

  const parseValues = selected => uniq(selected.map(s => s.value)).join();
  const withExpanded = optionsSelected => [
    ...optionsSelected,
    ...flatMap(optionsSelected, o => (o.expandsTo || []).map(value => ({ value })))
  ];

  return {
    source: sourcesSelected.value,
    gas: parseValues(gasesSelected),
    sector: parseValues(withExpanded(sectorsSelected)),
    location: parseValues(withExpanded(regionsSelected))
  };
});
