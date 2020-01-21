import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import debounce from 'lodash/debounce';
import cx from 'classnames';
import { themr } from 'react-css-themr';

import searchIcon from 'assets/icons/search.svg';
import styles from './search-styles.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: props.value
    };
  }

  componentDidMount() {
    if (this.props.autofocus) {
      this.inputRef.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ search: nextProps.value });
    }
  }
  componentDidUpdate(prevProps) {
    const { autofocus } = this.props;
    if (autofocus && autofocus !== prevProps.autofocus) {
      this.inputRef.focus();
    }
  }

  handleChange = value => {
    this.setState({ search: value });
    this.debouncedChange();
  };

  debouncedChange = debounce(() => {
    const { onChange } = this.props;
    if (onChange) {
      this.props.onChange(this.state.search);
    }
  }, 300);

  render() {
    const { search } = this.state;
    const {
      icon,
      theme,
      placeholder,
      className,
      handleKeyUp,
      disabled,
      variant
    } = this.props;

    return (
      <div
        className={cx(
          styles.search,
          className,
          {
            [styles[`v-${variant}`]]: variant
          },
          theme.search
        )}
      >
        <input
          ref={el => {
            this.inputRef = el;
          }}
          type="text"
          className={cx(styles.input, theme.input)}
          placeholder={placeholder}
          onChange={e => this.handleChange(e.target.value)}
          value={search}
          onKeyUp={handleKeyUp}
          disabled={disabled}
        />
        {icon && (
          <Icon
            icon={searchIcon}
            className={cx(styles.iconSearch, theme.iconSearch)}
          />
        )}
      </div>
    );
  }
}

Search.propTypes = {
  icon: PropTypes.bool.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  autofocus: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  theme: PropTypes.object,
  handleKeyUp: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.string
};

Search.defaultProps = {
  icon: true,
  value: ''
};

export default themr('Search', styles)(Search);
