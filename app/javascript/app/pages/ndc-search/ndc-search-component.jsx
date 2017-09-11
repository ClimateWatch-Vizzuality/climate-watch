import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import layout from 'styles/layout.scss';

class SearchPage extends PureComponent {
  render() {
    return (
      <div>
        <div className={layout.content}>I am the search page</div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  query: PropTypes.string, // eslint-disable-line
  results: PropTypes.array, // eslint-disable-line
  onResultClick: PropTypes.func.isRequired // eslint-disable-line
};

SearchPage.defaultProps = {
  countriesOptions: []
};

export default SearchPage;
