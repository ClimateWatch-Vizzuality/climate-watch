import _camelCase from 'lodash/camelCase';
import _startCase from 'lodash/startCase';
import _find from 'lodash/find';
import _difference from 'lodash/difference';
import _isUndefined from 'lodash/isUndefined';
import { assign } from 'app/utils';

// keyA = 'year', keyB = 'indicator', data = 'timeseries', group = 'indicators'
export const groupBy = (keyA, keyB, data, group) =>
  data.reduce((rData, ts) => {
    // find in 'indicators' the current time series indicator
    const g = _find(group, { id: ts[`${keyB}_id`] });
    if (_isUndefined(g)) return rData;
    // find in existing result the year we are dealing with
    const foundTs = _find(rData, { [keyA]: ts[keyA] });
    const rest = _difference(rData, [foundTs]);
    // we need values for the graph and names for the legend
    const item = {
      [_camelCase(g.name)]: {
        name: g.name,
        value: Number(ts.value)
      }
    };
    return foundTs
      ? rest.concat(Object.assign(foundTs, item))
      : rData.concat({
        [keyA]: ts[keyA],
        ...item
      });
  }, []);

export const groupBys = (data, [keyA, keyB], [groupA, groupB]) =>
  data.reduce((rData, ts) => {
    // find in 'indicators' the current time series indicator
    const gA = _find(groupA, { id: ts[`${keyA}_id`] });
    const gB = _find(groupB, { id: ts[`${keyB}_id`] });

    if (_isUndefined(gA)) return rData;
    if (_isUndefined(gB)) return rData;
    // find in existing result the year we are dealing with
    const foundTs = _find(rData, { [keyA]: _startCase(gA.name) });
    const rest = _difference(rData, [foundTs]);
    // we need values for the graph and names for the legend
    const item = {
      [_camelCase(gB.name)]: {
        name: gB.name,
        value: Number(ts.value)
      }
    };
    return foundTs
      ? rest.concat(Object.assign(foundTs, item))
      : rData.concat({
        [keyA]: _startCase(gA.name),
        ...item
      });
  }, []);

// splits data by name or value
export const pick = (key, list) =>
  list.map(l =>
    Object.keys(l).reduce(
      (r, k) =>
        assign(r, {
          [k]: _isUndefined(l[k][key]) ? l[k] : l[k][key]
        }),
      {}
    )
  );
