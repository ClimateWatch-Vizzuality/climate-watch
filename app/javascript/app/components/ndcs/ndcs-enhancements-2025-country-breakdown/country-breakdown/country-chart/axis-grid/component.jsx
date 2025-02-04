import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { select } from 'd3-selection';
import { axisLeft, axisTop } from 'd3-axis';
import { line } from 'd3-shape';

import LineComponent from '../components/line/component';

const AxisGridComponent = ({ chartConfig = {} }) => {
  const {
    chartId,
    axis,
    /* domains, */ scales,
    margins,
    dimensions
  } = chartConfig;

  if (!scales) return null;

  select(chartId)
    .selectAll('.axis-grid')
    .remove();

  // X Axis
  const xAxis = axisTop().scale(scales.x);

  select(chartId)
    .append('g')
    .attr('class', 'axis-grid')
    .attr('transform', `translate(${margins.left},${margins.top})`)
    .call(xAxis)
    .call(g => g.select('.domain').remove())
    .call(g => g.selectAll('.tick line').remove());

  // Y Axis
  const yAxis = axisLeft()
    .tickValues(axis.y.ticks)
    .tickPadding(16)
    .scale(scales.y);

  select(chartId)
    .append('g')
    .attr('class', 'axis-grid')
    .attr('transform', `translate(${margins.left},${margins.top})`)
    .call(yAxis)
    .call(g => g.select('.domain').remove())
    .call(g => g.selectAll('.tick line').remove());

  const axisYBase = useMemo(() =>
    line()
      .x((d) => d.x)
      .y((d) => scales.y(d.y))([
        { x: 0, y: 0 },
        { x: dimensions.width - margins.left - margins.right, y: 0 }
      ])
  );

  const axisYLines = useMemo(() =>
    axis?.y?.ticks
      // We will be drawing the 0 line differently
      ?.filter(tick => tick !== 0)
      .map(tick =>
        line()
          .x(d => d.x)
          .y(d => scales.y(d.y))([
            { x: 0, y: tick },
            { x: dimensions.width - margins.left - margins.right, y: tick }
          ])
      )
  );

  return (
    <g>
      {/* Y axis zeroed */}
      <LineComponent type="axis-x-base" margins={margins} path={axisYBase} />

      {/* Y axis lines */}
      {axisYLines?.map((path) => (
        <LineComponent type="axis-x" margins={margins} path={path} />
      ))}
    </g>
  );
};

AxisGridComponent.propTypes = {
  chartConfig: PropTypes.any // TODO Fix
};

export default AxisGridComponent;
