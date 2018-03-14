import React from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';

import styles from './section-styles.scss';

const Section = ({ children, backgroundImage, className }) => (
  <section
    className={cx(styles.section, className)}
    style={
      backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : null
    }
  >
    <div className={styles.row}>{children}</div>
  </section>
);

Section.propTypes = {
  children: Proptypes.node,
  backgroundImage: Proptypes.string,
  className: Proptypes.string
};

export default Section;
