import { createSelector } from 'reselect';

import { TOP_EMITTERS_OPTION } from 'data/constants';
import {
  europeSlug,
  europeGroupExplorerPagesSlug,
  europeGroupLabel,
  europeLabel
} from 'app/data/european-countries';
import { sortLabelByAlpha } from 'utils/graphs';

import { BASELINE_YEARS, TARGET_YEARS } from './constants';

const getCountries = state => state.countries?.data || null;
const getRegions = state => state?.regions?.data || null;
const getCountryEmissions = state =>
  state.ndcContentCountryEmissions?.data || null;

export const getLocations = createSelector(
  [getRegions, getCountries],
  (regions, countries) => {
    if (!regions || !countries || !regions.length || !countries.length) {
      return null;
    }
    const countryOptions = countries.map(country => ({
      iso: country.iso_code3,
      label: country.wri_standard_name
    }));
    const SOURCES = ['Climate Watch'];

    const regionOptions = [TOP_EMITTERS_OPTION];
    const updatedRegions = regions;
    updatedRegions.forEach(region => {
      const regionMembers =
        region.members && region.members.map(m => m.iso_code3 || m.iso);
      const regionCountries =
        region.members &&
        region.members
          .filter(
            m => !m.ghg_sources || SOURCES.some(s => m.ghg_sources.includes(s))
          )
          .map(country => ({
            label: country.wri_standard_name,
            iso: country.iso_code3
          }));

      // Add European Union (Party) inside the EU group labels
      if (region.iso_code3 === europeSlug) {
        regionCountries.push({
          label: europeLabel,
          value: europeSlug
        });
      }

      regionOptions.push({
        label:
          region.iso_code3 === europeSlug
            ? europeGroupLabel
            : region.wri_standard_name,
        value:
          region.iso_code3 === europeSlug
            ? europeGroupExplorerPagesSlug
            : region.iso_code3,
        iso:
          region.iso_code3 === europeSlug
            ? europeGroupExplorerPagesSlug
            : region.iso_code3,
        expandsTo: regionMembers,
        regionCountries,
        groupId: 'regions'
      });
    });
    const updatedCountryOptions = [];
    const regionISOs = regionOptions.map(r => r.iso);

    countryOptions.forEach(d => {
      if (!regionISOs.includes(d.iso)) {
        updatedCountryOptions.push({
          ...d,
          value: d.iso,
          groupId: 'countries',
          label: d.iso === europeSlug ? europeLabel : d.label
        });
      }
    });
    // eslint-disable-next-line no-confusing-arrow
    const sortedRegions = sortLabelByAlpha(regionOptions).sort(x =>
      x.value === 'TOP' ? -1 : 0
    );

    return sortedRegions.concat(sortLabelByAlpha(updatedCountryOptions));
  }
);

const getLastUpdated = createSelector(
  [getCountryEmissions],
  globalEmissions => {
    if (!globalEmissions) return null;
    return globalEmissions?.[0]?.updated_at;
  }
);

export const getEmissionsByCountry = createSelector(
  [getCountries, getCountryEmissions],
  (countries, countryEmissions) => {
    // TODO: Remove. Just for debugging due to outliers such as VNM
    const countryEmissionsFiltered = countryEmissions?.filter(
      entry =>
        !['VNM', 'FSM', 'PLW', 'MDV', 'MLI'].includes(
          entry?.location?.iso_code3
        )
    );

    const baselineForEntry = entry => {
      if (!entry) return null;
      const baselines = BASELINE_YEARS?.reduce((baseAcc, baseYear) => {
        const targets = TARGET_YEARS?.reduce(
          (targetAcc, targetYear) => ({
            ...targetAcc,
            [targetYear]: {
              unconditional: {
                value: entry?.[`baseline${baseYear}_${targetYear}_uc`],
                percentage:
                  entry?.[`baseline${baseYear}_${targetYear}_uc_percentage`] *
                    100 || null
              },
              conditional: {
                value: entry?.[`baseline${baseYear}_${targetYear}_c`],
                percentage:
                  entry?.[`baseline${baseYear}_${targetYear}_c_percentage`] *
                    100 || null
              }
            }
          }),
          {}
        );
        return { ...baseAcc, [baseYear]: { target: targets } };
      }, {});
      return baselines;
    };

    const targetForEntry = entry => {
      if (!entry) return null;
      return {
        unconditional:
          entry?.targets_nfgs_uc2035 - entry?.targets_nfgs_uc2030 || null,
        conditional:
          entry?.targets_nfgs_c2035 - entry?.targets_nfgs_c2030 || null,
        total_2021: entry?.total_emissions || 0,
        latest_ndc: entry?.latest_ndc
      };
    };

    const processedData = countries?.reduce((acc, country) => {
      const entry = countryEmissionsFiltered?.find(
        ({ location }) => location?.iso_code3 === country?.iso_code3
      );
      return {
        ...acc,
        [country?.iso_code3]: {
          location: country,
          baseline: baselineForEntry(entry),
          target: targetForEntry(entry)
        }
      };
    }, {});

    return processedData;
  }
);

export const getData = createSelector(
  [getEmissionsByCountry, getLocations, getLastUpdated],
  (emissionsByCountry, locations, lastUpdated) => ({
    emissions: emissionsByCountry,
    locations,
    lastUpdated
  })
);
