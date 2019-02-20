import { createSelector } from 'reselect';
import uniq from 'lodash/uniq';
import flatMap from 'lodash/flatMap';
import { getOptionsSelected } from './ghg-emissions-selectors-filters';

export const getProviderFilters = createSelector([getOptionsSelected], selectedOptions => {
  if (!selectedOptions || !selectedOptions.sourcesSelected) return null;
  const { sourcesSelected, sectorsSelected, gasesSelected, regionsSelected } = selectedOptions;

  const parseValues = selected => uniq(selected.map(s => s.value)).join();

  const regionMembers = flatMap(regionsSelected, r => (r.members || []).map(id => ({ value: id })));
  const sectorAggregates = flatMap(sectorsSelected, s =>
    (s.aggregatedSectorIds || []).map(id => ({ value: id }))
  );

  return {
    source: sourcesSelected.value,
    gas: parseValues(gasesSelected),
    sector: parseValues([...sectorsSelected, ...sectorAggregates]),
    location: parseValues([...regionsSelected, ...regionMembers])
  };
});
