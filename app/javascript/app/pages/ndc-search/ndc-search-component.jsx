import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Sticky from 'react-stickynode';

import Header from 'components/header';
import Intro from 'components/intro';
import ResultCard from 'components/result-card';
import NDCSearchMap from 'components/ndcs-search-map';
import Search from 'components/search';
import NoContent from 'components/no-content';

import background from 'assets/backgrounds/home_bg_1';
import layout from 'styles/layout.scss';

import lightSearch from 'styles/themes/search-light.scss';
import styles from './ndc-search-styles.scss';

class SearchPage extends PureComponent {
  render() {
    const { results, query, onSearchChange } = this.props;
    return (
      <div>
        <Header image={background}>
          <div className={layout.content}>
            <div className={styles.headerCols}>
              <Intro title="NDC Content Search" />
              <Search
                theme={lightSearch}
                placeholder="Search"
                input={query}
                onChange={onSearchChange}
              />
            </div>
          </div>
        </Header>
        <div className={cx(layout.content, styles.contentCols)}>
          <div className={styles.resultsList}>
            {!results.length && (
              <NoContent message="No results for this search" />
            )}
            {results &&
              results.map(result => (
                <ResultCard
                  key={result.location.iso_code3}
                  result={result}
                  query={query}
                />
              ))}
          </div>
          <Sticky>
            <NDCSearchMap />
          </Sticky>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  query: PropTypes.string,
  results: PropTypes.array,
  onSearchChange: PropTypes.func.isRequired
};

SearchPage.defaultProps = {
  countriesOptions: []
};

export default SearchPage;
