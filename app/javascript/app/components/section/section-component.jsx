import React from 'react';
import Proptypes from 'prop-types';
import cn from 'classnames';

import layout from 'styles/layout.scss';
import styles from './section-styles.scss';

const Section = ({ children, backgroundImage, className }) => (
  <section
    className={cn(styles.section, className)}
    style={
      backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : null
    }
  >
    <div className={cn(layout.content, styles.doubleFold)}>{children}</div>
  </section>
);

Section.propTypes = {
  children: Proptypes.node,
  backgroundImage: Proptypes.string,
  className: Proptypes.string
};

export default Section;
