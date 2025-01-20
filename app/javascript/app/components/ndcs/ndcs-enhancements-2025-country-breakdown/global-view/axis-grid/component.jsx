import React, { Fragment, useEffect } from 'react';
import { select } from 'd3-selection';
import { axisLeft, axisBottom } from 'd3-axis';

import { chartConfigPropTypes } from '../index';

const AxisGridComponent = ({ chartConfig = {} }) => {
  const { chartId, scales, margins, dimensions } = chartConfig;

  if (!scales) return null;

  useEffect(() => {
    // X Axis
    const xAxis = axisBottom()
      .tickValues([2015, 2020, 2025, 2030, 2035])
      .tickSize(8)
      .tickPadding(10)
      .scale(scales.x);

    select(chartId)
      .append('g')
      .attr(
        'transform',
        `translate(${margins.left},${dimensions.height - margins.bottom})`
      )
      .call(xAxis)
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line').attr('stroke', '#ccc'));

    // Y Axis
    const yAxis = axisLeft()
      .tickValues([20, 30, 40, 50])
      // .tickSize(0)
      .tickPadding(24)
      .tickFormat(d => `${d}Gt`)
      .scale(scales.y);

    select(chartId)
      .append('g')
      .attr('transform', `translate(${margins.left},${margins.top})`)
      .call(yAxis)
      .call(g => g.select('.domain').remove())
      .call(g =>
        g
          .selectAll('.tick line')
          .attr('stroke', '#ccc')
          .attr('x2', dimensions.width - (margins.left + margins.right))
      );

    // 2030 and 2035 lines
    select(chartId)
      .append('g')
      .attr('transform', `translate(${margins.left},${margins.bottom})`)
      .attr('class', 'lines')
      .selectAll('line')
      .data([2030, 2035])
      .enter()
      .append('line')
      .attr('x1', d => scales.x(d))
      .attr('x2', d => scales.x(d))
      .attr('y1', 0)
      .attr('y2', dimensions.height - margins.top - margins.bottom - 20)
      .attr('stroke', '#D3D3D3')
      .attr('stroke-dasharray', '4,4')
      .attr('stroke-width', '0.5');
  }, [chartId, scales, margins, dimensions]);

  return <Fragment />;
};

AxisGridComponent.propTypes = {
  chartConfig: chartConfigPropTypes
};

export default AxisGridComponent;
