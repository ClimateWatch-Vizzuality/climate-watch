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

  componentWillReceiveProps(nextProps) {
    if (nextProps.input !== this.props.input) {
      this.setState({ search: nextProps.input });
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
  }, 150);

  render() {
    const { search } = this.state;
    const { theme, input, placeholder, className, handleKeyUp, disabled } = this.props;
    return (
      <div className={cx(styles.search, className, theme.search)}>
        <input
          type="text"
          className={cx(styles.input, theme.input)}
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
  onChange: PropTypes.func,
  className: PropTypes.string,
  theme: PropTypes.object,
  handleKeyUp: PropTypes.func,
  disabled: PropTypes.bool
};

Search.defaultProps = {
  input: ''
};

export default themr('Search', styles)(Search);
