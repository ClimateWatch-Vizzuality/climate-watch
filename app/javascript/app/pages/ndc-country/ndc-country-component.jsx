import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import Header from 'components/header';
import Intro from 'components/intro';
import Button from 'components/button';
import Search from 'components/search';
import cx from 'classnames';
import Sticky from 'react-stickynode';
import AnchorNav from 'components/anchor-nav';
import Dropdown from 'components/dropdown';

import theme from 'styles/themes/dropdown/dropdown-links.scss';
import lightSearch from 'styles/themes/search/search-light.scss';
import layout from 'styles/layout.scss';
import styles from './ndc-country-styles.scss';

class NDCCountry extends PureComponent {
  render() {
    const {
      country,
      match,
      onSearchChange,
      handleDropDownChange,
      search,
      route,
      anchorLinks
    } = this.props;
    return (
      <div>
        {country && (
          <Header route={route}>
            <div
              className={cx(layout.content, styles.doubleFold, styles.header)}
            >
              <div className={styles.title}>
                <Intro title={country.wri_standard_name} />
              </div>
              <div className={styles.threeFold}>
                <Dropdown
                  className={theme.dropdownOptionWithArrow}
                  placeholder="Select a document"
                  onValueChange={handleDropDownChange}
                  hideResetButton
                  white
                />
                <Search
                  theme={lightSearch}
                  placeholder="Search"
                  input={search}
                  onChange={onSearchChange}
                />
                <Button
                  color="yellow"
                  link={`/ndcs/compare/mitigation?locations=${match.params
                    .iso}`}
                >
                  Compare
                </Button>
              </div>
            </div>
            <Sticky activeClass="sticky">
              <AnchorNav
                useRoutes
                links={anchorLinks}
                className={layout.content}
              />
            </Sticky>
          </Header>
        )}
        <div className={styles.wrapper}>{renderRoutes(route.routes)}</div>
      </div>
    );
  }
}

NDCCountry.propTypes = {
  route: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  country: PropTypes.object,
  onSearchChange: PropTypes.func.isRequired,
  search: PropTypes.string,
  anchorLinks: PropTypes.array,
  handleDropDownChange: PropTypes.func
};

export default NDCCountry;
