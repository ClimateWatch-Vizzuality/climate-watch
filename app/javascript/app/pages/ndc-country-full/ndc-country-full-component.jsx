import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import Button from 'components/button';
import Icon from 'components/icon';
import Search from 'components/search';
import cx from 'classnames';
import NoContent from 'components/no-content';
import isEmpty from 'lodash/isEmpty';

import layout from 'styles/layout.scss';
import backIcon from 'assets/icons/back.svg';
import lightSearch from 'styles/themes/search-light.scss';
import background from 'assets/backgrounds/home_bg_1';
import contentStyles from 'styles/content.scss';
import styles from './ndc-country-full-styles.scss';

class NDCCountryFull extends PureComponent {
  render() {
    const {
      loading,
      country,
      match,
      onSearchChange,
      search,
      content
    } = this.props;
    return (
      <div>
        <Header image={background}>
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
            <div className={styles.fiveFold}>
              <Search
                theme={lightSearch}
                placeholder="Search"
                input={search}
                onChange={onSearchChange}
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
              dangerouslySetInnerHTML={{ __html: content.html }}
            />
          )}
        </div>
      </div>
    );
  }
}

NDCCountryFull.propTypes = {
  match: Proptypes.object.isRequired,
  country: Proptypes.object.isRequired,
  onSearchChange: Proptypes.func.isRequired,
  search: Proptypes.string,
  content: Proptypes.object,
  loading: Proptypes.bool
};

export default NDCCountryFull;
