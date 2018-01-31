import React from 'react';
import { themr } from 'react-css-themr';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './input-styles';

const InputComponent = ({
  className,
  value,
  theme,
  onChange,
  onFocus,
  error,
  ...props
}) => (
  <input
    onChange={e => onChange(e.target.value)}
    onFocus={e => onFocus(e.target.value)}
    className={cx(className, theme.input, { [theme.inputError]: error })}
    type="text"
    value={value}
    {...{ props }}
  />
);

InputComponent.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  error: PropTypes.bool,
  data: PropTypes.array,
  theme: PropTypes.object
};

export default themr('InputComponent', styles)(InputComponent);
