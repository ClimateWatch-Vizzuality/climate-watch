import React, { useMemo } from 'react';
import { select } from 'd3-selection';
import { axisLeft, axisBottom } from 'd3-axis';
import { line } from 'd3-shape';

import { chartConfigPropTypes } from '../../index';
import { LineComponent } from '../components';

import { SETTINGS } from '../../constants';

const Y_AXIS_LINES = [2030, 2035];

const AxisGridComponent = ({ chartConfig = {} }) => {
  const { chartId, axis, domains, scales, margins, dimensions } = chartConfig;

  if (!scales) return null;

  select(chartId)
    .selectAll('.axis-grid')
    .remove();

  // X Axis
  const xAxis = axisBottom()
    .tickValues(axis.x.ticks)
    .tickSize(8)
    .tickPadding(10)
    .scale(scales.x);

  select(chartId)
    .append('g')
    .attr('class', 'axis-grid')
    .attr(
      'transform',
      `translate(${margins.left},${dimensions.height - margins.bottom})`
    )
    .call(xAxis)
    .call(g => g.select('.domain').remove())
    .call(g => g.selectAll('.tick line').attr('stroke', '#ccc'));

  // Y Axis
  const yAxis = axisLeft()
    .tickValues(axis.y.ticks)
    .tickPadding(16)
    .tickFormat(d => `${d}Gt`)
    .scale(scales.y);

  select(chartId)
    .append('g')
    .attr('class', 'axis-grid')
    .attr('transform', `translate(${margins.left},${margins.top})`)
    .call(yAxis)
    .call(g => g.select('.domain').remove())
    .call(g => g.selectAll('.tick line').remove());

  select(chartId)
    .append('text')
    .attr('class', 'axis-grid')
    .text('GtCO2e (Gigatonnes of CO2 equivalent)')
    .attr(
      'transform',
      `translate(${margins.left},${margins.bottom}) rotate(-90)`
    )
    .attr('fill', '#000000')
    .attr('font-size', 12)
    .attr('x', -(dimensions.height / 2) - 40)
    .attr('y', -64);

  const axisLines = useMemo(() => {
    const x = Y_AXIS_LINES?.map(year =>
      line()
        .x(d => scales.x(d.x))
        .y(d => scales.y(d.y))([
          { x: year, y: domains?.y?.[0] + 0.5 },
          { x: year, y: domains?.y?.[domains?.y?.length - 1] }
        ])
    );

    const y = axis?.y?.ticks?.map(tick =>
      line()
        .x(d => scales.x(d.x))
        .y(d => scales.y(d.y))([
          { x: SETTINGS?.chartMinYear, y: tick },
          { x: SETTINGS?.chartMaxYear, y: tick }
        ])
    );

    return { x, y };
  });

  return (
    <>
      {/* X axis lines: 2030 & 2035 lines */}
      {axisLines?.x?.map(path => (
        <LineComponent type="axis-x" margins={margins} path={path} />
      ))}
      {/* Y axis lines */}
      {axisLines?.y?.map(path => (
        <LineComponent type="axis-y" margins={margins} path={path} />
      ))}
    </>
  );
};

AxisGridComponent.propTypes = {
  chartConfig: chartConfigPropTypes
};

export default AxisGridComponent;
