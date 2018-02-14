import { createSelector } from 'reselect';
import { CALCULATION_OPTIONS } from 'data/constants';

// meta data for selectors
const getSources = state => state.meta.data_source || null;

// values from search
export const getSourceSelection = state => state.search.source || null;
export const getCalculation = state => state.search.calculation || null;

// data for the graph
// const getData = state => state.data || [];

// Sources selectors
export const getCalculationSelected = createSelector(
  getCalculation,
  calculation => {
    if (!calculation) return CALCULATION_OPTIONS.ABSOLUTE_VALUE;
    return CALCULATION_OPTIONS[calculation];
  }
);
export const getSourceOptions = createSelector(getSources, sources => {
  if (!sources) return null;
  return sources.map(d => ({
    label: d.label,
    value: d.value,
    source: d.source
  }));
});

export const getSourceSelected = createSelector(
  [getSourceOptions, getSourceSelection],
  (sources, selected) => {
    if (!sources) return null;
    if (!selected) return sources[0];
    return sources.find(category => category.value === parseInt(selected, 10));
  }
);

export const getFiltersSelected = createSelector(
  getSourceSelected,
  sourceSelected => {
    if (!sourceSelected) return null;
    return {
      location: 'ESP',
      source: sourceSelected && sourceSelected.value
    };
  }
);

export const calculationOptions = Object.keys(CALCULATION_OPTIONS).map(
  o => CALCULATION_OPTIONS[o]
);

export default {
  getSourceOptions,
  getSourceSelected,
  calculationOptions,
  getCalculationSelected,
  getFiltersSelected
};
