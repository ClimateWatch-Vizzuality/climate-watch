import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Header = props => {
  const {
    image,
    className,
    children,
    size,
    theme,
    gradientStyle,
    color
  } = props;
  const sizeClass = cx({
    [theme.medium]: size === 'medium',
    [theme.large]: size === 'large'
  });

  let style = { backgroundColor: color };
  if (image) {
    style = {
      ...style,
      backgroundImage: `url(${image})`
    };
  }

  return (
    <div className={cx(className, theme.header, sizeClass)} style={style}>
      {gradientStyle && (
        <span className={theme.gradient} style={gradientStyle} />
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
  color: PropTypes.string,
  theme: PropTypes.object,
  gradientStyle: PropTypes.object
};

export default Header;
