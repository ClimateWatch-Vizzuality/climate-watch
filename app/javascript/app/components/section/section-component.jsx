import React from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';

import layout from 'styles/layout.scss';
import styles from './section-styles.scss';

const Section = ({ children, backgroundImage, className }) =>
  (<section
    className={styles.section}
    style={{
      backgroundImage: `url(${backgroundImage})`
    }}
  >
    <div className={cx(className, layout.content, styles.doubleFold)}>
      {children}
    </div>
  </section>);

Section.propTypes = {
  children: Proptypes.node,
  backgroundImage: Proptypes.string,
  className: Proptypes.string
};

export default Section;
