import isFunction from 'lodash/isFunction';
import _startCase from 'lodash/startCase';
import _camelCase from 'lodash/camelCase';
import _map from 'lodash/map';
import _ from 'lodash-inflection';
import { update } from 'js-lenses';
import { format } from 'd3-format';
import { assign } from 'app/utils';

import {
  groupDataByScenario,
  pickByKey,
  mergeLineProps,
  getLineProps,
  COLORS
} from './components/charts/line/utils';

export const toFetcher = name => `fetch${_.pluralize(_startCase(name))}`;
export const toSelector = name => `select${_.singularize(_startCase(name))}`;

// // maps filters to dropdown/multiselect format
export const mapFilter = data =>
  (data &&
    data.map &&
    data.map(o => ({
      label: o.label || o.name || o.full_name || o.alias,
      value: o.value || o.id
    }))) ||
  null;

export const flatMapVis = (vis = []) =>
  vis.reduce((vv, v) => vv.concat(v.visualisations), []);

export const updateIn = (l, payload, state) =>
  update(l, s => assign(s, isFunction(payload) ? payload(s) : payload), state);

export const processLegendData = (idc, scn) => {
  const lineData = processLineData(idc, scn).lineProps;
  return _map(scn, s => ({
    label: s.name,
    color:
      (lineData[_camelCase(s.name)] && lineData[_camelCase(s.name)].fill) ||
      console.warn('no fill color for', _camelCase(s.name)) ||
      '#ffffff'
  }));
};

export const processLineData = (idc, scn) => {
  const data = groupDataByScenario(idc, scn);
  const lineData = pickByKey('value', data);

  const lineProps = mergeLineProps(
    {
      type: 'monotone',
      dot: false
    },
    getLineProps(data, COLORS)
  );

  const lines =
    lineData && lineData.length ? Object.keys(lineData[0]).slice(1) : [];

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

  return {
    config,
    lineProps,
    lines,
    axis,
    cartesianGrid
  };
};
