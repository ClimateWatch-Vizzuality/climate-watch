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
      search: props.input
    };
  }

  componentDidMount() {
    if (this.props.autofocus) {
      this.inputRef.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.input !== this.props.input) {
      this.setState({ search: nextProps.input });
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
      theme,
      input,
      placeholder,
      className,
      handleKeyUp,
      disabled,
      plain
    } = this.props;
    return (
      <div className={cx(styles.search, className, theme.search)}>
        <input
          ref={el => {
            this.inputRef = el;
          }}
          type="text"
          className={cx(styles.input, theme.input, plain ? styles.plain : '')}
          placeholder={placeholder}
          onChange={e => this.handleChange(e.target.value)}
          value={search}
          onKeyUp={handleKeyUp}
          disabled={disabled}
        />
        <Icon
          icon={searchIcon}
          className={cx(styles.iconSearch, theme.iconSearch)}
        />
      </div>
    );
  }
}

Search.propTypes = {
  input: PropTypes.string,
  placeholder: PropTypes.string,
  autofocus: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  theme: PropTypes.object,
  handleKeyUp: PropTypes.func,
  disabled: PropTypes.bool,
  plain: PropTypes.bool
};

Search.defaultProps = {
  input: ''
};

export default themr('Search', styles)(Search);
