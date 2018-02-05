import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './header-styles.scss';

const Header = props => {
  const { image, className, children, size, color } = props;
  const sizeClass = cx({
    [styles.medium]: size === 'medium',
    [styles.large]: size === 'large'
  });

  let style = { backgroundColor: color };
  if (image) {
    style = {
      ...style,
      backgroundImage: `url(${image})`
    };
  }

  const gradientStyle = color
    ? { backgroundImage: `linear-gradient(to top, ${color} 25%, transparent)` }
    : null;

  return (
    <div className={cx(className, styles.header, sizeClass)} style={style}>
      {gradientStyle && (
        <span className={styles.gradient} style={gradientStyle} />
      )}
      {children}
    </div>
  );
};

Header.propTypes = {
  image: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.string,
  color: PropTypes.string
};

Header.defaultProps = {
  color: ''
};

export default Header;
