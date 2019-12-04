import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import Header from 'components/header';
import Intro from 'components/intro';
import Search from 'components/search';
import cx from 'classnames';
import Sticky from 'react-stickynode';
import AnchorNav from 'components/anchor-nav';
import { LTS_COUNTRY } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';

import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import lightSearch from 'styles/themes/search/search-light.scss';
import styles from './lts-country-styles.scss';

class LTSCountry extends PureComponent {
  render() {
    const {
      country,
      onSearchChange,
      search,
      route,
      anchorLinks,
      notSummary
    } = this.props;
    const countryName = country && `${country.wri_standard_name}`;
    return (
      <div>
        <MetaDescription
          descriptionContext={LTS_COUNTRY({ countryName })}
          subtitle={countryName}
        />
        <SocialMetadata
          descriptionContext={LTS_COUNTRY({ countryName })}
          href={location.href}
        />
        {country && (
          <Header route={route}>
            <div className={cx(styles.doubleFold, styles.header)}>
              <div className={styles.title}>
                <Intro title={country.wri_standard_name} />
              </div>
              {notSummary && (
                <Search
                  theme={lightSearch}
                  placeholder="Search"
                  value={search}
                  onChange={onSearchChange}
                />
              )}
            </div>
            <Sticky activeClass="sticky -ndcs" top="#navBarMobile">
              <AnchorNav
                useRoutes
                links={anchorLinks}
                className={styles.anchorNav}
                theme={anchorNavRegularTheme}
                gradientColor={route.headerColor}
              />
            </Sticky>
          </Header>
        )}
        <div className={styles.wrapper}>{renderRoutes(route.routes)}</div>
      </div>
    );
  }
}

LTSCountry.propTypes = {
  route: PropTypes.object.isRequired,
  country: PropTypes.object,
  onSearchChange: PropTypes.func.isRequired,
  search: PropTypes.string,
  anchorLinks: PropTypes.array,
  notSummary: PropTypes.bool
};

export default LTSCountry;
