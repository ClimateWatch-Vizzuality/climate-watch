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
  [getHistoricalEmissions, getTargets, getNdcs, getLastUpdated],
  (historicalEmissions, targets, ndcs, lastUpdated) => ({
    historicalEmissions,
    targets,
    ndcs,
    lastUpdated
  })
);
