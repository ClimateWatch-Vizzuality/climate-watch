import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';
import AbbrReplace from 'components/abbr-replace';
import styles from './button-styles.scss';

const Button = props => {
  const {
    link,
    href,
    children,
    className,
    square,
    variant,
    disabled,
    onClick,
    dataFor,
    dataTip,
    dataTour,
    title,
    target
  } = props;
  const classNames = cx(className, styles.button, {
    [styles.square]: square,
    [styles[`v-${variant}`]]: !!variant,
    [styles.disabled]: disabled || (!onClick && !link && !href)
  });

  const tooltipProps = {
    'data-for': dataFor,
    'data-tip': dataTip
  };
  const dataTourProp = {
    'data-tour': dataTour
  };

  if (href) {
    return (
      <a
        className={classNames}
        href={href}
        target={target}
        {...tooltipProps}
        {...dataTourProp}
      >
        <AbbrReplace fixLayout>{children}</AbbrReplace>
      </a>
    );
  }
  return link ? (
    <NavLink
      className={classNames}
      to={link}
      onClick={disabled ? e => e.preventDefault() : onClick}
      target={target}
      {...tooltipProps}
      {...dataTourProp}
    >
      <AbbrReplace fixLayout>{children}</AbbrReplace>
    </NavLink>
  ) : (
    <button
      title={title || (disabled ? 'Coming soon' : '')}
      disabled={disabled}
      className={classNames}
      onClick={onClick}
      {...tooltipProps}
      {...dataTourProp}
    >
      <AbbrReplace fixLayout>{children}</AbbrReplace>
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  link: PropTypes.string,
  square: PropTypes.bool,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  dataFor: PropTypes.string,
  dataTip: PropTypes.string,
  title: PropTypes.string,
  target: PropTypes.string,
  dataTour: PropTypes.string
};

Button.defaultProps = {
  disabled: false,
  href: null,
  dataFor: null,
  dataTip: null
};

export default Button;
