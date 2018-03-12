import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Sticky from 'react-stickynode';
import Loading from 'components/loading';
import { TabletLandscape } from 'components/responsive';

import AnchorNav from 'components/anchor-nav';
import Header from 'components/header';
import Intro from 'components/intro';
import ResultCard from 'components/result-card';
import NDCSearchMap from 'components/ndcs/ndcs-search-map';
import NoContent from 'components/no-content';
import NdcsAutocompleteSearch from 'components/ndcs/ndcs-autocomplete-search';

import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';

import styles from './ndc-search-styles.scss';

class SearchPage extends PureComponent {
  render() {
    const {
      loading,
      results,
      search,
      route,
      docOptions,
      anchorLinks,
      fetchSearchResults
    } = this.props;
    return (
      <div className={styles.page}>
        <Header route={route}>
          <div className={styles.headerCols}>
            <Intro title="NDC Content Search" />
            <div>
              <NdcsAutocompleteSearch
                className={styles.select}
                fetchSearchResults={fetchSearchResults}
                global
              />
            </div>
          </div>
          <Sticky activeClass="sticky -ndc-search" top="#navBarMobile">
            <div className={styles.anchorNav}>
              {docOptions.length > 1 && (
                <AnchorNav
                  useRoutes
                  links={anchorLinks}
                  theme={anchorNavRegularTheme}
                />
              )}
            </div>
          </Sticky>
        </Header>
        <div className={cx(styles.wrapperCols)}>
          <div className={cx(styles.contentCols)}>
            <div className="grid-column-item">
              <div className={styles.resultsList}>
                {loading && <Loading light className={styles.loader} />}
                {!results &&
                !loading && <NoContent message="No results for this search" />}
                {results &&
                  !loading &&
                  results.map(result => (
                    <ResultCard
                      className={styles.resultCard}
                      key={result.location.iso_code3}
                      result={result}
                      search={search}
                    />
                  ))}
              </div>
            </div>
            <TabletLandscape>
              <div className="grid-map-container">
                <Sticky
                  className={styles.map}
                  activeClass={styles.stickyMap}
                  top="#navBarMobile"
                >
                  <NDCSearchMap />
                </Sticky>
              </div>
            </TabletLandscape>
          </div>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  loading: PropTypes.bool,
  route: PropTypes.object.isRequired,
  search: PropTypes.object,
  results: PropTypes.array,
  docOptions: PropTypes.array,
  anchorLinks: PropTypes.array.isRequired,
  fetchSearchResults: PropTypes.func
};

SearchPage.defaultProps = {
  countriesOptions: []
};

export default SearchPage;
