import mapValues from 'lodash/mapValues';

const indcTransform = payload => ({
  ...payload,
  indicators: payload.indicators.map(indicator => ({
    ...indicator,
    locations: mapValues(indicator.locations, v => v[0])
  }))
});

export default indcTransform;
