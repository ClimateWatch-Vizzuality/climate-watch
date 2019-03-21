import React from 'react';
import PropTypes from 'prop-types';
import Truncate from 'react-truncate';
import Icon from 'components/icon';
import arrowTailRight from 'assets/icons/arrow-tail-right.svg';
import styles from './tile-styles.scss';

const Tile = ({ category, date, description, link }) => (
  <a
    href={link}
    className={styles.tile}
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.details}>
          <span>{category}</span>
          <span>{date}</span>
        </div>
        <Truncate
          className={styles.description}
          lines={4}
          ellipsis={<span>...</span>}
          width={270}
        >
          {description}
        </Truncate>
      </div>
      <span className={styles.link}>
        Explore here
        <Icon icon={arrowTailRight} />
      </span>
    </div>
  </a>
);

Tile.propTypes = {
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default Tile;
