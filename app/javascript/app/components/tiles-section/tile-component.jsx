import React from 'react';
import PropTypes from 'prop-types';
import Truncate from 'react-truncate';
import Icon from 'components/icon';
import arrowTailRight from 'assets/icons/arrow-tail-right.svg';
import styles from './tile-styles.scss';

const Tile = ({ type, date, description, link }) => (
  <div className={styles.tile}>
    <div className={styles.container}>
      <div className={styles.details}>
        <span>{type}</span>
        <span>{date}</span>
      </div>
      <div className={styles.content}>
        <Truncate
          className={styles.description}
          lines={4}
          ellipsis={<span>...</span>}
          width={320}
        >
          {description}
        </Truncate>
        <a href={link} className={styles.link}>
          Explore here
          <Icon icon={arrowTailRight} />
        </a>
      </div>
    </div>
  </div>
);

Tile.propTypes = {
  type: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default Tile;
