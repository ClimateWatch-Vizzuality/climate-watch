import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { filterQuery } from 'app/utils';
import {
  getSelectedIndicatorHeader,
  addIndicatorColumn,
  getIndicatorsParsed,
  getQuery
} from 'components/ndcs/lts-explore-table/lts-explore-table-selectors';

const getCountries = state => state.countries || null;

export const getISOCountries = createSelector([getCountries], countries =>
  countries.map(country => country.iso_code3)
);

const HEADER_CHANGES = {
  'Communication of Long-term Strategy':
    'Latest submission (Current selection)',
  Document: 'NDCs submission Link',
  'Submission Date': 'Date of NDCs submission',
  'Share of GHG Emissions': 'Share of global GHG emissions'
};

export const getDefaultColumns = createSelector(
  [getIndicatorsParsed, getSelectedIndicatorHeader],
  (indicators, selectedIndicatorHeader) => {
    if (!indicators || isEmpty(indicators)) return [];
    const columnIds = [
      'country',
      selectedIndicatorHeader,
      'submission',
      'submission_date',
      'ndce_ghg'
    ];

    const columns = columnIds.map(id => {
      const match = indicators.find(indicator => indicator.value === id);
      return match ? match.label : id;
    });
    return columns.map(c => HEADER_CHANGES[c] || c);
  }
);

const getFilteredData = createSelector(
  [addIndicatorColumn, getDefaultColumns],
  (data, columnHeaders) => {
    if (!data || isEmpty(data)) return null;
    return data.map(d => {
      const filteredAndChangedHeadersD = {};
      Object.keys(d).forEach(k => {
        const header = HEADER_CHANGES[k] || k;
        if (columnHeaders.includes(header)) {
          filteredAndChangedHeadersD[header] = d[k];
        }
      });
      return filteredAndChangedHeadersD;
    });
  }
);

export const getTitleLinks = createSelector([addIndicatorColumn], data => {
  if (!data || isEmpty(data)) return null;
  return data.map(d => [
    {
      columnName: 'country',
      url: `/ndcs/country/${d.iso}`
    }
  ]);
});

export const getFilteredDataBySearch = createSelector(
  [getFilteredData, getQuery],
  (data, query) => {
    if (!data || isEmpty(data)) return null;
    return filterQuery(data, query);
  }
);
