import { createSelector } from 'reselect';
import { INDICATOR_SLUGS } from 'data/constants';

export const getMetadata = state =>
  !state.metadata.loading ? state.metadata.data : null;

// Indicators are requested by provider on the ndcs-enhancements-2025-tracker-map component
const getIndicatorsData = state =>
  (state.ndcs && state.ndcs.data && state.ndcs.data.indicators) || null;

export const getData = createSelector([getIndicatorsData], indicators => {
  if (!indicators) return null;
  const statusIndicator = indicators.find(
    indicator => indicator.slug === '2025_status'
  );
  const emissionsIndicator = indicators.find(
    indicator => indicator.slug === INDICATOR_SLUGS.emissions
  );
  const dateIndicator = indicators.find(
    indicator => indicator.slug === '2025_date'
  );

  if (!statusIndicator) return null;

  // We use emissionsIndicator to get all countries (the submissions indicator only has countries with submissions)
  const data = Object.entries(emissionsIndicator.locations).map(
    ([iso, location]) => ({
      iso,
      country: iso,
      indc_submission: statusIndicator.locations[iso]?.value || 'Not Submitted',
      submission_date: dateIndicator.locations[iso]?.value,
      ndce_ghg: location?.value
    })
  );

  return data;
});
