import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './map-legend-styles.scss';

const MapLegend = ({ title, buckets, className }) =>
  (<div className={cx(styles.wrapper, className)}>
    <p className={styles.title}>
      {title}
    </p>
    <ul className={styles.list}>
      {buckets.length > 0 &&
        buckets.map(bucket =>
          (<li className={styles.buckets} key={bucket.vis}>
            <span
              className={cx(
                styles.bucketIcon,
                styles[`bucketIconColor${bucket.vis}`]
              )}
            />
            <span className={styles.bucketTxt}>
              {bucket.txt}
            </span>
          </li>)
        )}
    </ul>
  </div>);

MapLegend.propTypes = {
  title: PropTypes.string,
  buckets: PropTypes.array,
  className: PropTypes.string
};

MapLegend.defaultProps = {
  title: '',
  buckets: []
};

export default MapLegend;
