import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';

import search from 'assets/icons/search.svg';
import styles from './search-styles.scss';

const Search = (props) => {
  const { input, placeholder, onChange } = props;
  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        placeholder={placeholder}
        onChange={onChange}
      />
      <Icon icon={search} className={styles.iconSearch} />
    </div>
  );
};

Search.propTypes = {
  input: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

export default Search;
