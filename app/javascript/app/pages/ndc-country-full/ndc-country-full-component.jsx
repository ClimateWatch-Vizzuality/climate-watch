import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import Dropdown from 'components/dropdown';
import NdcsAutocompleteSearch from 'components/ndcs/ndcs-autocomplete-search';
import cx from 'classnames';
import NoContent from 'components/no-content';
import isEmpty from 'lodash/isEmpty';
import ScrollToHighlightIndex from 'components/scroll-to-highlight-index';
import Sticky from 'react-stickynode';
import Button from 'components/button';
import Loading from 'components/loading';
import NdcTranslationDisclaimer from 'components/ndcs/ndc-translation-disclaimer';

import { isR2LWrittedLanguage } from 'utils';

import layout from 'styles/layout.scss';
import contentStyles from 'styles/themes/content.scss';
import styles from './ndc-country-full-styles.scss';

class NDCCountryFull extends PureComponent {
  getPageContent() {
    const { content, loaded, search } = this.props;
    const hasContent = !isEmpty(content);
    if (hasContent) {
      return (
        <div className={cx(layout.content, styles.bodyContent)}>
          {!isEmpty(content) && (
            <div>
              {content.translated && (
                <NdcTranslationDisclaimer className={styles.disclaimer} />
              )}
              <div
                className={cx(contentStyles.content, {
                  [styles.innerContentRtl]: isR2LWrittedLanguage(
                    content.language
                  )
                })}
                dangerouslySetInnerHTML={{ __html: content.html }} // eslint-disable-line
              />
            </div>
          )}
          <ScrollToHighlightIndex
            idx={search.idx}
            targetElementsSelector={'.highlight'}
            content={content}
          />
        </div>
      );
    }
    return loaded ? (
      <NoContent className={styles.noContent} message="No content available" />
    ) : null;
  }

  render() {
    const {
      country,
      onDocumentChange,
      contentOptions,
      contentOptionSelected,
      route,
      fetchCountryNDCFull,
      iso,
      search,
      loading,
      content
    } = this.props;
    return (
      <div className={styles.page}>
        <Header route={route}>
          <div className={cx(layout.content, styles.header, styles.twoFold)}>
            <div className={styles.title}>
              {country && (
                <Intro title={`${country.wri_standard_name} - Full Content`} />
              )}
            </div>
            <Button variant="primary" link={`/ndcs/country/${iso}`}>
              View NDC Overview
            </Button>
          </div>
        </Header>
        <Sticky className={styles.sticky} top="#navBarMobile">
          <div className={styles.actionsWrapper}>
            <div className={styles.actions}>
              <Dropdown
                label="Document"
                options={contentOptions}
                value={contentOptionSelected}
                onValueChange={onDocumentChange}
                hideResetButton
                blueBorder
                disabled={contentOptions.length === 1}
              />
              <NdcsAutocompleteSearch
                className={styles.select}
                fetchSearchResults={fetchCountryNDCFull}
                document={
                  search.document ||
                  (contentOptionSelected && contentOptionSelected.value)
                }
                dark
                label
              />
            </div>
          </div>
        </Sticky>
        <div className={styles.contentContainer} id="ndc-content-container">
          {loading && !content && <Loading light className={styles.loader} />}
          {this.getPageContent()}
        </div>
      </div>
    );
  }
}

NDCCountryFull.propTypes = {
  route: PropTypes.object.isRequired,
  country: PropTypes.object,
  content: PropTypes.object,
  contentOptions: PropTypes.array,
  onDocumentChange: PropTypes.func,
  contentOptionSelected: PropTypes.object,
  loaded: PropTypes.bool,
  search: PropTypes.object,
  fetchCountryNDCFull: PropTypes.func,
  iso: PropTypes.string,
  loading: PropTypes.bool
};

NDCCountryFull.defaultProps = {
  content: {}
};

export default NDCCountryFull;
