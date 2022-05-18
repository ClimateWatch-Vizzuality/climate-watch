import mapValues from 'lodash/mapValues';

// This transform picks always the first value (the first document value. which should be latest document for the country)
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
      const latestDocumentValue = documentsWithLabelIdValues[0]; // latest is the first one, API values are ordered
      if (!latestDocumentValue) {
        console.warn(`${v} Country does not have label_id document value`);
      }
      return latestDocumentValue || v[0];
    })
  }))
});

export default getFirstDocumentValue;
