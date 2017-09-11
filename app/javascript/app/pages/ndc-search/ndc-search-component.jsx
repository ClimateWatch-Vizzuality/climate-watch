import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Header from 'components/header';
import Intro from 'components/intro';
import AutocompleteSearch from 'components/autocomplete-search';
import NDCSearchMap from 'components/ndcs-search-map';

import background from 'assets/backgrounds/home_bg_1';
import layout from 'styles/layout.scss';

import styles from './ndc-search-styles.scss';

class SearchPage extends PureComponent {
  render() {
    return (
      <div>
        <Header image={background}>
          <div className={layout.content}>
            <div className={styles.headerCols}>
              <Intro title="NDC Content Search" />
              <AutocompleteSearch />
            </div>
          </div>
        </Header>
        <div className={cx(layout.content, styles.contentCols)}>
          <div className="resultsList">results here</div>
          <NDCSearchMap />
        </div>
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
