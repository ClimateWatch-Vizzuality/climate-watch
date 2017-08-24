import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import debounce from 'lodash/debounce';
import cx from 'classnames';
import { themr } from 'react-css-themr';

import search from 'assets/icons/search.svg';
import styles from './search-styles.scss';

class Search extends Component {
  handleChange = debounce((value) => {
    this.props.onChange(value);
  }, 150);

  render() {
    const { theme, input, placeholder, className } = this.props;
    return (
      <div className={cx(styles.search, className, theme.search)}>
        <input
          type="text"
          className={cx(styles.input, theme.input)}
          placeholder={placeholder}
          onChange={e => this.handleChange(e.target.value)}
          value={input}
        />
        <Icon
          icon={search}
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
  theme: PropTypes.object
};

export default themr('Search', styles)(Search);
