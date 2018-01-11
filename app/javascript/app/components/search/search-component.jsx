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

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ search: nextProps.value });
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
      plain
    } = this.props;
    return (
      <div className={cx(styles.search, className, theme.search)}>
        <input
          type="text"
          className={cx(styles.input, theme.input, plain ? styles.plain : '')}
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
  onChange: PropTypes.func,
  className: PropTypes.string,
  theme: PropTypes.object,
  handleKeyUp: PropTypes.func,
  disabled: PropTypes.bool,
  plain: PropTypes.bool
};

Search.defaultProps = {
  icon: true,
  value: ''
};

export default themr('Search', styles)(Search);
