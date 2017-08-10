import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './icon-styles.scss';

const Icon = ({ icon, className = '', large, medium = true }) => {
  const classNames = cx(
    {
      [styles.large]: large,
      [styles.medium]: medium
    },
    className
  );
  return (
    <svg className={classNames} viewBox={icon.viewBox}>
      <use xlinkHref={`#${icon.id}`} />
    </svg>
  );
};

Icon.propTypes = {
  large: PropTypes.bool,
  medium: PropTypes.bool,
  icon: PropTypes.string,
  className: PropTypes.string
};

export default Icon;
