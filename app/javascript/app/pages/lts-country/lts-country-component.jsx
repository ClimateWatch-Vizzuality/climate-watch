import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { Link } from 'react-router-dom';
import Header from 'components/header';
import Intro from 'components/intro';
import Icon from 'components/icon';
import Button from 'components/button';
import Search from 'components/search';
import cx from 'classnames';
import Sticky from 'react-stickynode';
import AnchorNav from 'components/anchor-nav';
import { LTS_COUNTRY } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';
import { TabletLandscape } from 'components/responsive';
import longArrowBack from 'assets/icons/long-arrow-back.svg';
import { toStartCase } from 'app/utils';
import NdcsDocumentsMetaProvider from 'providers/ndcs-documents-meta-provider';

import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import lightSearch from 'styles/themes/search/search-light.scss';
import styles from './lts-country-styles.scss';

const getPreviousPathLabel = previousPathname => {
  const updatedPathname = previousPathname;
  let lastPathLabel = {
    '/': 'Home'
  }[previousPathname];
  const regexs = [
    { regex: /countries\/compare/, label: 'country compare' },
    { regex: /countries/, label: 'country' }
  ];

  regexs.some(regexWithLabel => {
    const { regex, label } = regexWithLabel;
    if (previousPathname && previousPathname.match(regex)) {
      lastPathLabel = label;
      return true;
    }
    return false;
  });
  return lastPathLabel || (updatedPathname && toStartCase(updatedPathname));
};

const shouldClearPath = pathname => {
  if (!pathname) return false;
  const clearRegexps = [/\/ndcs\/country/, /\/error-page/, /\/ndcs\/compare/];
  if (clearRegexps.some(r => pathname.match(r))) {
    sessionStorage.setItem('previousLocationPathname', '');
    return true;
  }
  return false;
};

class LTSCountry extends PureComponent {
  renderFullTextDropdown() {
    const { match, documentsOptions } = this.props;
    return (
      documentsOptions && (
        <Button
          color="yellow"
          link={`/lts/country/${match.params.iso}/full`}
          className={styles.viewDocumentButton}
          disabled
        >
          View LTS Document
        </Button>
      )
    );
  }

  renderCompareButton() {
    const { match } = this.props;
    return (
      <div className={styles.compareButton}>
        <Button
          color="yellow"
          link={`/lts/compare/mitigation?locations=${match.params.iso}`}
          disabled
        >
          {'Compare countries and submissions'}
        </Button>
      </div>
    );
  }

  render() {
    const {
      country,
      onSearchChange,
      search,
      route,
      anchorLinks,
      notSummary
    } = this.props;

    const hasSearch = notSummary;
    const previousPathname = sessionStorage.getItem('previousLocationPathname');
    const previousSearch = sessionStorage.getItem('previousLocationSearch');

    const previousPathLabel = shouldClearPath(previousPathname)
      ? null
      : getPreviousPathLabel(previousPathname);

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
        <NdcsDocumentsMetaProvider />
        {country && (
          <Header route={route}>
            <div className={styles.header}>
              <div
                className={cx(styles.actionsContainer, {
                  [styles.withSearch]: hasSearch,
                  [styles.withoutBack]: !previousPathname
                })}
              >
                {previousPathLabel && (
                  <div className={styles.backButton}>
                    <Link
                      to={{
                        pathname: previousPathname,
                        search: previousSearch
                      }}
                    >
                      <Icon className={styles.backIcon} icon={longArrowBack} />
                      Back to {previousPathLabel}
                    </Link>
                  </div>
                )}
                {this.renderFullTextDropdown()}
                {hasSearch && (
                  <Search
                    theme={lightSearch}
                    placeholder="Search"
                    value={search}
                    onChange={onSearchChange}
                  />
                )}
              </div>
              <div className={styles.title}>
                <Intro title={country.wri_standard_name} />
              </div>
              <TabletLandscape>{this.renderCompareButton()}</TabletLandscape>
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
  notSummary: PropTypes.bool,
  match: PropTypes.object.isRequired,
  documentsOptions: PropTypes.array
};

export default LTSCountry;
