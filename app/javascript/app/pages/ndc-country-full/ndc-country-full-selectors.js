import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';

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
    const splitSelected = selected.split('-');
    return content.find(
      item =>
        item.document_type === splitSelected[0] &&
        item.language === splitSelected[1],
      10
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
    return options.find(option => option.value === selected);
  }
);

export default {
  getCountry,
  getContent,
  getSelectedContent,
  getContentOptions
};
