/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { sanitize } from 'utils';
import styles from './ndcs-enhancements-table-styles.scss';

const cellRenderer = props => {
  const { cellData, dataKey } = props;
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

  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: sanitize(cellData) }} />;
};

cellRenderer.propTypes = {
  cellData: PropTypes.string,
  dataKey: PropTypes.string
};

export default cellRenderer;
