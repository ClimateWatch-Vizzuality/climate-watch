import { createSelector } from 'reselect';
import { INDICATOR_SLUGS } from 'data/constants';

export const getMetadata = state =>
  !state.metadata.loading ? state.metadata.data : null;

// Indicators are requested by provider on the ndcs-enhancements-2025-tracker-map component
const getIndicators = state =>
  (state.ndcs && state.ndcs.data && state.ndcs.data.indicators) || null;
const getCountries = state => (state.countries && state.countries.data) || null;

export const getData = createSelector(
  [getIndicators, getCountries],
  (indicators, countries) => {
    if (!indicators || !countries) return null;

    const statusIndicator = indicators.find(
      indicator => indicator.slug === '2025_status'
    );

    const emissionsIndicator = indicators.find(
      indicator => indicator.slug === INDICATOR_SLUGS.emissions
    );

    const dateIndicator = indicators.find(
      indicator => indicator.slug === '2025_date'
    );

    // To sort we need to get also the date of the locations that dont have 2025 submission
    const no2025DateIndicator = indicators.find(
      indicator => indicator.slug === 'ndce_date'
    );

    if (!statusIndicator) return null;

    const data = countries?.map(country => {
      const { iso_code3: iso, wri_standard_name, is_in_eu = false } = country;

      return {
        iso,
        is_in_eu,
        country: wri_standard_name,
        indc_submission: statusIndicator?.locations[iso]?.value || 'No New NDC',
        submission_date:
          dateIndicator.locations[iso]?.value ||
          no2025DateIndicator.locations[iso]?.value,
        ndce_ghg: emissionsIndicator?.locations[iso]?.value
      };
    });

    return data;
  }
);
