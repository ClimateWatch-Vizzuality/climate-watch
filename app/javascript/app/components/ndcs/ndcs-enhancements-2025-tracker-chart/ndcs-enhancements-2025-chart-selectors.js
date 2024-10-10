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

    // We use emissionsIndicator to get all countries (the submissions indicator only has countries with submissions)
    const data = Object.entries(emissionsIndicator.locations).map(
      ([iso, location]) => ({
        iso,
        // Country property is only used to display the country name on the chart tooltips.
        // We'll use the wri_standard_name as a standard, and default to the ISO code if one doesn't
        // exist in order to fail safely. (IE: FE not crashing due to unexpected/missing data)
        country:
          countries.find(country => iso === country.iso_code3)
            ?.wri_standard_name || iso,
        indc_submission:
          // ! TODO Default value conflicts with the one in the component. Needs to be addressed
          statusIndicator.locations[iso]?.value || 'No New NDC',
        submission_date:
          dateIndicator.locations[iso]?.value ||
          no2025DateIndicator.locations[iso]?.value,
        ndce_ghg: location?.value,
        is_in_eu:
          countries.find(country => country.iso_code3 === iso)?.is_in_eu ||
          false
      })
    );

    return data;
  }
);
