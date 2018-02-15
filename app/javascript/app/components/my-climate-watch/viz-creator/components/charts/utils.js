import _camelCase from 'lodash/camelCase';
import _startCase from 'lodash/startCase';
import _find from 'lodash/find';
import _difference from 'lodash/difference';
import _isUndefined from 'lodash/isUndefined';
import { assign } from 'app/utils';

export const groupsBy = (data, keyA, keyB, group) =>
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

export const groupByYear = (data, keyB, group) =>
  groupsBy(data, 'year', keyB, group);

// similar to group by bu based on a different axis for the grouping
// instead of the main data
export const groupBy = (data, [groupAxis, key], [axisGroup, keyGroup]) =>
  data.reduce((rData, ts) => {
    const AG = _find(axisGroup, { id: ts[`${groupAxis}_id`] });
    const KG = _find(keyGroup, { id: ts[`${key}_id`] });

    if (_isUndefined(AG) || _isUndefined(KG)) return rData;

    // find in existing result the item we are dealing with
    const identifier = { [groupAxis]: _startCase(AG.name) };
    const foundTs = _find(rData, identifier);
    const rest = _difference(rData, [foundTs]);
    const item = {
      [_camelCase(KG.name)]: {
        // we need values for the graph and names for the legend
        name: KG.name,
        value: Number(ts.value)
      }
    };

    return foundTs
      ? rest.concat(Object.assign(foundTs, item))
      : rData.concat(Object.assign(identifier, item));
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
