import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import layout from 'styles/layout.scss';
import styles from './header-styles.scss';

const Header = (props) => {
  const { image, className, children, size } = props;
  const sizeClass = size === 'large' ? styles.large : '';
  return (
    <div
      className={cx(className, styles.header, sizeClass)}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={layout.content}>
        {children}
      </div>
    </div>
  );
};

Header.propTypes = {
  image: PropTypes.string,
  className: PropTypes.object,
  children: PropTypes.node,
  size: PropTypes.string
};

export default Header;
