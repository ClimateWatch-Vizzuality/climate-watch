import React from 'react';
import PropTypes from 'prop-types';
import Tile from 'components/tiles-section/tile';
import cx from 'classnames';
import styles from './latest-updates-styles.scss';

const LatestUpdatesSection = ({ updates }) => (
  <div className={cx(styles.column, styles.latestUpdates)}>
    <h2>Latest updates</h2>
    <div className={styles.tilesGroup}>
      {updates.map(({ category, date, description, link }) => (
        <Tile
          category={category}
          date={date}
          description={description}
          url={link}
        />
      ))}
    </div>
  </div>
);

LatestUpdatesSection.propTypes = {
  updates: PropTypes.array
};

LatestUpdatesSection.defaultProps = {
  updates: []
};

export default LatestUpdatesSection;
