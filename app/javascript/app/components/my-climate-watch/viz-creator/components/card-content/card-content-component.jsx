import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { importAllImagesFromFolder } from 'utils';
import styles from './card-content-styles';

const images = importAllImagesFromFolder(
  require.context('assets/visualisations', false, /\.(png|jpe?g)$/)
);

const CardContent = ({
  placeholder,
  image,
  children,
  type = '',
  className
}) => (
  <div className={cx(styles.cardContainer, className)}>
    <div className={cx(styles.cardHeader)}>
      {image && images[image] ? (
        <img
          className={styles.cardImage}
          styles={styles.image}
          src={images[image]}
          alt={`${type} selectable option`}
        />
      ) : (
        <p className={styles.placeholder}>{placeholder}</p>
      )}
    </div>
    <div className={cx(styles.cardContent)}>{children}</div>
  </div>
);

CardContent.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default CardContent;
