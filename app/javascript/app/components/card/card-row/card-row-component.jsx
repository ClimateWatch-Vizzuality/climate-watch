import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import AbbrReplace, { replaceStringAbbr } from 'components/abbr-replace';
import styles from './card-row-styles.scss';

const CardRowComponent = ({ rowData }) => (
  <React.Fragment>
    {rowData && (
      <div
        className={cx(styles.cardRow, {
          [styles.cardRowWithSubtitle]: rowData.subtitle
        })}
      >
        <AbbrReplace>
          <div className={styles.title}>{rowData.title || ''}</div>
          {rowData.subtitle && (
            <p className={styles.title}>{rowData.subtitle}</p>
          )}
        </AbbrReplace>
        <p
          className={styles.text}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: rowData.value ? replaceStringAbbr(rowData.value) : ''
          }}
        />
      </div>
    )}
  </React.Fragment>
);

CardRowComponent.propTypes = {
  rowData: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    value: PropTypes.any
  })
};

export default CardRowComponent;
