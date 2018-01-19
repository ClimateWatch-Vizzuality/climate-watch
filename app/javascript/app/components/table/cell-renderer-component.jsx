import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line } from 'recharts';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';

import 'react-virtualized/styles.css'; // only needs to be imported once
import { NavLink } from 'react-router-dom';

const renderTrendLine = chartData => {
  const dataValues =
    chartData && chartData.split(',').map(v => ({ value: parseFloat(v) }));
  return (
    <LineChart width={70} height={35} data={dataValues}>
      <Line dot={false} dataKey="value" stroke="#113750" strokeWidth={2} />
    </LineChart>
  );
};

const sanitizeCellData = cellData => {
  if (isArray(cellData)) {
    return cellData.join(', ');
  }
  if (cellData && !isString(cellData)) {
    return cellData.name || cellData.full_name || '';
  }
  return cellData;
};

const cellRenderer = ({
  props: { parseHtml, titleLinks, trendLine },
  cell
}) => {
  let { cellData } = cell;
  const { rowIndex, dataKey } = cell;
  cellData = sanitizeCellData(cellData);
  // check for Trendline
  if (trendLine && dataKey === trendLine) {
    return renderTrendLine(cellData);
  }
  // check for TitleLink
  const titleLink =
    titleLinks &&
    titleLinks[rowIndex] &&
    titleLinks[rowIndex].find(t => t.columnName === dataKey);
  if (titleLink) {
    return titleLink.url === 'self' ? (
      <a target="_blank" href={cellData}>
        {cellData}
      </a>
    ) : (
      <NavLink to={titleLink.url}>{cellData}</NavLink>
    );
  }
  // render Html or finally cellData
  return parseHtml ? (
    <div dangerouslySetInnerHTML={{ __html: cellData }} />
  ) : (
    cellData || ''
  );
};

cellRenderer.propTypes = {
  cell: PropTypes.object.isRequired,
  props: PropTypes.shape({
    titleLinks: PropTypes.array, // [ [ {columnName: 'title field name in the table', url:'/destination-url' or 'self'}, ... ] ]
    trendLine: PropTypes.string, // 'field name of the trend line column'
    parseHtml: PropTypes.bool
  })
};

export default cellRenderer;
