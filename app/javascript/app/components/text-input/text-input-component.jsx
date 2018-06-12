import React, { Component } from 'react';
import { themr } from 'react-css-themr';
import PropTypes from 'prop-types';
import cx from 'classnames';
import debounce from 'lodash/debounce';

import styles from './text-input-styles';

class InputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange = value => {
    this.setState({ value });
    this.debouncedChange();
  };

  debouncedChange = debounce(() => {
    const { onChange } = this.props;
    if (onChange) {
      this.props.onChange(this.state.value);
    }
  }, 100);

  render() {
    const {
      theme,
      className,
      failed,
      disabled,
      value,
      placeholder,
      label
    } = this.props;

    const inputProps = {
      ref: el => {
        this.inputRef = el;
      },
      className: cx(styles.input, className, theme.input, {
        [theme.disabled]: disabled,
        [theme.inputFailed]: failed
      }),
      onChange: e => this.handleChange(e.target.value),
      value,
      disabled,
      placeholder
    };
    const labelProp = label ? { id: label } : {};

    return (
      <div>
        {label && (
          <label htmlFor={label} className={theme.label}>
            {label}
          </label>
        )}
        <input type="text" {...inputProps} {...labelProp} />
      </div>
    );
  }
}

InputComponent.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  failed: PropTypes.bool,
  disabled: PropTypes.bool,
  theme: PropTypes.object
};

export default themr('InputComponent', styles)(InputComponent);
