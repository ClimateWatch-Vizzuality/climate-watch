import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { themr } from 'react-css-themr';
import background from 'assets/headers/background-header.png';
import styles from './header-styles.scss';

const Header = props => {
  const { className, children, size, theme, color, gradient } = props;
  const sizeClass = cx({
    [theme.medium]: size === 'medium',
    [theme.large]: size === 'large'
  });
  const getStyle = () => {
    let style = {};
    if (gradient) {
      const [startColor, endColor] = gradient;
      style = {
        backgroundImage: `url(${background}), linear-gradient(to right, ${startColor} 25%, ${endColor})`
      };
    } else {
      style = { backgroundColor: color };
    }

    return style;
  };

  return (
    <div
      className={cx(className, styles.header, theme.header, sizeClass)}
      style={getStyle()}
    >
      {children}
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.string,
  color: PropTypes.string,
  gradient: PropTypes.array,
  theme: PropTypes.object
};

export default themr('Header', styles)(Header);
