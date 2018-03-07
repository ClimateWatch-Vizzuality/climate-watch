import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { TabletLandscape } from 'components/responsive';

import styles from './header-styles.scss';

const Header = props => {
  const { image, className, children, size, color } = props;
  const sizeClass = cx({
    [styles.medium]: size === 'medium',
    [styles.large]: size === 'large'
  });
  const getStyle = isLandscape => {
    let style = { backgroundColor: color };
    if (image) {
      const gradient = `linear-gradient(to top, ${color} 25%, transparent), `;
      style = {
        ...style,
        backgroundImage: `${isLandscape ? '' : gradient}url(${image})`
      };
    }
    return style;
  };

  return (
    <TabletLandscape>
      {isLandscape => (
        <div
          className={cx(className, styles.header, sizeClass)}
          style={getStyle(isLandscape)}
        >
          {children}
        </div>
      )}
    </TabletLandscape>
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
