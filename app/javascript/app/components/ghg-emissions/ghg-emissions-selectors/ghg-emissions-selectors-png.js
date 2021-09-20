import { createSelector } from 'reselect';
import { getOptionsSelected } from './ghg-emissions-selectors-filters';

const createChartParamsString = chartParam =>
  chartParam && chartParam.map(r => r.label).join(', ');

export const getPngSelectionSubtitle = createSelector(
  [getOptionsSelected],
  chartParams => {
    if (!chartParams) return null;
    const {
      sourcesSelected,
      regionsSelected,
      sectorsSelected,
      gasesSelected,
      calculationSelected,
      breakBySelected
    } = chartParams;
    const source = `Data source: ${sourcesSelected && sourcesSelected.label}`;
    const regions = createChartParamsString(regionsSelected);
    const sectors = createChartParamsString(sectorsSelected);
    const gases = createChartParamsString(gasesSelected);
    const calculation = `Calculation: ${calculationSelected &&
      calculationSelected.label}`;
    const dataBy = `Show data by ${breakBySelected && breakBySelected.label}`;
    return `${source}; Countries/Regions: ${regions}; Sectors/Subsectors: ${sectors}; Gases: ${gases}; ${calculation}; ${dataBy}.`;
  }
);
