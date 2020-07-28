import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import { filterQuery } from 'app/utils';
import { getMapIndicator } from 'components/ndcs/ndcs-explore-map/ndcs-explore-map-selectors';
import {
  getIndicatorsParsed,
  getQuery
} from 'components/ndcs/lts-explore-table/lts-explore-table-selectors';

const getCountries = state => state.countries || null;

export const getISOCountries = createSelector([getCountries], countries =>
  countries.map(country => country.iso_code3)
);

const getSelectedIndicatorHeader = createSelector(
  [getMapIndicator],
  selectedIndicator => {
    if (!selectedIndicator) return null;
    return `${selectedIndicator.label} (Current selection)`;
  }
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

export const tableGetSelectedData = createSelector(
  [getIndicatorsParsed, getCountries],
  (indicators, countries) => {
    if (
      !indicators ||
      !indicators.length ||
      !indicators[0].locations ||
      !countries
    ) {
      return [];
    }

    const refIndicator =
      indicators.find(i => i.value === 'submission') ||
      indicators.find(i => !isEmpty(i.locations));
    if (!refIndicator) return null;
    return Object.keys(refIndicator.locations).map(iso => {
      if (refIndicator.locations[iso].value === 'No Document Submitted') {
        return false;
      }
      const countryData =
        countries.find(country => country.iso_code3 === iso) || {};
      const row = {
        country: countryData.wri_standard_name || iso,
        iso
      };
      indicators.forEach(ind => {
        if (ind.locations[iso]) {
          row[ind.label] = ind.locations[iso].value;
        }
      });
      return row;
    });
  }
);

const addIndicatorColumn = createSelector(
  [tableGetSelectedData, getMapIndicator, getSelectedIndicatorHeader],
  (data, selectedIndicator, selectedIndicatorHeader) => {
    if (
      !data ||
      isEmpty(data) ||
      !selectedIndicator ||
      !selectedIndicator.locations ||
      !selectedIndicatorHeader
    ) {
      return null;
    }
    const updatedTableData = data;
    return updatedTableData.map(countryRow => {
      const updatedCountryRow = { ...countryRow };
      const countryIndicatorData = selectedIndicator.locations[countryRow.iso];
      updatedCountryRow[selectedIndicatorHeader] =
        countryIndicatorData && countryIndicatorData.value;
      return updatedCountryRow;
    });
  }
);

const getFilteredData = createSelector(
  [addIndicatorColumn, getDefaultColumns],
  (data, columnHeaders) => {
    if (!data || isEmpty(data)) return null;
    const filteredData = data.map(d => {
      const filteredAndChangedHeadersD = {};
      Object.keys(d).forEach(k => {
        const header = HEADER_CHANGES[k] || k;
        if (columnHeaders.includes(header)) {
          filteredAndChangedHeadersD[header] = d[k];
        }
        // Leave iso and filter it later to get titleLink
        if (k === 'iso') {
          filteredAndChangedHeadersD.iso = d.iso;
        }
      });
      return filteredAndChangedHeadersD;
    });
    return sortBy(filteredData, ['country']);
  }
);

const getFilteredDataBySearch = createSelector(
  [getFilteredData, getQuery],
  (data, query) => {
    if (!data || isEmpty(data)) return null;
    return filterQuery(data, query, ['iso']);
  }
);

export const getTitleLinks = createSelector([getFilteredDataBySearch], data => {
  if (!data || isEmpty(data)) return null;
  return data.map(d => [
    {
      columnName: 'country',
      url: `/ndcs/country/${d.iso}`
    }
  ]);
});

export const removeIsoFromData = createSelector(
  [getFilteredDataBySearch],
  data => {
    if (!data || isEmpty(data)) return null;
    return data.map(d => {
      const updatedD = {};
      Object.keys(d).forEach(key => {
        if (key !== 'iso') {
          updatedD[key] = d[key];
        }
      });
      return updatedD;
    });
  }
);
