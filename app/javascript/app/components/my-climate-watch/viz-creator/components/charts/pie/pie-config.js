import find from 'lodash/find';
import camelCase from 'lodash/camelCase';
import { CHART_COLORS, CHART_COLORS_EXTENDED } from 'data/constants';
import { assign } from 'app/utils';
import { setChartColors } from 'app/utils/graphs';
import { pick, getSelectedModel } from '../utils';

export const pieChart1Data = (
  timeSeries,
  indicators,
  yAxisLabel,
  small,
  models
) => {
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
  const chartColors = setChartColors(
    names.length,
    CHART_COLORS,
    CHART_COLORS_EXTENDED
  );
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
            fill: chartColors[i]
          }
        }),
      {}
    ),
    tooltip: small ? null : { unit, names, pie: true },
    legend: {
      theme: data.map((k, i) => ({
        color: chartColors[i],
        label: k.name
      })),
      logo: models.data.find(model => model.id === models.selected.value).logo,
      modelUrl: models.data.find(model => model.id === models.selected.value)
        .url
    }
  };
};

export const pieChart2Data = (
  timeSeries,
  indicators,
  locations,
  yAxisLabel,
  small,
  models
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
  const chartColors = setChartColors(
    names.length,
    CHART_COLORS,
    CHART_COLORS_EXTENDED
  );

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
            fill: chartColors[i]
          }
        }),
      {}
    ),
    tooltip: small ? null : { unit, names, pie: true },
    legend: {
      theme: data.map((k, i) => ({
        color: chartColors[i],
        label: k.name
      })),
      dataProvider: getSelectedModel(models).maintainer_institute,
      logo: getSelectedModel(models).logo,
      modelUrl: getSelectedModel(models).url
    }
  };
};

export default pieChart1Data;
