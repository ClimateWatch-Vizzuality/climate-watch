import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';

import search from 'assets/icons/search.svg';
import styles from './search-styles.scss';

class Search extends Component {
  handleChange = (e) => {
    const value = e.target.value;
    this.props.onChange(value);
  };

  render() {
    const { input, placeholder } = this.props;
    return (
      <div className={styles.search}>
        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
          onChange={this.handleChange}
          value={input}
        />
        <Icon icon={search} className={styles.iconSearch} />
      </div>
    );
  }
}

Search.propTypes = {
  input: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

export default Search;
