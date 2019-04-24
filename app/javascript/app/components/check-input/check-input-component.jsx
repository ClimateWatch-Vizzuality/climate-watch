/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { themr } from 'react-css-themr';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './check-input-styles';

const CheckInputComponent = props => {
  const {
    className,
    label,
    checked,
    onChange,
    theme,
    toggleFirst,
    disabled,
    errorText
  } = props;
  return (
    <div className={className}>
      <label
        className={cx(theme.switch, {
          [styles.toggleFirst]: toggleFirst,
          [styles.disabled]: disabled
        })}
      >
        <input
          className={theme.checkbox}
          type="checkbox"
          checked={!disabled && checked}
          onChange={onChange}
          disabled={disabled}
        />
        <span className={theme.label}>{label}</span>
        <div
          className={cx(theme.slider, theme.round, {
            [styles.disabled]: disabled
          })}
        />
        {disabled &&
        errorText && <div className={styles.errorText}>{errorText}</div>}
      </label>
    </div>
  );
};

CheckInputComponent.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  errorText: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  toggleFirst: PropTypes.bool,
  theme: PropTypes.object
};

export default themr('CheckInputComponent', styles)(CheckInputComponent);
