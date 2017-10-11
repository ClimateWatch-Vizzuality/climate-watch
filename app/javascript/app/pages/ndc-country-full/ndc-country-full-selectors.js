import { createSelector } from 'reselect';

const getCountries = state => state.countries.data;
const getSelected = state => state.document || null;
const getContent = state => state.content || null;

export const getCountry = createSelector(
  [getCountries, (countries, iso) => iso],
  (countries, iso) => countries.find(country => country.iso_code3 === iso)
);

export const getSelectedContent = createSelector(
  [getSelected, getContent],
  (selected, content) => {
    if (!content || !content.length) return null;
    if (!selected) return content[0];
    return content.find(item => item.document_type === selected, 10);
  }
);

const getLabel = item =>
  `${item.document_type.toUpperCase()} (${item.language.toUpperCase()})`;

export const getContentOptions = createSelector(getContent, content =>
  (content || []).map(item => ({
    value: item.document_type,
    label: getLabel(item)
  }))
);

export const getContentOptionSelected = createSelector(
  [getSelected, getContentOptions],
  (selected, options) => {
    if (!selected) return options[0];
    return options.find(option => option.value === selected);
  }
);

export default {
  getCountry,
  getContent,
  getSelectedContent,
  getContentOptions
};
