import { GHG_CALCULATION_OPTIONS } from 'data/constants';
import {
  getWorldCorrectedChartDataWithOthers,
  WORLD_CORRECTION_MISSING_DATA_CALCULATION_OPTIONS,
  sumWorldDataEmissions
} from './ghg-emissions-selectors-data';

describe('sumWorldDataEmissions', () => {
  it('sums emisisons correctly', () => {
    const worldData = [
      {
        sector: 'Energy',
        emissions: [
          { year: '1991', value: 1 },
          { year: '1992', value: 2 }
        ]
      },
      {
        sector: 'Agriculture',
        emissions: [
          { year: '1991', value: 2 },
          { year: '1992', value: 2 }
        ]
      }
    ];
    expect(worldData.reduce(sumWorldDataEmissions, [])).toStrictEqual([
      { year: '1991', value: 3 },
      { year: '1992', value: 4 }
    ]);
  });
});

describe('getWorldCorrectedChartDataWithOthers', () => {
  const rawData = [
    {
      iso_code3: 'WORLD',
      gas: 'All gases',
      sector: 'Agriculture',
      emissions: [
        { year: 1990, value: 0.5 },
        { year: 1991, value: 0.25 }
      ]
    },
    {
      iso_code3: 'WORLD',
      gas: 'All gases',
      sector: 'Energy',
      emissions: [
        { year: 1990, value: 0.5 },
        { year: 1991, value: 0.25 }
      ]
    },
    {
      iso_code3: 'y1',
      location: '1',
      gas: 'All gases',
      sector: 'Agriculture',
      emissions: [
        { year: 1990, value: 0.4 },
        { year: 1991, value: 0.2 }
      ]
    },
    {
      iso_code3: 'y2',
      gas: 'All gases',
      sector: 'Agriculture',
      location: '2',
      emissions: [
        { year: 1990, value: 0.4 },
        { year: 1991, value: 0.2 }
      ]
    }
  ];
  let selectedOptions = {
    regionsSelected: [{ value: 'WORLD', label: 'World' }],
    sectorsSelected: [
      { value: 'Agriculture', label: 'Agriculture' },
      { value: 'Energy', label: 'Energy' }
    ],
    gasesSelected: [{ value: 'All gases', label: 'All gases' }],
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
      ...selectedOptions,
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
      ...selectedOptions,
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
      ...selectedOptions,
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
