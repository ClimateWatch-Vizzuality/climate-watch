import { format } from 'd3-format';
import { assign } from 'app/utils';
import { CHART_COLORS, CHART_COLORS_EXTENDED } from 'data/constants';
import {
  setChartColors,
  setXAxisDomain,
  setYAxisDomain
} from 'app/utils/graphs';
import { groupByYear, pick, getSelectedModel } from '../utils';

const makeConfig = (data, indicators, small, models) => {
  const keys = Object.keys(data[0]).filter(k => k !== 'year');
  const chartColors = setChartColors(
    keys.length,
    CHART_COLORS,
    CHART_COLORS_EXTENDED
  );
  const tick = { stroke: '#8f8fa1', strokeWidth: 0.5, fontSize: '13px' };
  const names = pick('name', data); // only data name key
  const unit = indicators[0] && indicators[0].unit;
  return {
    chart: {
      data: pick('value', data), // only data value key
      margin: { top: 50, right: 0, left: 0, bottom: 0 },
      unit: small ? null : unit
    },
    columns: {
      x: ['year'],
      y: keys
    },
    xAxis: small
      ? false
      : {
        dataKey: 'year',
        padding: { left: 15, right: 20 },
        tickSize: 8,
        scale: 'time',
        type: 'number',
        domain: setXAxisDomain()
      },
    yAxis: small
      ? false
      : {
        tickFormatter: t => `${format('.2s')(t)}`,
        axisLine: false,
        tickLine: false,
        tick,
        domain: setYAxisDomain()
      },
    cartesianGrid: small
      ? false
      : {
        vertical: false
      },
    theme: keys.reduce(
      (th, k, i) =>
        assign(th, {
          [k]: {
            stroke: chartColors[i],
            fill: chartColors[i],
            type: 'monotone',
            isAnimationActive: false,
            dot: !small
              ? { fill: chartColors[i], strokeWidth: 0, radius: 0.5 }
              : false
          }
        }),
      {}
    ),
    tooltip: small ? null : { unit, names },
    legend: {
      theme: keys.map((k, i) => ({
        color: chartColors[i],
        label: names[0][k]
      })),
      dataProvider: getSelectedModel(models).maintainer_institute,
      logo: getSelectedModel(models).logo,
      modelUrl: getSelectedModel(models).url
    }
  };
};

export const lineChart1Data = (
  timeSeries,
  scenarios,
  indicators,
  small,
  models
) =>
  makeConfig(
    groupByYear(timeSeries, 'scenario', scenarios),
    indicators,
    small,
    models
  );

export const lineChart2Data = (
  timeSeries,
  locations,
  indicators,
  small,
  models
) =>
  makeConfig(
    groupByYear(timeSeries, 'location', locations),
    indicators,
    small,
    models
  );
