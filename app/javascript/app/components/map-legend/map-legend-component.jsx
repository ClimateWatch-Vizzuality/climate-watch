import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getColorByIndex } from 'utils/map';

import styles from './map-legend-styles.scss';

const renderBuckets = (buckets, mapColors) => {
  const sortedBuckets = Object.values(buckets)[0].order
    ? Object.entries(buckets)
      .sort(([, a], [, b]) => a.order - b.order)
      .map(([key]) => key)
    : Object.keys(buckets);
  return sortedBuckets.map(key => (
    <li className={styles.buckets} key={key}>
      <span
        className={styles.bucketIcon}
        style={{
          backgroundColor: getColorByIndex(
            buckets,
            buckets[key].index,
            mapColors
          )
        }}
      />
      <span className={styles.bucketTxt}>{buckets[key].name}</span>
    </li>
  ));
};

const MapLegend = ({ title, buckets, className, mapColors }) => (
  <div className={cx(styles.wrapper, className)}>
    <p className={styles.title}>{title}</p>
    <ul className={styles.list}>
      {Object.keys(buckets).length > 0 && renderBuckets(buckets, mapColors)}
    </ul>
  </div>
);

MapLegend.propTypes = {
  title: PropTypes.string,
  buckets: PropTypes.object,
  className: PropTypes.string,
  mapColors: PropTypes.array
};

MapLegend.defaultProps = {
  title: '',
  buckets: {},
  mapColors: undefined
};

export default MapLegend;
