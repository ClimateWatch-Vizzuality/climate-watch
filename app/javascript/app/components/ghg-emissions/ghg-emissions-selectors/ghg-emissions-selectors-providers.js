import { createSelector } from 'reselect';
import uniq from 'lodash/uniq';
import flatMap from 'lodash/flatMap';
import { getOptionsSelected } from './ghg-emissions-selectors-filters';

export const getProviderFilters = createSelector(
  [getOptionsSelected],
  selectedOptions => {
    if (!selectedOptions || !selectedOptions.sourcesSelected) return null;

    const {
      sourcesSelected,
      sectorsSelected,
      gasesSelected,
      regionsSelected,
      breakBySelected
    } = selectedOptions;

    const breakBySector = breakBySelected && breakBySelected.value === 'sector';
    const breakByGas = breakBySelected && breakBySelected.value === 'gas';
    const parseValues = selected => uniq(selected.map(s => s.value)).join();
    const withExpanded = optionsSelected => [
      ...optionsSelected,
      ...flatMap(optionsSelected, o =>
        (o.expandsTo || []).map(value => ({ value }))
      )
    ];

    const filter = {
      source: sourcesSelected.value,
      gas: parseValues(
        breakByGas ? withExpanded(gasesSelected) : gasesSelected
      ),
      // we have data for sectors' totals so we are only get aggregated when breaking by sector
      sector: parseValues(
        breakBySector ? withExpanded(sectorsSelected) : sectorsSelected
      ),
      location: parseValues(withExpanded(regionsSelected))
    };

    // do not allow empty filters
    if (Object.keys(filter).some(k => !filter[k])) return null;
    return filter;
  }
);
