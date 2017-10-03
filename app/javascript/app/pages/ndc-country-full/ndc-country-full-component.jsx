import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import Button from 'components/button';
import Icon from 'components/icon';
import Dropdown from 'components/dropdown';
import Search from 'components/search';
import cx from 'classnames';
import NoContent from 'components/no-content';
import isEmpty from 'lodash/isEmpty';
import getHeaderBg from 'utils/header';

import layout from 'styles/layout.scss';
import backIcon from 'assets/icons/back.svg';
import lightSearch from 'styles/themes/search/search-light.scss';
import contentStyles from 'styles/themes/content.scss';
import styles from './ndc-country-full-styles.scss';

class NDCCountryFull extends PureComponent {
  render() {
    const {
      loading,
      country,
      match,
      onSearchChange,
      search,
      onSelectChange,
      content,
      contentOptions,
      route
    } = this.props;

    return (
      <div>
        <Header image={getHeaderBg(route.header)}>
          <div className={cx(layout.content, styles.twoFold, styles.header)}>
            <div className={styles.title}>
              <Button
                className={styles.backButton}
                color="transparent"
                link={`/ndcs/country/${match.params.iso}`}
                square
              >
                <Icon className={styles.backIcon} icon={backIcon} />
              </Button>
              <Intro title={`${country.wri_standard_name} Full Content`} />
            </div>
            <div
              className={
                contentOptions.length > 1 ? (
                  styles.twoFoldReversed
                ) : (
                  styles.oneFold
                )
              }
            >
              {contentOptions.length > 1 && (
                <Dropdown
                  white
                  searchable={false}
                  clearable={false}
                  options={contentOptions}
                  value={content.id}
                  onChange={onSelectChange}
                />
              )}
              <Search
                theme={lightSearch}
                placeholder="Search"
                input={search}
                onChange={onSearchChange}
                disabled={isEmpty(content)}
              />
            </div>
          </div>
        </Header>
        {isEmpty(content) &&
        !loading && <NoContent message="No content available" />}
        <div className={cx(layout.content, styles.bodyContent)}>
          {!isEmpty(content) && (
            <div
              className={cx(contentStyles.content, styles.innerContent)}
              dangerouslySetInnerHTML={{ __html: content.html }} // eslint-disable-line
            />
          )}
        </div>
      </div>
    );
  }
}

NDCCountryFull.propTypes = {
  route: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  country: PropTypes.object.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  search: PropTypes.string,
  content: PropTypes.object,
  contentOptions: PropTypes.array,
  onSelectChange: PropTypes.func,
  loading: PropTypes.bool
};

export default NDCCountryFull;
