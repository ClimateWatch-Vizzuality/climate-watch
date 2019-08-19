import { createSelector } from 'reselect';
import { deburrUpper } from 'app/utils';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import { europeSlug, europeanCountries } from 'app/data/european-countries';
import isEmpty from 'lodash/isEmpty';

const getSearch = state => state.search || null;
const getCountries = state => state.countries || null;
const getCategories = state => state.categories || null;
const getIndicatorsData = state => state.indicators || null;
const getQuery = state => deburrUpper(state.query) || '';

export const getISOCountries = createSelector([getCountries], countries =>
  countries.map(country => country.iso_code3)
);

export const getIndicatorsParsed = createSelector(
  [getCategories, getIndicatorsData, getISOCountries],
  (categories, indicators, isos) => {
    if (!categories || !indicators || !indicators.length) return null;
    const categoryId = Object.keys(categories).find(
      id => categories[id].slug == 'longterm_strategy'
    );
    return sortBy(
      uniqBy(
        indicators.map(i => {
          return {
            label: i.name,
            value: i.slug,
            categoryIds: i.category_ids,
            locations: i.locations
          };
        }),
        'value'
      ),
      'label'
    ).filter(ind => ind.categoryIds.indexOf(parseInt(categoryId)) > -1);
  }
);

export const tableGetSelectedData = createSelector(
  [getIndicatorsParsed, getCountries],
  (indicators, countries) => {
    if (!indicators || !indicators.length || !indicators[0].locations)
      return [];

    const refIndicator = indicators[0];

    return Object.keys(refIndicator.locations).map(iso => {
      if (refIndicator.locations[iso].value !== 'No Document Submitted') {
        const countryData =
          countries.find(country => country.iso_code3 === iso) || {};
        let row = {
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
      for (let col in d) {
        if (deburrUpper(d[col]).indexOf(query) > -1) {
          match = true;
          break;
        }
      }
      return match;
    });
  }
);

export const tableRemoveIsoFromData = createSelector(
  [tableGetFilteredData],
  data => {
    if (!data || isEmpty(data)) return null;

    return data.map(d => {
      d.country =
        "<a href='" + `/ndcs/country/${d.iso}` + "'>" + d.country + '</a>';
      delete d.iso;
      delete d["Communication of Long-term Strategy"];
      return d;
    });
  }
);

export default {
  tableRemoveIsoFromData
};
