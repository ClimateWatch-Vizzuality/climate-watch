import { GHG_CALCULATION_OPTIONS } from 'data/constants';
import { getCorrectedChartDataWithOthers } from './ghg-emissions-selectors-data';

describe('getCorrectedChartDataWithOthers', () => {
  const rawData = [
    { iso_code3: 'WORLD', emissions: [{ year: 1990, value: 1 }] }
  ];
  let selectedOptions = {
    regionsSelected: [{ value: 'WORLD', label: 'World' }],
    calculationSelected: GHG_CALCULATION_OPTIONS.PER_CAPITA.value
  };
  let data = null;

  it('Returns null if there is no data', () => {
    expect(
      getCorrectedChartDataWithOthers.resultFunc(data, selectedOptions, rawData)
    ).toBe(null);
  });

  it('Returns data when the calculation is part of the mean calculation options', () => {
    data = [{ x: 1990, yOthers: 0, y1: 300000, y2: 600000 }];
    expect(
      getCorrectedChartDataWithOthers.resultFunc(data, selectedOptions, rawData)
    ).toStrictEqual(data);
  });
  it('Returns corrected data', () => {
    data = [{ x: 1990, yOthers: 0, y1: 300000, y2: 600000 }];
    const result = [{ x: 1990, y1: 300000, y2: 600000, yOthers: 100000 }];
    selectedOptions = {
      regionsSelected: [{ value: 'WORLD', label: 'World' }],
      calculationSelected: GHG_CALCULATION_OPTIONS.ABSOLUTE_VALUE.value
    };
    expect(
      getCorrectedChartDataWithOthers.resultFunc(data, selectedOptions, rawData)
    ).toStrictEqual(result);
  });
});
