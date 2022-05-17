import mapValues from 'lodash/mapValues';
import sortBy from 'lodash/sortBy';

// This transform picks always the first value (the first document value. They might not be ordered)
export const getFirstDocumentValue = payload => ({
  ...payload,
  indicators: payload.indicators.map(indicator => ({
    ...indicator,
    locations: mapValues(indicator.locations, v => v[0])
  }))
});

export const sortByLatestDocument = payload => {
  // this is document submission order, if there is a value for a latest from this list
  // then that it is a latest value
  const NDC_DOCUMENT_ORDER = [
    'indc',
    'first_ndc',
    'revised_first_ndc',
    'second_ndc'
  ];

  return {
    ...payload,
    indicators: payload.indicators.map(indicator => ({
      ...indicator,
      locations: mapValues(
        indicator.locations,
        (values) => sortBy(values, (v) => NDC_DOCUMENT_ORDER.indexOf(v.document_slug)).reverse()
      )
    }))
  };
};

export const getValueWithLabelId = payload => ({
  ...payload,
  indicators: payload.indicators.map(indicator => ({
    ...indicator,
    locations: mapValues(indicator.locations, v => {
      const documentsWithLabelIdValues = v.filter(value => value.label_id);
      const lastDocumentValue =
        documentsWithLabelIdValues.length &&
        documentsWithLabelIdValues[documentsWithLabelIdValues.length - 1];
      if (!lastDocumentValue) {
        console.warn(`${v} Country does not have label_id document value`);
      }
      return lastDocumentValue || v[0];
    })
  }))
});

export default getFirstDocumentValue;
