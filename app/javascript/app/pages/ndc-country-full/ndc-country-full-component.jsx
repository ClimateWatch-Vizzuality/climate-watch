import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import Dropdown from 'components/dropdown';
import NdcsAutocompleteSearch from 'components/ndcs-autocomplete-search';
import cx from 'classnames';
import NoContent from 'components/no-content';
import isEmpty from 'lodash/isEmpty';
import ScrollToHighlightIndex from 'components/scroll-to-highlight-index';
import Sticky from 'react-stickynode';

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
            <div
              className={cx(contentStyles.content, styles.innerContent)}
              dangerouslySetInnerHTML={{ __html: content.html }} // eslint-disable-line
            />
          )}
          <ScrollToHighlightIndex
            idx={search.idx}
            targetElementsSelector={'.highlight'}
            content={content}
          />
        </div>
      );
    }
    return loaded ? <NoContent message="No content available" /> : null;
  }

  render() {
    const {
      country,
      onDocumentChange,
      contentOptions,
      contentOptionSelected,
      route,
      fetchCountryNDCFull
    } = this.props;
    return (
      <div>
        <Header route={route}>
          <div className={cx(layout.content, styles.header)}>
            <div className={styles.title}>
              {country && (
                <Intro title={`${country.wri_standard_name} - Full Content`} />
              )}
            </div>
          </div>
        </Header>
        <Sticky>
          <div className={styles.actionsWrapper}>
            <div className={cx(layout.content, styles.actions)}>
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
                dark
                label
              />
            </div>
          </div>
        </Sticky>
        {this.getPageContent()}
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
  fetchCountryNDCFull: PropTypes.func
};

export default NDCCountryFull;
