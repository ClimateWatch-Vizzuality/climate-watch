import { createSelector } from 'reselect';
import { deburrUpper, filterQuery } from 'app/utils';
import { replaceStringAbbr } from 'components/abbr-replace';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import invert from 'lodash/invert';
import {
  NDC_2025_LABEL_COLORS,
  NDC_2025_LABEL_SLUGS,
  ENHANCEMENT_LABEL_SLUGS,
  ENHANCEMENT_2025_LABELS_WITH_LETTERS,
  INDICATOR_SLUGS
} from 'data/constants';
import { getCompareLinks } from 'components/ndcs/ndcs-enhancements-map/ndcs-enhancements-map-selectors';

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
    const sortAndParseIndicators = (ind, isPreviousComparison) =>
      sortBy(
        uniqBy(
          ind &&
            ind.map(i => ({
              label: i.name,
              value: i.slug,
              categoryIds: i.category_ids,
              locations: i.locations,
              labels: i.labels,
              isPreviousComparison
            })),
          'value'
        ),
        'label'
      );
    const filteredIndicators = sortAndParseIndicators(indicators);

    return previousComparisonIndicators
      ? filteredIndicators.concat(
        sortAndParseIndicators(previousComparisonIndicators, true)
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
    const refIndicator = indicators.find(
      ind => ind.value === INDICATOR_SLUGS.submitted2025
    );
    const noInformationLabelId = Object.entries(refIndicator.labels).find(
      ([, { name }]) => name === 'No Information'
    )?.[0];

    return Object.keys(refIndicator.locations)
      .map(iso => {
        if (refIndicator.locations[iso]?.label_id === noInformationLabelId) {
          return null;
        }
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
              row[ind.isPreviousComparison ? ind.value : ind.label] =
                ind.locations[iso].value;
            }
          }
        });
        return row;
      })
      .filter(Boolean);
  }
);

const INVERTED_NDC_2025_LABEL_SLUGS = invert(NDC_2025_LABEL_SLUGS);

export const getLoadingCompareLinks = createSelector(
  [getCompareLinks],
  compareLinks => {
    if (!compareLinks) return true;
    return false;
  }
);

export const tableRemoveIsoFromData = createSelector(
  [tableGetSelectedData, getCompareLinks],
  (data, compareLinks) => {
    if (!data || isEmpty(data) || !compareLinks) {
      return null;
    }
    const updatedData = data.filter(Boolean).map(d => {
      const updatedD = { ...d };
      updatedD['2025 Statement'] = updatedD['2025 NDC Statement'];

      const color =
        (d['2025 NDC Submission'] &&
          NDC_2025_LABEL_COLORS[
            INVERTED_NDC_2025_LABEL_SLUGS[d['2025 NDC Submission']]
          ]) ||
        NDC_2025_LABEL_COLORS.NO_SUBMISSION;
      updatedD['NDC Status'] = d['2025 NDC Submission'] && {
        color,
        text:
          {
            'Submitted 2025 NDC': 'New NDC',
            'No Information': 'No New NDC'
          }[d['2025 NDC Submission']] || d['2025 NDC Submission'],
        sortIndex: Object.values(NDC_2025_LABEL_SLUGS).indexOf(
          d['2025 NDC Submission']
        )
      };

      updatedD['Source Link'] = d.Source
        ? d.Source.replace('href=', "target='_blank' href=")
        : undefined;

      updatedD.country = `<a href="/ndcs/country/${d.iso}">${d.country}</a>`;

      if (compareLinks) {
        const compareLink = compareLinks[d.iso] || {};
        const hasPreviousSubmission =
          d['NDC Status'] &&
          [
            ENHANCEMENT_LABEL_SLUGS.SUBMITTED_2025,
            ENHANCEMENT_LABEL_SLUGS.ENHANCED_MITIGATION
          ].includes(d['NDC Status'].slug);

        updatedD[
          'Overall comparison with previous NDC'
        ] = ENHANCEMENT_2025_LABELS_WITH_LETTERS.map(
          enhancementLabelWithLetter => ({
            ...enhancementLabelWithLetter,
            value: d[enhancementLabelWithLetter.value]
          })
        );
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
    const columnIds = [
      'country',
      INDICATOR_SLUGS.emissions,
      'NDC Status',
      'Overall comparison with previous NDC',
      '2025 Statement',
      'Source Link',
      'Date'
    ];

    return columnIds.map(id => {
      const match = indicators.find(indicator => indicator.value === id);
      return match ? match.label : id;
    });
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
        updatedD[key] =
          typeof d[key] === 'string' ? replaceStringAbbr(d[key]) : d[key];
      });
      return updatedD;
    });
  }
);
