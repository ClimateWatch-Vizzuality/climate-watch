import { createSelector } from 'reselect';
import { deburrUpper, filterQuery } from 'app/utils';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';

const getCountries = state => state.countries || null;
const getCategories = state => state.categories || null;
const getIndicatorsData = state => state.indicators || null;
const getQuery = state => deburrUpper(state.query) || '';

export const getISOCountries = createSelector([getCountries], countries =>
  countries.map(country => country.iso_code3)
);

export const getIndicatorsParsed = createSelector(
  [getCategories, getIndicatorsData],
  (categories, indicators) => {
    if (!categories || !indicators || !indicators.length) return null;
    const categoryId = Object.keys(categories).find(
      id => categories[id].slug === 'ndc_enhancement'
    );
    return sortBy(
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
    ).filter(ind => ind.categoryIds.indexOf(parseInt(categoryId, 10)) > -1);
  }
);

export const tableGetSelectedData = createSelector(
  [getIndicatorsParsed, getCountries],
  (indicators, countries) => {
    if (!indicators || !indicators.length || !indicators[0].locations) {
      return [];
    }

    const refIndicator = indicators[0];

    return Object.keys(refIndicator.locations).map(iso => {
      if (refIndicator.locations[iso].label_slug !== 'no_info_2020') {
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
      }
      return false;
    });
  }
);

export const tableRemoveIsoFromData = createSelector(
  [tableGetSelectedData],
  data => {
    if (!data || isEmpty(data)) return null;
    return data.filter(Boolean).map(d => {
      const updatedD = { ...d };
      let date = d['Statement Date'];
      try {
        date = new Date(d['Statement Date']);
        date = !isNaN(date.getTime())
          ? {
            name: date.toLocaleDateString('en-US'),
            value: date.getTime()
          }
          : {
            name: undefined,
            value: undefined
          };
      } catch (e) {
        console.error(e);
      }
      updatedD['Statement Date'] = date;
      updatedD['Source Link'] = d['Source Link']
        ? d['Source Link'].replace('href=', "target='_blank' href=")
        : undefined;
      updatedD.country = `<a href="/ndcs/country/${d.iso}">${d.country}</a>`;
      delete updatedD.iso;
      return updatedD;
    });
  }
);

export const getDefaultColumns = createSelector(
  [getIndicatorsParsed],
  indicators => {
    if (!indicators || isEmpty(indicators)) return [];

    const columnIds = [
      'country',
      'ndce_ghg',
      'ndce_status_2020',
      'ndce_statement',
      'ndce_source',
      'ndce_date'
    ];

    return columnIds.map(id => {
      const match = indicators.find(indicator => indicator.value === id);
      return match ? match.label : id;
    });
  }
);

const getFilteredData = createSelector(
  [tableRemoveIsoFromData, getDefaultColumns],
  (data, columnHeaders) => {
    if (!data || isEmpty(data)) return null;
    return data.map(d => {
      const filteredHeadersD = {};
      Object.keys(d).forEach(k => {
        if (columnHeaders.includes(k)) {
          filteredHeadersD[k] = d[k];
        }
      });
      return filteredHeadersD;
    });
  }
);

export const getFilteredDataBySearch = createSelector(
  [getFilteredData, getQuery],
  (data, query) => {
    if (!data || isEmpty(data)) return null;
    return filterQuery(data, query);
  }
);
