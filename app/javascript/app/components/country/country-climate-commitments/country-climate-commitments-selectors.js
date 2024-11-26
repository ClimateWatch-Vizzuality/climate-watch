import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { getDocumentsColumns } from 'utils/country-documents';
import { SUBMISSION_ICON_VALUE } from 'data/country-documents';
import { ENHANCEMENT_LABEL_SLUGS, INDICATOR_SLUGS } from 'data/constants';

const getCountries = state => (state.countries && state.countries.data) || null;
const getCountriesDocuments = state => state.countriesDocuments.data || null;
const getIso = state => state.iso || null;
const getNDCS = state =>
  (state.ndcs && state.ndcs.data && state.ndcs.data.indicators) || null;

export const getLoading = state =>
  state.countriesDocuments.loading || state.ndcs.loading;

const getCountry = createSelector([getCountries, getIso], (countries, iso) => {
  if (!countries || !iso) return null;
  return countries.find(country => country.iso_code3 === iso);
});

export const getCountryName = createSelector(
  [getCountry],
  country => (country && country.wri_standard_name) || null
);

const getNetZeroAnd2020StatusValues = createSelector(
  [getNDCS, getIso],
  (indicators, iso) => {
    if (isEmpty(indicators) || !iso) return null;
    const status2020indicator = indicators.find(
      i => i.slug === INDICATOR_SLUGS.enhancements
    );
    const netZeroIndicator = indicators.find(i => i.slug === 'nz_status');

    if (!status2020indicator || !netZeroIndicator) return null;

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
      netZeroIndicator &&
      netZeroIndicator.locations[iso] &&
      netZeroIndicator.locations[iso].label_id;
    const statusNetZeroLabel =
      netZeroIndicator &&
      netZeroIndicator.labels &&
      statusNetZeroLabelId &&
      netZeroIndicator.labels[statusNetZeroLabelId];
    const statusNetZeroValue =
      {
        'Net-zero Target in Law': SUBMISSION_ICON_VALUE.yes,
        'Net-zero Target in Policy Document': SUBMISSION_ICON_VALUE.yes,
        'Net-zero Target in Political Pledge': SUBMISSION_ICON_VALUE.yes
      }[statusNetZeroLabel && statusNetZeroLabel.name] ||
      SUBMISSION_ICON_VALUE.no;

    return [
      ['Net-Zero Target', statusNetZeroValue],
      ['2020 NDC', status2020value]
    ];
  }
);

export const getCountriesDocumentsValues = createSelector(
  [getCountriesDocuments, getIso, getNetZeroAnd2020StatusValues],
  (countriesDocuments, iso, netZeroAnd2020Values) => {
    if (!countriesDocuments || !iso || !countriesDocuments[iso]) return null;
    const DOCUMENT_COLUMNS_SLUGS = {
      'First NDC': 'first_ndc',
      'Long-term Strategy': 'lts'
    };
    const documentColumns = getDocumentsColumns(
      countriesDocuments[iso],
      DOCUMENT_COLUMNS_SLUGS
    );

    const sortedKeys = [
      'First NDC',
      '2020 NDC',
      'Long-term Strategy',
      'Net-Zero Target'
    ];

    return Object.entries(documentColumns)
      .concat(netZeroAnd2020Values || [])
      .sort((a, b) => sortedKeys.indexOf(a[0]) - sortedKeys.indexOf(b[0]));
  }
);
