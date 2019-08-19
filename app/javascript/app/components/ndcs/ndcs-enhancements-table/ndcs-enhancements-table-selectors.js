import { createSelector } from 'reselect';
import { deburrUpper } from 'app/utils';
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

export const tableGetFilteredData = createSelector(
  [tableGetSelectedData, getQuery],
  (data, query) => {
    if (!data || isEmpty(data)) return null;
    return data.filter(d => {
      let match = false;
      Object.keys(d).forEach(col => {
        if (deburrUpper(d[col]).indexOf(query) > -1) {
          match = true;
        }
      });
      return match;
    });
  }
);

export const tableRemoveIsoFromData = createSelector(
  [tableGetFilteredData],
  data => {
    if (!data || isEmpty(data)) return null;
    return data.map(d => {
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
      d['Statement Date'] = date;
      d['Source Link'] = d['Source Link']
        ? d['Source Link'].replace('href=', "target='_blank' href=")
        : undefined;
      d.country = `${"<a href='" +
        `/ndcs/country/${d.iso}` +
        "'>"}${d.country}</a>`;
      delete d.iso;
      return d;
    });
  }
);

export default {
  tableRemoveIsoFromData
};
