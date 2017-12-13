import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Header = props => {
  const { image, className, children, size, theme } = props;
  const sizeClass = cx({
    [theme.medium]: size === 'medium',
    [theme.large]: size === 'large'
  });
  const style = image ? { backgroundImage: `url(${image})` } : {};

  return (
    <div className={cx(className, theme.header, sizeClass)} style={style}>
      {children}
    </div>
  );
};

Header.propTypes = {
  image: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.string,
  theme: PropTypes.object
};

export default Header;
