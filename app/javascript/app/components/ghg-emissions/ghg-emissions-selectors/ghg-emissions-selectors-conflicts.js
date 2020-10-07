import { createSelector } from 'reselect';
import difference from 'lodash/difference';
import intersection from 'lodash/intersection';
import pluralize from 'pluralize';
import { arrayToSentence } from 'utils';
import { GAS_AGGREGATES, GHG_CALCULATION_OPTIONS } from 'data/constants';
import {
  getFiltersSelected,
  getModelSelected,
  getBreakByOptionSelected,
  getChartTypeSelected,
  getMetricSelected
} from './ghg-emissions-selectors-filters';

const getOverlappingConflicts = optionsSelected => {
  if (!optionsSelected || optionsSelected.length <= 1) return [];

  const conflicts = [];
  const overlapsCheckedIds = [];

  optionsSelected.forEach(option => {
    if (option.expandsTo) {
      const overlappingOptions = [];
      optionsSelected.forEach(option2 => {
        if (option2.value === option.value) return;
        if (overlapsCheckedIds.includes(option2.value)) return;

        const expandedOption = [option.value, ...(option.expandsTo || [])].map(
          String
        );
        const expandedOption2 = [
          option2.value,
          option2.group,
          ...(option2.expandsTo || [])
        ].map(String);

        if (intersection(expandedOption, expandedOption2).length > 0) {
          overlappingOptions.push(option2.label);
        }
      });

      if (overlappingOptions.length) {
        conflicts.push(
          `${option.label} overlaps with ${arrayToSentence(overlappingOptions)}`
        );
      }

      overlapsCheckedIds.push(option.value);
    }
  });

  return conflicts;
};

const getGasConflicts = gasSelected => {
  const aggregatedGases = Object.keys(GAS_AGGREGATES);

  if (!gasSelected || gasSelected.length <= 1) return [];

  const conflicts = [];

  aggregatedGases.forEach(gas => {
    if (gasSelected.some(g => g.label.includes(gas))) {
      conflicts.push(`${gas} option cannot be selected with any other gas`);
    }
  });

  return conflicts;
};

const getCalculationSectorConflicts = (sectorsSelected, metricSelected) => {
  const conflictMetrics = [
    GHG_CALCULATION_OPTIONS.PER_CAPITA.value,
    GHG_CALCULATION_OPTIONS.PER_GDP.value,
    GHG_CALCULATION_OPTIONS.CUMULATIVE.value
  ];
  return sectorsSelected &&
    sectorsSelected.length > 1 &&
    conflictMetrics.includes(metricSelected)
    ? [
      `More than one sector is not available with ${GHG_CALCULATION_OPTIONS[metricSelected].label} calculation`
    ]
    : [];
};

const getCountryRegionConflicts = (regionsSelected, breakBySelected) => {
  const regionsGroupSelected = regionsSelected?.filter(
    r => r.groupId === 'regions'
  );
  const numberOfRegionsSelected = regionsGroupSelected?.length;
  if (breakBySelected.value === 'countries' && numberOfRegionsSelected > 1) {
    return ['More than one region is selected'];
  }
  const onlyCountriesAreSelected =
    regionsSelected?.length && numberOfRegionsSelected === 0;
  if (breakBySelected.value === 'regions' && onlyCountriesAreSelected) {
    return ['No region is selected'];
  }
  return [];
};

const getChartConflicts = (metricSelected, chartSelected, breakBySelected) => {
  const conflicts = [];

  if (
    ['PER_CAPITA', 'PER_GDP', 'PERCENTAGE_CHANGE'].includes(metricSelected) &&
    chartSelected.value !== 'line'
  ) {
    const metricOption = GHG_CALCULATION_OPTIONS[metricSelected];
    conflicts.push(
      `${metricOption.label} metric is not allowed with ${chartSelected.label} chart`
    );
  }

  if (
    ['PER_CAPITA', 'PER_GDP'].includes(metricSelected) &&
    ['sector', 'gas'].includes(breakBySelected.value)
  ) {
    const metricOption = GHG_CALCULATION_OPTIONS[metricSelected];
    conflicts.push(
      `${metricOption.label} metric is not allowed with show data by ${breakBySelected.label}`
    );
  }

  return conflicts;
};

export const getFiltersConflicts = createSelector(
  [
    getFiltersSelected('location'),
    getFiltersSelected('gas'),
    getFiltersSelected('sector'),
    getModelSelected,
    getMetricSelected,
    getChartTypeSelected,
    getBreakByOptionSelected
  ],
  (
    regionSelected,
    gasSelected,
    sectorsSelected,
    modelSelected,
    metricSelected,
    chartSelected,
    breakBySelected
  ) => {
    const isNotLineChart = chartSelected.value !== 'line';

    const sectorConflicts = getOverlappingConflicts(sectorsSelected);
    const calculationSectorConflicts = getCalculationSectorConflicts(
      sectorsSelected,
      metricSelected
    );
    const regionConflicts = getOverlappingConflicts(regionSelected);
    const countryRegionConflicts = getCountryRegionConflicts(
      regionSelected,
      breakBySelected
    );
    const gasConflicts = getGasConflicts(gasSelected);
    const chartConflicts = getChartConflicts(
      metricSelected,
      chartSelected,
      breakBySelected
    );

    let conflicts = [];
    if (isNotLineChart || modelSelected !== 'sector') {
      conflicts = conflicts.concat(sectorConflicts);
    }
    conflicts = conflicts.concat(calculationSectorConflicts);

    if (isNotLineChart || modelSelected !== 'gas') {
      conflicts = conflicts.concat(gasConflicts);
    }
    if (isNotLineChart || modelSelected !== 'regions') {
      conflicts = conflicts.concat(regionConflicts);
    }
    conflicts = conflicts.concat(countryRegionConflicts);
    conflicts = conflicts.concat(chartConflicts);

    const getBreakByAvailableOptions = () => {
      if (calculationSectorConflicts.length || chartConflicts.length) {
        // Changing the show data by won't fix this cases
        return [];
      }
      let breakByAvailableOptions = difference(
        ['sector', 'gas', 'regions', 'countries'],
        [breakBySelected.value]
      );
      if (sectorConflicts.length) {
        breakByAvailableOptions = intersection(breakByAvailableOptions, [
          'sector'
        ]);
      }
      if (regionConflicts.length) {
        breakByAvailableOptions = intersection(breakByAvailableOptions, [
          'region'
        ]);
      }
      if (gasConflicts.length) {
        breakByAvailableOptions = intersection(breakByAvailableOptions, [
          'gas'
        ]);
      }
      return breakByAvailableOptions;
    };

    const solutions = [];
    const breakByAvailableOptions = getBreakByAvailableOptions();
    if (breakByAvailableOptions.length) {
      solutions.push(
        `change "Show data by" to ${arrayToSentence(
          breakByAvailableOptions.map(option => pluralize(option)),
          'or'
        )}`
      );
    }
    if (conflicts.length && !solutions.length && isNotLineChart) {
      solutions.push('change "Chart Type" to line chart');
    }
    const solutionText = `Please deselect all conflicting options
        ${solutions.length ? `or ${solutions.join(' or ')}` : ''}`;

    return {
      conflicts,
      solutionText
    };
  }
);
