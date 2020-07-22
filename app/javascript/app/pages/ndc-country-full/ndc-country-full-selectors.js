import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';

const DEFAULT_LANGUAGE = 'EN';

const getCountries = state => state.countries.data;
const getSelected = state => state.document || null;
const getContent = state => state.content || null;

export const getCountry = createSelector(
  [getCountries, (_, iso) => iso],
  (countries, iso) => countries.find(country => country.iso_code3 === iso)
);

export const getSelectedContent = createSelector(
  [getSelected, getContent],
  (selected, content) => {
    if (!content || !content.length) return null;
    if (!selected) return content[0];
    const splitSelected = selected.split('-');
    const selectedContent = content.find(
      ({ document_type, language }) =>
        document_type === splitSelected[0] && language === splitSelected[1]
    );
    if (selectedContent) return selectedContent;
    return content.find(
      ({ document_type, language }) =>
        document_type === splitSelected[0] && language === DEFAULT_LANGUAGE
    );
  }
);

const getLabel = item =>
  `${item.document_type.toUpperCase()} (${item.language.toUpperCase()})`;

export const getContentOptions = createSelector(getContent, content =>
  uniqBy(
    (content || []).map(item => ({
      value: `${item.document_type}-${item.language}`,
      label: getLabel(item)
    })),
    'value'
  )
);

export const getContentOptionSelected = createSelector(
  [getSelected, getContentOptions],
  (selected, options) => {
    if (!selected) return options[0];
    // Allow finding document only by document name and default to English
    return (
      options.find(option => option.value === selected) ||
      options.find(
        option => option.value === `${selected}-${DEFAULT_LANGUAGE}`
      ) ||
      options.find(option => option.value.startsWith(selected))
    );
  }
);

export default {
  getCountry,
  getContent,
  getSelectedContent,
  getContentOptions
};
