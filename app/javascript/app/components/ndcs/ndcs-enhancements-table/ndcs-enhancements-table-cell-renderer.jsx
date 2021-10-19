/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { sanitize } from 'utils';
import ReactDOMServer from 'react-dom/server';
import cx from 'classnames';
import styles from './ndcs-enhancements-table-styles.scss';

const ENHANCEMENT_COLORS = {
  blue: '#62C0FF',
  red: '#FF6C2F',
  orange: '#FFB800',
  white: 'white'
};

const colors = {
  'Revised NDC compared with previous version': ENHANCEMENT_COLORS.blue,
  'Revised from the previous submission': ENHANCEMENT_COLORS.blue,
  'Yes, enhancement in the revised submission': ENHANCEMENT_COLORS.blue,
  'No, no enhancement in the revised submission': ENHANCEMENT_COLORS.red,
  Unclear: ENHANCEMENT_COLORS.orange,
  'No revision compared with previous version': ENHANCEMENT_COLORS.white,
  'No previous submission available': ENHANCEMENT_COLORS.white,
  'No Document Submitted"': ENHANCEMENT_COLORS.white
};

const renderTooltipContent = (indicator, indicatorColor) =>
  ReactDOMServer.renderToStaticMarkup(
    <div className={styles.comparisonTooltip}>
      <div className={styles.comparisonTooltipTitle}>{indicator.label}</div>
      <div className={styles.comparisonValue}>
        <span
          className={cx(styles.comparisonIcon, styles.tooltipIcon, {
            [styles.withBorder]:
              indicatorColor && indicatorColor !== ENHANCEMENT_COLORS.white
          })}
          style={{
            backgroundColor: colors[indicator.value] || 'lightgray'
          }}
        />
        <span>{indicator.value}</span>
      </div>
    </div>
  );

const cellRenderer = props => {
  const { cellData, dataKey, columnIndex } = props;
  if (dataKey === 'NDC Status') {
    return (
      <div
        data-for="submission-icon-info"
        data-tip={cellData.text}
        className={styles.submissionIcon}
        style={{ 'background-color': cellData.color }}
      />
    );
  }

  if (dataKey === 'Overall comparison with previous NDC') {
    return (
      <div className={styles.overallComparison}>
        {cellData &&
          cellData.map(indicator => {
            const indicatorColor = colors[indicator.value];
            return (
              <div
                key={`${columnIndex}${indicator.letter}`}
                data-for="submission-icon-info"
                data-tip={renderTooltipContent(indicator, indicatorColor)}
                className={cx(styles.comparisonIcon, {
                  [styles.withBorder]:
                    indicatorColor &&
                    indicatorColor !== ENHANCEMENT_COLORS.white
                })}
                style={{
                  'background-color': indicatorColor || 'lightgray'
                }}
              >
                {indicator.letter}
              </div>
            );
          })}
      </div>
    );
  }
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: sanitize(cellData) }} />;
};

cellRenderer.propTypes = {
  cellData: PropTypes.string,
  dataKey: PropTypes.string,
  columnIndex: PropTypes.number
};

export default cellRenderer;
