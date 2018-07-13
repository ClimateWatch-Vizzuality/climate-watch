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
      disabled,
      onChange,
      value,
      placeholder,
      label,
      inputType,
      required,
      optional
    } = this.props;

    const inputProps = {
      ref: el => {
        this.inputRef = el;
      },
      className: cx(styles.input, className, theme.input, {
        [theme.disabled]: disabled,
        [theme.inputFailed]: required && !value,
        [theme.textArea]: inputType === 'textarea'
      }),
      onChange,
      disabled,
      value,
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
        {!value &&
        required && (
         <span className={theme.requiredError}>This field is required</span>
          )}
        {optional && <span className={theme.optional}>(optional)</span>}
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
  required: PropTypes.bool,
  optional: PropTypes.bool,
  disabled: PropTypes.bool,
  theme: PropTypes.object
};

export default themr('InputComponent', styles)(InputComponent);
