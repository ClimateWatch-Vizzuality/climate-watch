import find from 'lodash/find';
import camelCase from 'lodash/camelCase';
import { CHART_COLORS } from 'data/constants';
import { assign } from 'app/utils';
import { pick } from '../utils';

export const pieChart1Data = (timeSeries, indicators, yAxisLabel, small) => {
  const data = timeSeries.map(ts => {
    const found = find(indicators, { id: ts.indicator_id });
    return found
      ? {
        name: found.name,
        key: camelCase(found.name),
        value: Number(ts.value)
      }
      : false;
  });

  const names = pick('name', data); // only data name key
  const unit = indicators[0].unit;

  return {
    chart: {
      data,
      dataKey: 'value',
      topLabel: small
        ? {}
        : {
          text: yAxisLabel,
          y: 15
        }
    },
    theme: data.reduce(
      (r, d, i) =>
        assign(r, {
          [d.key]: {
            fill: CHART_COLORS[i]
          }
        }),
      {}
    ),
    tooltip: small ? null : { unit, names, pie: true },
    legend: data.map((k, i) => ({
      color: CHART_COLORS[i],
      label: k.name
    }))
  };
};

export const pieChart2Data = (
  timeSeries,
  indicators,
  locations,
  yAxisLabel,
  small
) => {
  const data = timeSeries.map(ts => {
    const indicator = find(indicators, { id: ts.indicator_id });
    const location = find(locations, { id: ts.location_id });
    return indicator
      ? {
        indicatorName: indicator.name,
        locationName: location.name,
        name: location.name,
        key: camelCase(location.name),
        value: Number(ts.value)
      }
      : false;
  });

  const names = pick('name', data); // only data name key
  const unit = indicators[0].unit;

  return {
    chart: {
      data,
      dataKey: 'value',
      innerRadius: '50%',
      topLabel: small
        ? {}
        : {
          text: yAxisLabel,
          y: 15
        }
    },
    theme: data.reduce(
      (r, d, i) =>
        assign(r, {
          [d.key]: {
            fill: CHART_COLORS[i]
          }
        }),
      {}
    ),
    tooltip: small ? null : { unit, names, pie: true },
    legend: data.map((k, i) => ({
      color: CHART_COLORS[i],
      label: k.name
    }))
  };
};

export default pieChart1Data;
