import React from 'react';
import styles from './tile-styles.scss';

const Tile = () => (
  <div className={styles.tile}>
    <div className={styles.details}>
      <span>Data</span>
      <span>13 Jun 2018</span>
    </div>
    <div className={styles.content}>
      <p className={styles.title}>Sample title</p>
      <a href="#" className={styles.link}>
        Explore here
      </a>
    </div>
  </div>
);

export default Tile;
