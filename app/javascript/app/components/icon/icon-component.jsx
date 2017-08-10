import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import cx from 'classnames';

import styles from './icon-styles.scss';

const Icon = ({ icon, theme, className = '' }) => {
  const classNames = cx(className, theme.icon);
  return (
    <svg className={classNames} viewBox={icon.viewBox}>
      <use xlinkHref={`#${icon.id}`} />
    </svg>
  );
};

Icon.propTypes = {
  icon: PropTypes.object,
  className: PropTypes.string,
  theme: PropTypes.object
};

export default themr('Icon', styles)(Icon);
