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
    noSpace,
    dataFor,
    dataTip,
    title,
    target
  } = props;
  const classNames = cx(className, styles.button, {
    [styles.square]: square,
    [styles[color]]: !!color,
    [styles.noBox]: noBox,
    [styles.disabled]: disabled || (!onClick && !link && !href),
    [styles.noSpace]: noSpace
  });

  const tooltipProps = {
    'data-for': dataFor,
    'data-tip': dataTip
  };

  if (href) {
    return (
      <a className={classNames} href={href} target={target} {...tooltipProps}>
        {children}
      </a>
    );
  }
  return link ? (
    <NavLink
      className={classNames}
      to={link}
      onClick={onClick}
      target={target}
      {...tooltipProps}
    >
      {children}
    </NavLink>
  ) : (
    <button
      title={title || (disabled ? 'Coming soon' : '')}
      disabled={disabled}
      className={classNames}
      onClick={onClick}
      {...tooltipProps}
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
  onClick: PropTypes.func,
  dataFor: PropTypes.string,
  dataTip: PropTypes.string,
  title: PropTypes.string,
  target: PropTypes.string
};

Button.defaultProps = {
  noSpace: false,
  disabled: false,
  href: null,
  dataFor: null,
  dataTip: null
};

export default Button;
