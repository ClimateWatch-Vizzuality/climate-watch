import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './button-styles.scss';

const Button = (props) => {
  const { children, className, type, color, onClick } = props;
  const typeClass = type === 'icon' ? styles.square : '';
  const colorClass = color === 'transparent' ? styles.transparent : '';
  const classNames = cx(className, styles.button, typeClass, colorClass);
  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.object,
  className: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
