import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import Button from 'components/button';
import Icon from 'components/icon';
import Dropdown from 'components/dropdown';
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
      onSelectChange,
      selected,
      content
    } = this.props;

    const selectOptions = content
      ? content.map(item => ({
        value: item.id,
        label: `#${item.id}`
      }))
      : [];

    const selectedContent =
      !isEmpty(content) &&
      (content.length > 1
        ? content.find(item => item.id === selected)
        : content[0]);

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
            <div
              className={
                selectOptions.length > 1 ? (
                  styles.twoFoldReversed
                ) : (
                  styles.oneFold
                )
              }
            >
              {selectOptions.length > 1 && (
                <Dropdown
                  white
                  searchable={false}
                  clearable={false}
                  options={selectOptions}
                  value={selected}
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
          {!isEmpty(selectedContent) && (
            <div
              className={cx(contentStyles.content, styles.innerContent)}
              dangerouslySetInnerHTML={{ __html: selectedContent.html }} // eslint-disable-line
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
  content: Proptypes.array,
  onSelectChange: Proptypes.func,
  selected: Proptypes.number,
  loading: Proptypes.bool
};

export default NDCCountryFull;
