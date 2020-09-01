import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Sticky from 'react-stickynode';
import Loading from 'components/loading';
import { TabletLandscape } from 'components/responsive';

import BackButton from 'components/back-button';
import Header from 'components/header';
import Intro from 'components/intro';
import ResultCard from 'components/result-card';
import Accordion from 'components/accordion';

import NDCSearchMap from 'components/ndcs/ndcs-search-map';
import NoContent from 'components/no-content';
import NdcsAutocompleteSearch from 'components/ndcs/ndcs-autocomplete-search';

import accordionTheme from 'styles/themes/accordion/accordion-ndc-search.scss';
import styles from './ndc-search-styles.scss';

class SearchPage extends PureComponent {
  render() {
    const {
      loading,
      results,
      search,
      route,
      fetchSearchResults,
      searchMessageText
    } = this.props;

    const hasNoContent = !results && !loading;
    return (
      <div className={styles.page}>
        <Header route={route}>
          <div className={styles.headerCols}>
            <BackButton pathname="/ndcs-explore" backLabel="Explore NDCs" />
            <Intro className={styles.intro} title="NDC Search" />
            <NdcsAutocompleteSearch
              className={styles.select}
              fetchSearchResults={fetchSearchResults}
              documentSelector
              global
            />
          </div>
        </Header>
        <div className={cx(styles.wrapperCols)}>
          <div className={cx(styles.contentCols)}>
            <div className="grid-column-item">
              <div className={styles.resultsList} id="resultList">
                {loading && <Loading light className={styles.loader} />}
                {hasNoContent && (
                  <NoContent
                    className={styles.noContent}
                    message={searchMessageText}
                  />
                )}
                {results && !loading && (
                  <Accordion
                    className={styles.accordion}
                    theme={accordionTheme}
                    param="section"
                    data={results}
                  >
                    {results.map(result => (
                      <ResultCard
                        className={styles.resultCard}
                        key={result.slug}
                        result={result}
                        search={search}
                      />
                    ))}
                  </Accordion>
                )}
              </div>
            </div>
            <TabletLandscape>
              <div className="grid-map-container">
                <Sticky
                  className={styles.map}
                  activeClass={styles.stickyMap}
                  top="#navBarMobile"
                  bottomBoundary="#resultList"
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
  searchMessageText: PropTypes.string,
  fetchSearchResults: PropTypes.func
};

SearchPage.defaultProps = {
  countriesOptions: []
};

export default SearchPage;
