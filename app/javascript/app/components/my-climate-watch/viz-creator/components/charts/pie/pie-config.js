import find from 'lodash/find';
import camelCase from 'lodash/camelCase';
import { CHART_COLORS } from 'data/constants';
import { assign } from 'app/utils';

const pieChart1Data = (timeSeries, indicators) => {
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

  return {
    chart: {
      data,
      dataKey: 'value'
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
    legend: data.map((k, i) => ({
      color: CHART_COLORS[i],
      label: k.name
    }))
  };
};

export default pieChart1Data;
