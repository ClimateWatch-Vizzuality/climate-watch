import { createSelector } from 'reselect';
import { deburrUpper, filterQuery } from 'app/utils';
import { replaceStringAbbr } from 'components/abbr-replace';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import invert from 'lodash/invert';
import {
  ENHANCEMENT_CATEGORIES,
  ENHANCEMENT_LABEL_SLUGS,
  ENHANCEMENT_LABEL_COLORS,
  INDICATOR_SLUGS
} from 'data/constants';
import { getCompareLinks } from 'components/ndcs/ndcs-enhancements-map/ndcs-enhancements-map-selectors';

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
    const categoryId = Object.keys(categories).find(id =>
      ENHANCEMENT_CATEGORIES.includes(categories[id].slug)
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
            if (ind.value === INDICATOR_SLUGS.enhancements) {
              row[ind.label] = {
                slug: ind.locations[iso].label_slug,
                label: ind.locations[iso].value
              };
            } else {
              row[ind.label] = ind.locations[iso].value;
            }
          }
        });
        return row;
      }
      return false;
    });
  }
);

const INVERTED_ENHANCEMENT_LABEL_SLUGS = invert(ENHANCEMENT_LABEL_SLUGS);

export const tableRemoveIsoFromData = createSelector(
  [tableGetSelectedData, getCompareLinks],
  (data, compareLinks) => {
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
      updatedD['Statement Date'] = date.name;
      updatedD['NDC Status'] = {
        color:
          ENHANCEMENT_LABEL_COLORS[
            INVERTED_ENHANCEMENT_LABEL_SLUGS[d['NDC Status'].slug]
          ],
        text: d['NDC Status'].label
      };
      updatedD['Source Link'] = d['Source Link']
        ? d['Source Link'].replace('href=', "target='_blank' href=")
        : undefined;
      updatedD.country = `<a href="/ndcs/country/${d.iso}">${d.country}</a>`;
      if (compareLinks) {
        const compareLink = compareLinks[d.iso] || {};
        const hasPreviousSubmission = [
          ENHANCEMENT_LABEL_SLUGS.SUBMITTED_2020,
          ENHANCEMENT_LABEL_SLUGS.ENHANCED_MITIGATION
        ].includes(d['NDC Status']);

        updatedD['Compare with previous submissions'] = hasPreviousSubmission
          ? `<a href="${compareLink.link}" title="Compare with previous submissions">Compare with previous submissions</a>`
          : 'No comparison available';
      }
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
      INDICATOR_SLUGS.emissions,
      INDICATOR_SLUGS.enhancements,
      'Compare with previous submissions',
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

export const replaceAbbreviations = createSelector(
  [getFilteredDataBySearch],
  data => {
    if (!data || isEmpty(data)) return null;
    return data.map(d => {
      const updatedD = { ...d };
      Object.keys(updatedD).forEach(key => {
        updatedD[key] = replaceStringAbbr(d[key]);
      });
      return updatedD;
    });
  }
);
