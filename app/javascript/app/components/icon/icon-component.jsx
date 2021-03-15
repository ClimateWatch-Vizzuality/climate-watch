import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import cx from 'classnames';

import styles from './icon-styles.scss';

const Icon = ({ icon, theme, className = '', onClick, ariaLabel, ref }) => {
  const classNames = cx(className, theme.icon);
  return (
    <svg
      ref={ref}
      className={classNames}
      viewBox={icon.viewBox}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <use xlinkHref={`#${icon.id}`} />
    </svg>
  );
};

Icon.propTypes = {
  icon: PropTypes.object,
  className: PropTypes.string,
  ref: PropTypes.node,
  theme: PropTypes.object,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string
};

export default themr('Icon', styles)(Icon);
