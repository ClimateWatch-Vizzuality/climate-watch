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
    id
  } = props;
  return (
    <div className={className}>
      <label
        className={cx(theme.switch, { [styles.toggleFirst]: toggleFirst })}
        htmlFor={id}
      >
        <input
          className={theme.checkbox}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          id={id}
          disabled={disabled}
        />
        <span className={theme.label}>{label}</span>
        <div className={cx(theme.slider, theme.round)} />
      </label>
    </div>
  );
};

CheckInputComponent.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  toggleFirst: PropTypes.bool,
  id: PropTypes.string,
  theme: PropTypes.object
};

export default themr('CheckInputComponent', styles)(CheckInputComponent);
