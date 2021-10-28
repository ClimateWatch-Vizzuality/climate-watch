import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { getDocumentsColumns } from 'utils/country-documents';
import { SUBMISSION_ICON_VALUE } from 'data/country-documents';
import { ENHANCEMENT_LABEL_SLUGS, INDICATOR_SLUGS } from 'data/constants';

const getPreviousComparisonIndicators = state =>
  state.ndcsPreviousComparison && state.ndcsPreviousComparison.data;

const getCountriesDocuments = state => state.countriesDocuments.data || null;

const getIso = state => state.iso || null;
const getNDCS = state =>
  (state.ndcs && state.ndcs.data && state.ndcs.data.indicators) || null;

export const getPreviousComparisonCountryValues = createSelector(
  [getPreviousComparisonIndicators, getIso],
  (previousComparisonIndicators, iso) => {
    if (!previousComparisonIndicators) return null;
    return previousComparisonIndicators.map(indicator => [
      indicator.name,
      indicator.locations[iso].value
    ]);
  }
);

const getNetZeroAnd2020StatusValues = createSelector(
  [getNDCS, getIso],
  (indicators, iso) => {
    if (isEmpty(indicators) || !iso) return null;
    const status2020indicator = indicators.find(
      i => i.slug === INDICATOR_SLUGS.enhancements
    );
    const netZeroindicator = indicators.find(i => i.slug === 'nz_status');

    const status2020Label =
      status2020indicator &&
      status2020indicator.locations[iso] &&
      status2020indicator.locations[iso].label_slug;
    const status2020value =
      {
        [ENHANCEMENT_LABEL_SLUGS.SUBMITTED_2020]: SUBMISSION_ICON_VALUE.yes,
        [ENHANCEMENT_LABEL_SLUGS.ENHANCED_MITIGATION]:
          SUBMISSION_ICON_VALUE.yes,
        [ENHANCEMENT_LABEL_SLUGS.INTENDS_TO_ENHANCE]:
          SUBMISSION_ICON_VALUE.intends
      }[status2020Label] || SUBMISSION_ICON_VALUE.no;

    const statusNetZeroLabelId =
      netZeroindicator &&
      netZeroindicator.locations[iso] &&
      netZeroindicator.locations[iso].label_id;
    const statusNetZeroLabel =
      netZeroindicator &&
      netZeroindicator.labels &&
      statusNetZeroLabelId &&
      netZeroindicator.labels[statusNetZeroLabelId];
    const statusNetZeroValue =
      {
        'Net-zero Target in Law': SUBMISSION_ICON_VALUE.yes,
        'Net-zero Target in Policy Document': SUBMISSION_ICON_VALUE.yes,
        'Net-zero Target in Political Pledge': SUBMISSION_ICON_VALUE.yes
      }[statusNetZeroLabel && statusNetZeroLabel.name] ||
      SUBMISSION_ICON_VALUE.no;

    return [
      ['Net Zero', statusNetZeroValue],
      ['2020 NDC', status2020value]
    ];
  }
);

export const getCountriesDocumentsValues = createSelector(
  [getCountriesDocuments, getIso, getNetZeroAnd2020StatusValues],
  (countriesDocuments, iso, netZeroAnd2020Values) => {
    if (!countriesDocuments || !iso || !countriesDocuments[iso]) return null;
    const DOCUMENT_COLUMNS_SLUGS = {
      NDC: 'first_ndc',
      'Long Term Support': 'lts'
    };
    const documentColumns = getDocumentsColumns(
      countriesDocuments[iso],
      DOCUMENT_COLUMNS_SLUGS
    );
    return Object.entries(documentColumns)
      .map(entry => entry)
      .concat(netZeroAnd2020Values || []);
  }
);
