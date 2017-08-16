import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';

import styles from './accordion-styles.scss';

const Accordion = (props) => {
  const { children } = props;
  return (
    <Collapse isOpened={false} className={styles.accordion}>
      {children}
    </Collapse>
  );
};

Accordion.propTypes = {
  children: PropTypes.object
};

export default Accordion;
