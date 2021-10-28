import mapValues from 'lodash/mapValues';

// This transform picks always the first value (the first document value. They might not be ordered)
export const getFirstDocumentValue = payload => ({
  ...payload,
  indicators: payload.indicators.map(indicator => ({
    ...indicator,
    locations: mapValues(indicator.locations, v => v[0])
  }))
});

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
