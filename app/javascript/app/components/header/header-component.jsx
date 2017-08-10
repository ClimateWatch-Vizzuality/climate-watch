import React from 'react';
import PropTypes from 'prop-types';

import layout from 'styles/layout.scss';
import styles from './header-styles.scss';

const Header = (props) => {
  const { image } = props;
  return (
    <div className={styles.header} style={{ backgroundImage: `url(${image})` }}>
      <div className={layout.content}>Child components go here</div>
    </div>
  );
};

Header.propTypes = {
  image: PropTypes.string
};

export default Header;
