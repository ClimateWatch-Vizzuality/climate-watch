import React from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';

import layout from 'styles/layout.scss';
import styles from './section-styles.scss';

const Section = ({ children, backgroundImage }) =>
  (<section
    className={styles.section}
    style={{
      backgroundImage: `url(${backgroundImage})`
    }}
  >
    <div className={cx(layout.content, layout.grid, layout.col2)}>
      {children}
    </div>
  </section>);

Section.propTypes = {
  children: Proptypes.node,
  backgroundImage: Proptypes.string
};

export default Section;
