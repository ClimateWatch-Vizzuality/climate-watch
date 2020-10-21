import { createSelector } from 'reselect';
import { deburrUpper, filterQuery } from 'app/utils';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import { getMapIndicator } from 'components/ndcs/net-zero-map/net-zero-map-selectors';

const getCountries = state => state.countries || null;
const getCategories = state => state.categories || null;
const getIndicatorsData = state => state.indicators || null;
export const getQuery = state => deburrUpper(state.query) || '';

export const getISOCountries = createSelector([getCountries], countries =>
  countries.map(country => country.iso_code3)
);

export const getIndicatorsParsed = createSelector(
  [getCategories, getIndicatorsData, getISOCountries],
  (categories, indicators) => {
    if (!categories || !indicators || !indicators.length) return null;
    const parsedIndicators = sortBy(
      uniqBy(
        indicators.map(i => ({
          label: i.name,
          value: i.slug,
          categoryIds: i.category_ids,
          locations: i.locations
        })),
        'value'
      ),
      'label'
    );
    return parsedIndicators;
  }
);

export const tableGetSelectedData = createSelector(
  [getIndicatorsParsed, getCountries],
  (indicators, countries) => {
    if (!indicators || !indicators.length || !indicators[0].locations) {
      return [];
    }
    const refIndicator =
      indicators.find(i => i.value === 'lts_submission') || indicators[0];

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

const headerChanges = {
  'Communication of Long-term Strategy':
    'Latest submission (Current selection)',
  Document: 'LTS submission Link',
  'Submission Date': 'Date of LTS submission',
  'Long-term Strategy Document': 'Long-term Strategies Document',
  'Share of GHG Emissions': 'Share of global GHG emissions'
};

export const getSelectedIndicatorHeader = createSelector(
  [getMapIndicator],
  selectedIndicator => {
    if (!selectedIndicator) return null;
    return `${selectedIndicator.label} (Current selection)`;
  }
);

export const getExtraColumn = createSelector(
  [getMapIndicator],
  selectedIndicator => {
    if (!selectedIndicator) return null;
    return selectedIndicator.value === 'lts_submission' ? 'lts_target' : null;
  }
);

export const getDefaultColumns = createSelector(
  [getIndicatorsParsed, getSelectedIndicatorHeader, getExtraColumn],
  (indicators, selectedIndicatorHeader, extraColumn) => {
    if (!indicators || isEmpty(indicators)) return [];
    const columnIds = [
      'country',
      selectedIndicatorHeader,
      'lts_document',
      'lts_date',
      'lts_ghg'
    ];

    if (extraColumn) {
      columnIds.splice(2, 0, extraColumn);
    }

    const columns = columnIds.map(id => {
      const match = indicators.find(indicator => indicator.value === id);
      return match ? match.label : id;
    });
    return columns.map(c => headerChanges[c] || c);
  }
);

export const addIndicatorColumn = createSelector(
  [tableGetSelectedData, getMapIndicator, getSelectedIndicatorHeader],
  (data, selectedIndicator, selectedIndicatorHeader) => {
    if (!data || isEmpty(data)) return null;
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

const addDocumentTarget = createSelector([addIndicatorColumn], data => {
  if (!data || isEmpty(data)) return null;
  return data.map(d => {
    const updatedTableDataItem = { ...d };
    updatedTableDataItem.Document = updatedTableDataItem.Document
      ? updatedTableDataItem.Document.replace('href=', "target='_blank' href=")
      : undefined;
    return updatedTableDataItem;
  });
});

const getFilteredData = createSelector(
  [addDocumentTarget, getDefaultColumns],
  (data, columnHeaders) => {
    if (!data || isEmpty(data)) return null;
    const filteredData = data.map(d => {
      const filteredAndChangedHeadersD = {};
      Object.keys(d).forEach(k => {
        const header = headerChanges[k] || k;
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
      url: `/lts/country/${d.iso}`
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
