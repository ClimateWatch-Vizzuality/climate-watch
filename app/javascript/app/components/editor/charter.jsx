import React, { Component } from 'react';
import _camelCase from 'lodash/camelCase';
import _findIndex from 'lodash/findIndex';
import _find from 'lodash/find';
import _keys from 'lodash/keys';
import _reduce from 'lodash/reduce';
import _map from 'lodash/map';
import { format } from 'd3-format';

// import { groupDataByScenario } from 'app/utils/graphs';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Line
} from 'recharts';

const asJSON = r => r.json();
const found = v => v !== -1;
const getColumnValue = column => _camelCase(column);

const groupDataByScenario = (data, scenarios) =>
  data.reduce((res, d) => {
    const year = { year: {
      value: d.year,
      label: 'year'
    } };

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

const getLineProps = (data, colors) =>
  _keys(data[0])
    .reduce((rc, k, i) => {
      const color = colors[i++]; // eslint-disable-line
      return Object.assign(rc, { [k]: {
        dataKey: k,
        fill: color,
        stroke: color
      } });
    }, {}, -1);

const pickByKey = (key, data) =>
  data.map(l =>
    _reduce(l, (rr, item, k) =>
      Object.assign(rr, { [k]: item[key] }), {}));

const COLORS = [
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

const mergeLineProps = (withObject, theme) => _reduce(theme, (t, v, k) =>
  Object.assign(t, {
    [k]: Object.assign(v, withObject)
  }), {}
);

const Liner = ({ config, lines, lineProps, axis, cartesianGrid }) => (
  <ResponsiveContainer width="80%" height={300}>
    <LineChart {...config}>
      {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
      {lines && lines.map(l => (
        <Line key={l} {...lineProps[l]} />
      ))}
      {axis.x && <XAxis {...axis.x.props || null} />}
      {axis.y && <YAxis {...axis.y.props || null} />}
    </LineChart>
  </ResponsiveContainer>
);

class Charter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    fetch('https://www.emissionspathways.org/api/v1/time_series_values?location=267&scenario=38,36,35,37&indicator=621')
      .then(asJSON)
      .then(indicators => {
        fetch('https://www.emissionspathways.org/api/v1/scenarios?model=3')
          .then(asJSON)
          .then(scenarios => {
            this.dataLoaded(indicators, scenarios);
          });
      });
  }

  dataLoaded(indicators, scenarios) {
    const data = groupDataByScenario(indicators, scenarios);
    const lineData = pickByKey('value', data);

    const lineProps = mergeLineProps({
      type: 'monotone',
      dot: false
    }, getLineProps(data, COLORS));

    const lines = Object.keys(lineData[0]).slice(1);
    const axis = {
      x: {
        props: {
          dataKey: 'year',
          tick: { stroke: '#8f8fa1', strokeWidth: 0.5, fontSize: '13px' },
          padding: { left: 15, right: 20 },
          tickSize: 8
        }
      },
      y: {
        props: {
          axisLine: false,
          tickFormatter: tick => `${format('.2s')(tick)}t`,
          tickLine: false,
          tick: { stroke: '#8f8fa1', strokeWidth: 0.5, fontSize: '13px' },
          domain: ['auto', 'auto']
        }
      }
    };

    const margin = { top: 20, right: 0, left: -10, bottom: 0 };

    const config = {
      data: lineData,
      margin
    };

    const cartesianGrid = {
      vertical: false
    };

    this.setState({
      config,
      lineProps,
      lines,
      axis,
      cartesianGrid
    });
  }

  render() {
    const {
      config, lines, lineProps, axis, cartesianGrid
    } = this.state;

    return (
      <div>
        <h1>Charter</h1>
        {config &&
          <Liner {...{ config, lines, lineProps, axis, cartesianGrid }} />
        }
      </div>
    );
  }
}

export default Charter;
