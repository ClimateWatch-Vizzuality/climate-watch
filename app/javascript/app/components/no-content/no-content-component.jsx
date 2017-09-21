import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import monete from 'assets/icons/monete.png';
import styles from './no-content-styles.scss';

const NoContent = ({ className, message, icon }) => (
  <div className={cx(styles.noContent, className)}>
    <p className={styles.text}>{message}</p>
    {icon && <img src={monete} alt="Monete" />}
  </div>
);

NoContent.propTypes = {
  icon: PropTypes.bool,
  className: PropTypes.string,
  message: PropTypes.string
};

NoContent.defaultProps = {
  icon: false
};

export default NoContent;
