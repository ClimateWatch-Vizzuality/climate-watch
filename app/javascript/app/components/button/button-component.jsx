import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './button-styles.scss';

const Button = (props) => {
  const { link, children, className, type, color, disabled, onClick } = props;
  const classNames = cx(className, styles.button, {
    [styles.square]: type === 'icon',
    [styles.transparent]: color === 'transparent',
    [styles.yellow]: color === 'yellow',
    [styles.white]: color === 'white'
  });
  return link
    ? <NavLink className={classNames} to={link}>
      {children}
    </NavLink>
    : <button disabled={disabled} className={classNames} onClick={onClick}>
      {children}
    </button>;
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  link: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  disabled: false
};

export default Button;
