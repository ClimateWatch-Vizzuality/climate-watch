import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import Icon from 'components/icon';

import arrowIcon from 'assets/icons/link-arrow.svg';
import styles from './initiators-styles.scss';

const Initiators = ({ initiators, className, gray }) => (
  <div className={styles.container}>
    <div className={cx(styles.component, className)}>
      <div className={styles.intro}>
        <h4 className={cx(styles.text, { [styles.textGray]: gray })}>
          CLIMATE WATCH IS A JOINT INITIATIVE OF
        </h4>
        <Link
          className={cx(styles.text, { [styles.textGray]: gray }, styles.right)}
          to="/about"
        >
          SEE ALL PARTNERS <Icon className={styles.arrow} icon={arrowIcon} />
        </Link>
      </div>
      <div>
        {initiators.map(initiator => (
          <a
            key={initiator.link}
            className={styles.initiator}
            href={initiator.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {initiator.img && (
              <img
                className={styles.img}
                key={initiator.img.alt}
                src={initiator.img.src}
                alt={initiator.img.alt}
              />
            )}
          </a>
        ))}
      </div>
    </div>
  </div>
);

Initiators.propTypes = {
  gray: PropTypes.bool,
  className: PropTypes.string,
  initiators: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.shape({
        alt: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired
      }),
      link: PropTypes.string
    })
  )
};

export default Initiators;
