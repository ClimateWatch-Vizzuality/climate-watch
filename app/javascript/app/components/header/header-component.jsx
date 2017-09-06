import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './header-styles.scss';

const Header = props => {
  const { image, className, children, size } = props;
  const sizeClass = cx({
    [styles.medium]: size === 'medium',
    [styles.large]: size === 'large'
  });
  const style = image ? { backgroundImage: `url(${image})` } : {};

  return (
    <div className={cx(className, styles.header, sizeClass)} style={style}>
      {children}
    </div>
  );
};

Header.propTypes = {
  image: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.string
};

export default Header;
