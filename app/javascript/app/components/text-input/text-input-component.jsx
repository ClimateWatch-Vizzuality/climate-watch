import React, { Component } from 'react';
import { themr } from 'react-css-themr';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './text-input-styles';

class InputComponent extends Component {
  render() {
    const {
      theme,
      className,
      failed,
      disabled,
      value,
      onChange,
      placeholder,
      label,
      inputType
    } = this.props;

    const inputProps = {
      ref: el => {
        this.inputRef = el;
      },
      className: cx(styles.input, className, theme.input, {
        [theme.disabled]: disabled,
        [theme.inputFailed]: failed
      }),
      onChange: e => onChange(e.target.value),
      value: value || '',
      disabled,
      placeholder
    };
    const labelProp = label ? { id: label } : {};

    const input =
      inputType === 'textarea' ? (
        <textarea {...inputProps} {...labelProp} />
      ) : (
        <input {...inputProps} {...labelProp} />
      );

    return (
      <div>
        {label && (
          // eslint-disable-next-line jsx-a11y/label-has-for
          <label htmlFor={label} className={theme.label}>
            {label}
          </label>
        )}
        {input}
      </div>
    );
  }
}

InputComponent.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  inputType: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  failed: PropTypes.bool,
  disabled: PropTypes.bool,
  theme: PropTypes.object
};

export default themr('InputComponent', styles)(InputComponent);
