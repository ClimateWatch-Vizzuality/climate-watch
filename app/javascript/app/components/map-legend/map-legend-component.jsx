import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './map-legend-styles.scss';

const MapLegend = ({ title, buckets, className }) => (
  <div className={cx(styles.wrapper, className)}>
    <p className={styles.title}>{title}</p>
    <ul className={styles.list}>
      {Object.keys(buckets).length > 0 &&
        Object.keys(buckets).map(key => (
          <li className={styles.buckets} key={key}>
            <span
              className={styles.bucketIcon}
              style={{ backgroundColor: buckets[key].color }}
            />
            <span className={styles.bucketTxt}>{buckets[key].name}</span>
          </li>
        ))}
    </ul>
  </div>
);

MapLegend.propTypes = {
  title: PropTypes.string,
  buckets: PropTypes.object,
  className: PropTypes.string
};

MapLegend.defaultProps = {
  title: '',
  buckets: {}
};

export default MapLegend;
