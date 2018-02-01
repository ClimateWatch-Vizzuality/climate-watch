import React from 'react';
import { themr } from 'react-css-themr';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './text-input-styles';

const InputComponent = ({
  className,
  value,
  theme,
  onChange,
  onFocus,
  failed
}) => (
  <input
    onChange={e => onChange(e.target.value)}
    onFocus={e => onFocus(e.target.value)}
    className={cx(className, theme.input, { [theme.inputFailed]: failed })}
    type="text"
    value={value}
  />
);

InputComponent.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  failed: PropTypes.bool,
  theme: PropTypes.object
};

export default themr('InputComponent', styles)(InputComponent);
