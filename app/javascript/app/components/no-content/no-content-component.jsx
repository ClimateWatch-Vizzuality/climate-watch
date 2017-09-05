import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './no-content-styles.scss';

const NoContent = ({ className, message }) =>
  (<div className={cx(styles.noContent, className)}>
    {message}
  </div>);

NoContent.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string
};

export default NoContent;
