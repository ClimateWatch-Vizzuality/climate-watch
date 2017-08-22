import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { themr } from 'react-css-themr';

import styles from './intro-styles.scss';

const Intro = (props) => {
  const { title, description, theme, className } = props;
  return (
    <div className={cx(className, theme.intro)}>
      <h2 className={theme.title}>
        {title}
      </h2>
      <p className={theme.description}>
        {description}
      </p>
    </div>
  );
};

Intro.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  theme: PropTypes.object,
  className: PropTypes.string
};

export default themr('Intro', styles)(Intro);
