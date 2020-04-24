import React from 'react';
import Accordion from 'components/accordion';
import theme from 'styles/themes/accordion/accordion-custom-compare.scss';

import styles from './custom-compare-accordion-styles.scss';

const placeholderData = [
  {
    slug: 'planning_and_implementation',
    title: 'Planning and Implementation'
  },
  {
    slug: 'summary_information',
    title: 'Summary Information'
  }
];

const CustomCompareAccordionComponent = () => (
  <div>
    <Accordion
      className={styles.accordio2n}
      param="section"
      data={placeholderData}
      hasNestedCollapse
      theme={theme}
    />
  </div>
);

export default CustomCompareAccordionComponent;
