import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './search-styles.scss';

class SearchPage extends PureComponent {
  render() {
    return (
      <div>
        I'm the search page
      </div>
    );
  }
}

SearchPage.propTypes = {
  query: PropTypes.string,
  results: PropTypes.array,
  onResultClick: PropTypes.func.isRequired
};

SearchPage.defaultProps = {
  countriesOptions: []
};

export default SearchPage;
