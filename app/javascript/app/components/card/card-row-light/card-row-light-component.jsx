import React from 'react';
import PropTypes from 'prop-types';

import styles from './card-row-light-styles.scss';

const CardRowLight = ({ rowData }) => (
  <React.Fragment>
    {rowData && (
      <div className={styles.cardRow}>
        <span className={styles.cardTitle}>{rowData.title || ''}</span>
        <p
          className={styles.targetText}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: rowData.value || ''
          }}
        />
      </div>
    )}
  </React.Fragment>
);

CardRowLight.propTypes = {
  rowData: PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.any
  })
};

export default CardRowLight;
