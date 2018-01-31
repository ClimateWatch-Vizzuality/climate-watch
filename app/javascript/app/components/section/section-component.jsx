import React from 'react';
import Proptypes from 'prop-types';
import cn from 'classnames';

import layout from 'styles/layout.scss';
import styles from './section-styles.scss';

const Section = ({ children, backgroundImage, className, mobileConstrain }) => (
  <section
    className={cn(styles.section, className)}
    style={{
      backgroundImage: `url(${backgroundImage})`
    }}
  >
    <div
      className={cn(
        layout.content,
        styles.doubleFold,
        mobileConstrain ? layout.mobileConstrain : ''
      )}
    >
      {children}
    </div>
  </section>
);

Section.propTypes = {
  children: Proptypes.node,
  backgroundImage: Proptypes.string,
  className: Proptypes.string,
  mobileConstrain: Proptypes.bool
};

export default Section;
