import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './button-styles.scss';

const Button = (props) => {
  const { children, className, type, color, disabled, onClick } = props;
  const classNames = cx(className, styles.button, {
    [styles.square]: type === 'icon',
    [styles.transparent]: color === 'transparent',
    [styles.yellow]: color === 'yellow'
  });
  return (
    <button disabled={disabled} className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  disabled: false
};

export default Button;
