import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import monete from 'assets/icon-pngs/monete.png';
import styles from './no-content-styles.scss';

const NoContent = ({ className, message, icon, minHeight }) => (
  <div className={cx(styles.noContent, className)} style={{ minHeight }}>
    <p className={styles.text}>{message}</p>
    {icon && <img className={styles.img} src={monete} alt="Monete" />}
  </div>
);

NoContent.propTypes = {
  icon: PropTypes.bool,
  className: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  minHeight: PropTypes.number
};

NoContent.defaultProps = {
  icon: false
};

export default NoContent;
