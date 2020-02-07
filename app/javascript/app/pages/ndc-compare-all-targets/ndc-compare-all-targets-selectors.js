import { createSelector } from 'reselect';
import { deburrUpper, filterQuery } from 'app/utils';
import isEmpty from 'lodash/isEmpty';

const getCountries = state => (state.countries && state.countries.data) || null;
const getIndicatorsData = state =>
  (state.compareAll.data && state.compareAll.data.indicators) || null;
export const getLoading = state => state.compareAll.loading || null;
export const getQuery = (state, { search }) =>
  (search.search && deburrUpper(search.search)) || '';

const getData = createSelector(
  [getCountries, getIndicatorsData],
  (countries, indicators) => {
    if (!countries || !indicators || !indicators.length) return null;
    const ndcIndicator = indicators.find(i => i.slug === 'submission');
    const emissionsIndicator = indicators.find(i => i.slug === 'ndce_ghg');
    const ltsIndicator = indicators.find(i => i.slug === 'lts_submission');
    const rows = countries.map(c => {
      const countryNDC = ndcIndicator.locations[c.iso_code3];
      const countryLTS = ltsIndicator.locations[c.iso_code3];
      const countryEmissions = emissionsIndicator.locations[c.iso_code3];
      return {
        Country: c.wri_standard_name,
        'Share of global GHG emissions':
          countryEmissions && countryEmissions.value,
        INDC:
          countryNDC.value === 'INDC Submitted' ||
          countryNDC.value === 'First NDC Submitted' ||
          countryNDC.value === 'Second NDC Submitted',
        NDC:
          countryNDC.value === 'First NDC Submitted' ||
          countryNDC.value === 'Second NDC Submitted',
        '2nd NDC': countryNDC.value === 'Second NDC Submitted',
        LTS: countryLTS
          ? countryLTS.value === 'Long-term Strategy Submitted'
          : false
      };
    });
    return rows;
  }
);

export const getColumns = createSelector([getData], rows => {
  if (!rows) return [];
  //   'Country', X
  //   'Share of global GHG emissions', X
  //   'Pre-2020 pledge', Missing
  //   'INDC', X
  //   'NDC', X
  //   '2nd NDC', X
  //   'Targets in National Policies', Missing
  //   'LTS' X
  return rows[0] && Object.keys(rows[0]);
});

export const getFilteredDataBySearch = createSelector(
  [getData, getQuery],
  (data, query) => {
    if (!data || isEmpty(data)) return null;
    return filterQuery(data, query);
  }
);