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
import NdcsDocumentsMetaProvider from 'providers/ndcs-documents-meta-provider';
import Dropdown from 'components/dropdown';
import { NDC_COUNTRY } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';
import { TabletLandscape } from 'components/responsive';
import longArrowBack from 'assets/icons/long-arrow-back.svg';
import { toStartCase } from 'app/utils';

import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import theme from 'styles/themes/dropdown/dropdown-links.scss';
import lightSearch from 'styles/themes/search/search-light.scss';
import styles from './ndc-country-styles.scss';

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
  const clearRegexps = [/\/ndcs\/country/, /\/error-page/, /\/ndcs\/compare/];
  if (clearRegexps.some(r => pathname.match(r))) {
    sessionStorage.setItem('previousLocationPathname', '');
    return true;
  }
  return false;
};

class NDCCountry extends PureComponent {
  renderFullTextDropdown() {
    const { match, documentsOptions, handleDropDownChange } = this.props;

    return (
      documentsOptions &&
      (documentsOptions.length > 1 ? (
        <Dropdown
          className={theme.dropdownOptionWithArrow}
          placeholder="View full text"
          options={documentsOptions}
          onValueChange={handleDropDownChange}
          white
          hideResetButton
        />
      ) : (
        <Button
          color="yellow"
          link={`/ndcs/country/${match.params.iso}/full`}
          className={styles.viewDocumentButton}
        >
          {`View ${documentsOptions[0].label} Document`}
        </Button>
      ))
    );
  }

  render() {
    const {
      country,
      match,
      onSearchChange,
      search,
      route,
      anchorLinks,
      notSummary,
      location
    } = this.props;

    const countryName = country && `${country.wri_standard_name}`;
    const hasSearch = notSummary;
    const previousPathname = sessionStorage.getItem('previousLocationPathname');
    const previousSearch = sessionStorage.getItem('previousLocationSearch');

    const previousPathLabel = shouldClearPath(previousPathname)
      ? null
      : getPreviousPathLabel(previousPathname);

    return (
      <div>
        <MetaDescription
          descriptionContext={NDC_COUNTRY({ countryName })}
          subtitle={countryName}
        />
        <SocialMetadata
          descriptionContext={NDC_COUNTRY({ countryName })}
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
                {previousPathname && (
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
              <TabletLandscape>
                <div className={styles.compareButton}>
                  <Button
                    color="yellow"
                    link={`/ndcs/compare/mitigation?locations=${match.params.iso}`}
                  >
                    Compare countries and submissions
                  </Button>
                </div>
              </TabletLandscape>
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

NDCCountry.propTypes = {
  route: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  country: PropTypes.object,
  onSearchChange: PropTypes.func.isRequired,
  search: PropTypes.string,
  anchorLinks: PropTypes.array,
  documentsOptions: PropTypes.array,
  handleDropDownChange: PropTypes.func,
  location: PropTypes.object,
  notSummary: PropTypes.bool
};

export default NDCCountry;
