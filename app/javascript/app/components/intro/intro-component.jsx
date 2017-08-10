import React from 'react';
import PropTypes from 'prop-types';

import styles from './intro-styles.scss';

const Intro = (props) => {
  const { title, description } = props;
  return (
    <div className={styles.intro}>
      <h2 className={styles.title}>
        {title}
      </h2>
      <p className={styles.description}>
        {description}
      </p>
    </div>
  );
};

Intro.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

export default Intro;
