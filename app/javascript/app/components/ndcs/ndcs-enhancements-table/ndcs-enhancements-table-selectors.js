import { createSelector } from 'reselect';
import { deburrUpper, filterQuery } from 'app/utils';
import { replaceStringAbbr } from 'components/abbr-replace';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import pick from 'lodash/pick';
import isEmpty from 'lodash/isEmpty';
import invert from 'lodash/invert';
import {
  ENHANCEMENT_CATEGORIES,
  ENHANCEMENT_LABEL_SLUGS,
  ENHANCEMENT_LABEL_COLORS,
  ENHANCEMENT_LABELS_WITH_LETTERS,
  INDICATOR_SLUGS
} from 'data/constants';
import { getCompareLinks } from 'components/ndcs/ndcs-enhancements-map/ndcs-enhancements-map-selectors';

const FEATURE_ENHANCEMENT_CHANGES =
  process.env.FEATURE_ENHANCEMENT_CHANGES === 'true';

const getCountries = state => state.countries || null;
const getCategories = state => state.categories || null;
const getIndicatorsData = state => state.indicators || null;
const getPreviousComparisonData = state =>
  (state.ndcsPreviousComparison && state.ndcsPreviousComparison.data) || null;
const getQuery = state => deburrUpper(state.query) || '';

export const getISOCountries = createSelector([getCountries], countries =>
  countries.map(country => country.iso_code3)
);

export const getIndicatorsParsed = createSelector(
  [getCategories, getIndicatorsData, getPreviousComparisonData],
  (categories, indicators, previousComparisonIndicators) => {
    if (!categories || !indicators || !indicators.length) return null;
    const categoryId = Object.keys(categories).find(id =>
      ENHANCEMENT_CATEGORIES.includes(categories[id].slug)
    );
    const sortAndParseIndicators = (ind, isPreviousComparison) =>
      sortBy(
        uniqBy(
          ind &&
            ind.map(i => ({
              label: i.name,
              value: i.slug,
              categoryIds: i.category_ids,
              locations: i.locations,
              isPreviousComparison
            })),
          'value'
        ),
        'label'
      );
    const filteredIndicators = sortAndParseIndicators(indicators).filter(
      ind => ind.categoryIds.indexOf(parseInt(categoryId, 10)) > -1
    );

    return previousComparisonIndicators
      ? filteredIndicators.concat(
        sortAndParseIndicators(previousComparisonIndicators)
      )
      : filteredIndicators;
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

export const getLoadingCompareLinks = createSelector(
  [getCompareLinks],
  compareLinks => {
    if (FEATURE_ENHANCEMENT_CHANGES && !compareLinks) return true;
    return false;
  }
);

export const tableRemoveIsoFromData = createSelector(
  [tableGetSelectedData, getCompareLinks],
  (data, compareLinks) => {
    if (
      !data ||
      isEmpty(data) ||
      (FEATURE_ENHANCEMENT_CHANGES && !compareLinks)
    ) { return null; }
    const updatedData = data.filter(Boolean).map(d => {
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

      if (FEATURE_ENHANCEMENT_CHANGES) {
        const color =
          d['NDC Status'] &&
          ENHANCEMENT_LABEL_COLORS[
            INVERTED_ENHANCEMENT_LABEL_SLUGS[d['NDC Status'].slug]
          ];
        updatedD['NDC Status'] = d['NDC Status'] && {
          color,
          text: d['NDC Status'].label,
          sortIndex:
            color === ENHANCEMENT_LABEL_COLORS.SUBMITTED_2020 ? '1' : '0'
        };
      } else {
        updatedD['NDC Status'] = d['NDC Status'] && d['NDC Status'].label;
      }

      updatedD['Source Link'] = d['Source Link']
        ? d['Source Link'].replace('href=', "target='_blank' href=")
        : undefined;

      updatedD.country = `<a href="/ndcs/country/${d.iso}">${d.country}</a>`;

      if (compareLinks) {
        const compareLink = compareLinks[d.iso] || {};
        const hasPreviousSubmission =
          d['NDC Status'] &&
          [
            ENHANCEMENT_LABEL_SLUGS.SUBMITTED_2020,
            ENHANCEMENT_LABEL_SLUGS.ENHANCED_MITIGATION
          ].includes(d['NDC Status'].slug);
        updatedD[
          'Overall comparison with previous NDC'
        ] = ENHANCEMENT_LABELS_WITH_LETTERS.map(enhancementLabelWithLetter => ({
          ...enhancementLabelWithLetter,
          value: d[enhancementLabelWithLetter.value]
        }));

        updatedD['Compare with previous submissions'] = hasPreviousSubmission
          ? `<a href="${compareLink.link}" title=${d['NDCE Compare']}">${d['NDCE Compare']}</a>`
          : d['NDCE Compare'];
      }
      delete updatedD.iso;
      return updatedD;
    });
    return updatedData;
  }
);

export const getDefaultColumns = createSelector(
  [getIndicatorsParsed],
  indicators => {
    if (!indicators || isEmpty(indicators)) return [];

    const columnIds = FEATURE_ENHANCEMENT_CHANGES
      ? [
        'country',
        INDICATOR_SLUGS.emissions,
        INDICATOR_SLUGS.enhancements,
        'Compare with previous submissions',
        'Overall comparison with previous NDC',
        'ndce_statement',
        'ndce_source',
        'ndce_date'
      ]
      : [
        'country',
        INDICATOR_SLUGS.emissions,
        INDICATOR_SLUGS.enhancements,
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

export const getFilteredData = createSelector(
  [tableRemoveIsoFromData, getDefaultColumns],
  (data, columnHeaders) => {
    if (!data || !columnHeaders) return null;
    return data.map(d => pick(d, columnHeaders));
  }
);

export const getFilteredDataBySearch = createSelector(
  [tableRemoveIsoFromData, getQuery],
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
      const updatedD = d;
      Object.keys(updatedD).forEach(key => {
        updatedD[key] = replaceStringAbbr(d[key]);
      });
      return updatedD;
    });
  }
);
