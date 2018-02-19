import _camelCase from 'lodash/camelCase';
import _findIndex from 'lodash/findIndex';
import _find from 'lodash/find';
import _keys from 'lodash/keys';
import _reduce from 'lodash/reduce';

const found = v => v !== -1;
const getColumnValue = column => _camelCase(column);

export const groupDataByScenario = (data, scenarios) =>
  data.reduce((res, d) => {
    const year = {
      year: {
        value: d.year,
        label: 'year'
      }
    };

    const idx = _findIndex(res, rd => rd.year.value === year.year.value);

    // append y values if x exists, otherwise create new row
    const row = found(idx) ? res[idx] : year;
    const scenario = _find(scenarios, { id: d.scenario_id });
    const label = (scenario && scenario.name) || d.scenario_id;
    const key = getColumnValue(label);

    row[key] = {
      label,
      value: parseInt(d.value, 10)
    };
    // override row if exists otherwise append new row
    res[found(idx) ? idx : res.length] = row;
    return res;
  }, []);

export const getLineProps = (data, colors) =>
  _keys(data[0]).reduce(
    (rc, k, i) => {
      const color = colors[i++]; // eslint-disable-line
      return Object.assign(rc, {
        [k]: {
          dataKey: k,
          fill: color,
          stroke: color
        }
      });
    },
    {},
    -1
  );

export const pickByKey = (key, data) =>
  data.map(l =>
    _reduce(l, (rr, item, k) => Object.assign(rr, { [k]: item[key] }), {})
  );

export const COLORS = [
  '#2D9290',
  '#B25BD0',
  '#7EA759',
  '#FF0D3A',
  '#687AB7',
  '#BC6332',
  '#F97DA1',
  '#00971D',
  '#F1933B',
  '#938126',
  '#2D9290',
  '#B25BD0',
  '#7EA759'
];

export const mergeLineProps = (withObject, theme) =>
  _reduce(
    theme,
    (t, v, k) =>
      Object.assign(t, {
        [k]: Object.assign(v, withObject)
      }),
    {}
  );
