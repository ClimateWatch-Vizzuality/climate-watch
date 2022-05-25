/* eslint-disable no-confusing-arrow */
import { createSelector } from 'reselect';
import { isEmpty, groupBy, min, max } from 'lodash';
import { CHART_NAMED_EXTENDED_COLORS } from 'app/styles/constants';

const COSTS_COLORS = {
  'Solar Photovoltaic': '#ff6c2f',
  'Onshore wind': '#2ec9df',
  'Offshore wind': '#13c881'
};

const getCountryIndicators = state =>
  state.countryProfileIndicators.data || null;

const getCostsConfig = countryIndicators => {
  const { cost_by_technology } = countryIndicators;

  const columns = [
    ...new Set(cost_by_technology.values.map(({ category }) => category))
  ];

  const costsByYears = groupBy(cost_by_technology.values, 'year');
  const data = Object.keys(costsByYears).map(year => {
    const costByYear = costsByYears[year];

    return costByYear.reduce(
      (acc, next) => ({
        ...acc,
        x: next.year,
        [next.category]: next.value
      }),
      {}
    );
  });

  return {
    data,
    config: {
      animation: false,
      type: 'line',
      axes: {
        xBottom: {
          format: 'YYYY',
          name: 'Year',
          unit: 'date'
        },
        yLeft: {
          format: 'number',
          name: 'x',
          unit: 'USD/Kwh'
        }
      },
      columns: {
        x: [
          {
            label: 'year',
            value: 'year'
          }
        ],
        y: columns.map(_column => ({ label: _column, value: _column }))
      },
      theme: Object.values(columns).reduce(
        (acc, next) => ({
          ...acc,
          [next]: {
            stroke: COSTS_COLORS[next] || '#999c9f',
            fill: COSTS_COLORS[next] || '#999c9f'
          }
        }),
        {}
      ),
      tooltip: Object.values(columns).reduce(
        (acc, next) => ({
          ...acc,
          [next]: { label: next }
        }),
        {}
      )
    },
    domain: {
      x: [
        min(cost_by_technology.values.map(({ year }) => year)),
        max(cost_by_technology.values.map(({ year }) => year))
      ],
      y: [
        min(cost_by_technology.values.map(({ value }) => +value)),
        max(cost_by_technology.values.map(({ value }) => +value))
      ]
    },
    name: cost_by_technology.name,
    metadata_source: cost_by_technology.metadata_source,
    legend: []
  };
};

export const getSectionData = createSelector(
  [getCountryIndicators],
  countryIndicators => {
    const hasCountryIndicators = !isEmpty(countryIndicators);
    if (!countryIndicators || !hasCountryIndicators) return null;
    const employment = [
      { name: 'Oil and gas technologies', value: 900 },
      { name: 'All renewable', value: 843.23 }
    ];

    const employmentMax = Math.max(...employment.map(e => e.value));
    const colors = Object.values(CHART_NAMED_EXTENDED_COLORS);
    return {
      employment: employment.map((e, i) => ({
        ...e,
        percentage: e.value && (e.value / employmentMax) * 100,
        color: colors[i]
      })),
      costs: getCostsConfig(countryIndicators)
    };
  }
);
