import _camelCase from 'lodash/camelCase';
import _find from 'lodash/find';
import _difference from 'lodash/difference';
import _isUndefined from 'lodash/isUndefined';
import { assign } from 'app/utils';

export const groupBy = (key, data, group) =>
  data.reduce((rData, ts) => {
    const g = _find(group, { id: ts[`${key}_id`] }) || {
      id: ts[`${key}_id`],
      value: ts.value
    };
    const foundTs = _find(rData, { year: ts.year });
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
        year: ts.year,
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
