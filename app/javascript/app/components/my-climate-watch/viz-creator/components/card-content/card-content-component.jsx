import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { importAllImagesFromFolder } from 'utils';

// import emissions from 'assets/datasets/emissions.png';

import styles from './card-content-styles';

const images = importAllImagesFromFolder(
  require.context('assets/visualisations', false, /\.(png|jpe?g)$/)
);

const CardContent = ({ data = {}, type = '', className }) => (
  <div className={cx(styles.cardContainer, className)}>
    <div className={cx(styles.cardHeader)}>
      {data.image && images[data.image]
        ? <img className={styles.cardImage} styles={styles.image} src={images[data.image]} alt={`${type} selectable option`} />
        : <p className={styles.placeholder}>{data.placeholder}</p>
      }
    </div>
    <div className={cx(styles.cardContent)}>
      <p>{data.name}</p>
    </div>
  </div>
);

CardContent.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  data: PropTypes.object
};

export default CardContent;
