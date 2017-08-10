import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import layout from 'styles/layout.scss';
import styles from './header-styles.scss';

const Header = (props) => {
  const { image, className } = props;
  return (
    <div
      className={cx(className, styles.header)}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={layout.content}>Child components go here</div>
    </div>
  );
};

Header.propTypes = {
  image: PropTypes.string,
  className: PropTypes.object
};

export default Header;
