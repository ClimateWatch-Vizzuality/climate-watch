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
import { Dropdown as CWDropdown } from 'cw-components';
import { LTS_COUNTRY } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';
import { TabletLandscape } from 'components/responsive';
import longArrowBack from 'assets/icons/long-arrow-back.svg';
import NdcsDocumentsMetaProvider from 'providers/ndcs-documents-meta-provider';
import { previousPathLabel, getPreviousLinkTo } from 'app/utils/history';

import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import lightSearch from 'styles/themes/search/search-light.scss';
import countryDropdownTheme from 'styles/themes/dropdown/dropdown-country.scss';
import styles from './lts-country-styles.scss';

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

  renderBackButton(lastPathLabel) {
    const { goBack } = this.props;
    const previousLinkTo = getPreviousLinkTo();
    return (
      <div className={styles.backButton}>
        {lastPathLabel && previousLinkTo.pathname ? (
          <Link to={previousLinkTo}>
            <Icon className={styles.backIcon} icon={longArrowBack} />
            Back to {lastPathLabel}
          </Link>
        ) : (
          <button className={styles.linkButton} onClick={goBack}>
            <Icon className={styles.backIcon} icon={longArrowBack} />
            Back
          </button>
        )}
      </div>
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
      notSummary,
      countriesOptions,
      handleCountryLink
    } = this.props;

    const hasSearch = notSummary;

    const clearRegexs = [/\/lts\/country/, /\/lts\/compare/];
    const directLinksRegexs = [
      { regex: /countries\/compare/, label: 'country compare' },
      { regex: /countries/, label: 'country' }
    ];
    const lastPathLabel = previousPathLabel(clearRegexs, directLinksRegexs);
    const countryName = country && `${country.wri_standard_name}`;

    const renderIntroDropdown = () => (
      <Intro
        title={
          <CWDropdown
            value={
              country && {
                label: country.wri_standard_name,
                value: country.iso_code3
              }
            }
            options={countriesOptions}
            onValueChange={handleCountryLink}
            hideResetButton
            theme={countryDropdownTheme}
          />
        }
      />
    );

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
                  [styles.withSearch]: hasSearch
                })}
              >
                {this.renderBackButton(lastPathLabel)}
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
              <div className={styles.title}>{renderIntroDropdown()}</div>
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
  documentsOptions: PropTypes.array,
  goBack: PropTypes.func.isRequired,
  handleCountryLink: PropTypes.func.isRequired,
  countriesOptions: PropTypes.array
};

export default LTSCountry;
