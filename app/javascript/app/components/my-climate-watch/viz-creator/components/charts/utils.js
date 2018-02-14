import _camelCase from 'lodash/camelCase';
import _find from 'lodash/find';
import _difference from 'lodash/difference';
import _isUndefined from 'lodash/isUndefined';
import { assign } from 'app/utils';

export const groupBy = (keyA, keyB, data, group) =>
  data.reduce((rData, ts) => {
    const g = _find(group, { id: ts[`${keyB}_id`] }) || {
      id: ts[`${keyB}_id`],
      value: ts.value
    };
    if (_isUndefined(g)) return rData;
    const foundTs = _find(rData, { [keyA]: ts[keyA] });
    const rest = _difference(rData, [foundTs]);
    // data needs values for the graph and names for the legend
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
