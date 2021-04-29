import { GHG_CALCULATION_OPTIONS } from 'data/constants';
import {
  getWorldCorrectedChartDataWithOthers,
  WORLD_CORRECTION_MISSING_DATA_CALCULATION_OPTIONS
} from './ghg-emissions-selectors-data';

describe('getWorldCorrectedChartDataWithOthers', () => {
  const rawData = [
    {
      iso_code3: 'WORLD',
      emissions: [
        { year: 1990, value: 1 },
        { year: 1991, value: 0.5 }
      ]
    },
    {
      iso_code3: 'y1',
      location: '1',
      emissions: [
        { year: 1990, value: 0.4 },
        { year: 1991, value: 0.2 }
      ]
    },
    {
      iso_code3: 'y2',
      location: '2',
      emissions: [
        { year: 1990, value: 0.4 },
        { year: 1991, value: 0.2 }
      ]
    }
  ];
  let selectedOptions = {
    regionsSelected: [{ value: 'WORLD', label: 'World' }],
    calculationSelected: GHG_CALCULATION_OPTIONS.ABSOLUTE_VALUE.value
  };
  let data;

  it('Returns null if there is no data', () => {
    data = null;

    expect(
      getWorldCorrectedChartDataWithOthers.resultFunc(
        data,
        selectedOptions,
        rawData
      )
    ).toBe(null);
  });

  it('Returns not corrected data when the calculation is part of the missing data calculation options', () => {
    data = [{ x: 1990, yOthers: 0, y1: 300000, y2: 600000 }];
    WORLD_CORRECTION_MISSING_DATA_CALCULATION_OPTIONS.forEach(
      calculationValue => {
        selectedOptions = {
          ...selectedOptions,
          calculationSelected: { value: calculationValue }
        };

        expect(
          getWorldCorrectedChartDataWithOthers.resultFunc(
            data,
            selectedOptions,
            rawData
          )
        ).toStrictEqual(data);
      }
    );
  });
  it('Returns corrected absolute value data', () => {
    data = [{ x: 1990, y1: 300000, y2: 600000, yOthers: 'WONT_MATTER' }];
    const result = [{ x: 1990, y1: 300000, y2: 600000, yOthers: 100000 }];
    selectedOptions = {
      regionsSelected: [{ value: 'WORLD', label: 'World' }],
      calculationSelected: {
        value: GHG_CALCULATION_OPTIONS.ABSOLUTE_VALUE.value
      }
    };

    expect(
      getWorldCorrectedChartDataWithOthers.resultFunc(
        data,
        selectedOptions,
        rawData
      )
    ).toStrictEqual(result);
  });
  it('Returns percentage corrected data', () => {
    data = [
      { x: 1990, y1: 30, y2: 60, yOthers: 'WONT_MATTER' },
      { x: 1991, y1: 15, y2: 30, yOthers: 'WONT_MATTER' }
    ];
    const result = [
      { x: 1990, y1: 30, y2: 60, yOthers: null },
      { x: 1991, y1: 15, y2: 30, yOthers: -50 }
    ];
    selectedOptions = {
      regionsSelected: [{ value: 'WORLD', label: 'World' }],
      calculationSelected: {
        value: GHG_CALCULATION_OPTIONS.PERCENTAGE_CHANGE.value
      }
    };
    expect(
      getWorldCorrectedChartDataWithOthers.resultFunc(
        data,
        selectedOptions,
        rawData
      )
    ).toStrictEqual(result);
  });
  it('Returns cumulative corrected data', () => {
    data = [
      { x: 1990, y1: 100000, y2: 200000, yOthers: 'WONT_MATTER' },
      { x: 1991, y1: 200000, y2: 400000, yOthers: 'WONT_MATTER' }
    ];
    const result = [
      { x: 1990, y1: 100000, y2: 200000, yOthers: 700000 },
      { x: 1991, y1: 200000, y2: 400000, yOthers: 900000 }
    ];
    selectedOptions = {
      regionsSelected: [{ value: 'WORLD', label: 'World' }],
      calculationSelected: { value: GHG_CALCULATION_OPTIONS.CUMULATIVE.value }
    };
    const dataZoomYears = { min: 1990 };

    expect(
      getWorldCorrectedChartDataWithOthers.resultFunc(
        data,
        selectedOptions,
        rawData,
        dataZoomYears
      )
    ).toStrictEqual(result);
  });
});
