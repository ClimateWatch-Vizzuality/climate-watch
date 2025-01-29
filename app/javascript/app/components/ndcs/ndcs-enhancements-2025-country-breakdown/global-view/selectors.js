import { createSelector } from 'reselect';

const getGlobalEmissions = state =>
  state.ndcContentGlobalEmissions?.data || null;

export const getMetadata = state =>
  !state.metadata.loading ? state.metadata.data : null;

const getHistoricalEmissions = createSelector(
  [getGlobalEmissions],
  globalEmissions => {
    if (!globalEmissions) return null;
    return globalEmissions
      ?.map(entry => ({
        year: entry?.year,
        value: entry?.historical_emission
      }))
      .filter(({ value }) => !!value)
      .sort((a, b) => a.year - b.year);
  }
);

const getLastUpdated = createSelector([getGlobalEmissions], globalEmissions => {
  if (!globalEmissions) return null;
  return globalEmissions?.[0]?.updated_at;
});

const getPolicies = createSelector([getGlobalEmissions], globalEmissions => {
  if (!globalEmissions) return null;
  return globalEmissions
    .map(entry => ({
      year: entry?.year,
      value: entry?.current_policies_scenario
    }))
    ?.filter(({ value }) => !!value)
    ?.reduce(
      (acc, cur) => ({
        ...acc,
        [cur?.year]: cur?.value
      }),
      {}
    );
});

const getProjectedEmissions = createSelector(
  [getHistoricalEmissions, getPolicies],
  (historicalEmissions, policies) => {
    if (!historicalEmissions || !policies) return null;
    return [
      historicalEmissions?.[historicalEmissions?.length - 1],
      {
        year: 2030,
        value: policies?.[2030]
      }
    ];
  }
);

const getTargets = createSelector([getGlobalEmissions], globalEmissions => {
  if (!globalEmissions) return null;
  return globalEmissions
    .map(entry => ({
      year: entry?.year,
      target_2c: entry?.target_2c,
      target_1_5c: entry?.target_1_5c
    }))
    ?.filter(({ target_2c, target_1_5c }) => !!target_2c && !!target_1_5c)
    ?.reduce(
      (acc, cur) => ({
        ...acc,
        [cur?.year]: {
          '2.0C': cur.target_2c,
          '1.5C': cur.target_1_5c
        }
      }),
      {}
    );
});

const getNdcs = createSelector([getGlobalEmissions], globalEmissions => {
  if (!globalEmissions) return null;

  const ndcs = globalEmissions
    ?.filter(
      entry =>
        !!entry?.ndcs_conditional_2020 ||
        !!entry?.ndcs_conditional_2025 ||
        !!entry?.ndcs_unconditional_2020 ||
        !!entry?.ndcs_unconditional_2025
    )
    ?.map(entry => ({
      year: entry?.year,
      conditional: {
        2020: entry?.ndcs_conditional_2020,
        2025: entry?.ndcs_conditional_2025
      },
      unconditional: {
        2020: entry?.ndcs_unconditional_2020,
        2025: entry?.ndcs_unconditional_2025
      }
    }))
    ?.reduce(
      (acc, cur) => ({
        ...acc,
        [cur?.year]: {
          conditional: cur?.conditional,
          unconditional: cur?.unconditional
        }
      }),
      {}
    );

  return ndcs;
});

export const getData = createSelector(
  [
    getHistoricalEmissions,
    getProjectedEmissions,
    getTargets,
    getPolicies,
    getNdcs,
    getLastUpdated
  ],
  (
    historicalEmissions,
    projectedEmissions,
    targets,
    policies,
    ndcs,
    lastUpdated
  ) => ({
    historicalEmissions,
    projectedEmissions,
    targets,
    policies,
    ndcs,
    lastUpdated
  })
);
