import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './button-styles.scss';

const Button = props => {
  const {
    link,
    href,
    children,
    className,
    square,
    color,
    disabled,
    onClick,
    noBox,
    noSpace
  } = props;
  const classNames = cx(className, styles.button, {
    [styles.square]: square,
    [styles.transparent]: color === 'transparent',
    [styles.yellow]: color === 'yellow',
    [styles.white]: color === 'white',
    [styles.plain]: color === 'plain',
    [styles.red]: color === 'red',
    [styles.noBox]: noBox,
    [styles.disabled]: disabled || (!onClick && !link && !href),
    [styles.noSpace]: noSpace
  });
  if (href) {
    return (
      <a className={classNames} href={href}>
        {children}
      </a>
    );
  }
  return link ? (
    <NavLink className={classNames} to={link} onClick={onClick}>
      {children}
    </NavLink>
  ) : (
    <button
      title={disabled ? 'Coming soon' : ''}
      disabled={disabled}
      className={classNames}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  link: PropTypes.string,
  square: PropTypes.bool,
  color: PropTypes.string,
  noSpace: PropTypes.bool,
  noBox: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  noSpace: false,
  disabled: false,
  href: null
};

export default Button;
