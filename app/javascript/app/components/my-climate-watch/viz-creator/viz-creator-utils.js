import isFunction from 'lodash/isFunction';
import { update, get } from 'js-lenses';
import { format } from 'd3-format';
import { assign } from 'app/utils';

import {
  $visualisations,
  $locations,
  $models,
  $scenarios,
  $indicators,
  $categories,
  $subcategories,
  $timeseries
} from './viz-creator-lenses';

import {
  groupDataByScenario,
  pickByKey,
  mergeLineProps,
  getLineProps,
  COLORS
} from './components/charts/line/utils';

export const log = state => {
  console.log(state); // eslint-disable-line
  return state;
};

export const flatMapVis = (vis = []) =>
  vis.reduce((vv, v) => vv.concat(v.visualisations), []);

export const updateIn = (l, payload, state) =>
  update(l, s => assign(s, isFunction(payload) ? payload(s) : payload), state);

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

  return {
    config,
    lineProps,
    lines,
    axis,
    cartesianGrid
  };
};
