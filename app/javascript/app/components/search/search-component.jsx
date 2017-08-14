import React from 'react';
import PropTypes from 'prop-types';

import styles from './search-styles.scss';

const Search = (props) => {
  const { input, placeholder, onChange } = props;
  return (
    <input
      className={styles.search}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

Search.propTypes = {
  input: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

export default Search;
