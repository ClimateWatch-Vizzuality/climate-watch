import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const getCountries = state => state.countries.data;
const getSelected = state => state.countryNDCFull.selected;

export const getContent = (state, iso) => state.countryNDCFull.data[iso];

export const getCountry = createSelector(
  [getCountries, (countries, iso) => iso],
  (countries, iso) => countries.find(country => country.iso_code3 === iso)
);

export const getSelectedContent = createSelector(
  [getSelected, getContent],
  (selected, content) => {
    if (isEmpty(content)) {
      return null;
    }

    return content.length > 1
      ? content.find(item => item.id === selected)
      : content[0];
  }
);

const getLabel = item =>
  `${item.document_type.toUpperCase()} (${item.language.toUpperCase()})`;

export const getContentOptions = createSelector(getContent, content =>
  (content || []).map(item => ({
    value: item.id,
    label: getLabel(item)
  }))
);

export default {
  getCountry,
  getContent,
  getSelectedContent,
  getContentOptions
};
