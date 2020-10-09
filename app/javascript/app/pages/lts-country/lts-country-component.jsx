import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import Header from 'components/header';
import Intro from 'components/intro';
import Button from 'components/button';
import Icon from 'components/icon';
import BackButton from 'components/back-button';
import Search from 'components/search';
import cx from 'classnames';
import Sticky from 'react-stickynode';
import AnchorNav from 'components/anchor-nav';
import { Dropdown as CWDropdown } from 'cw-components';
import { LTS_COUNTRY } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';
import { TabletPortrait, MobileOnly } from 'components/responsive';
import externalLinkIcon from 'assets/icons/external-link.svg';

import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import countryDropdownTheme from 'styles/themes/dropdown/dropdown-country.scss';
import styles from './lts-country-styles.scss';

class LTSCountry extends PureComponent {
  renderFullTextDropdown() {
    const { documentLink } = this.props;
    return (
      <Button
        variant="secondary"
        href={documentLink}
        className={styles.viewDocumentButton}
        disabled={!documentLink}
        target="_blank"
      >
        View LTS Document
        <Icon className={styles.externalLinkIcon} icon={externalLinkIcon} />
      </Button>
    );
  }

  renderCompareButton() {
    const { match } = this.props;
    return (
      <div className={styles.compareButtonContainer}>
        <Button
          variant="primary"
          link={`/custom-compare/overview?targets=${match.params.iso}-lts`}
          className={styles.compareButton}
        >
          Compare Countries and Submissions
        </Button>
      </div>
    );
  }

  renderCountryOption = option => (
    <div
      className={cx('simple-option', { [styles.boldOption]: !!option.hasData })}
    >
      {option.label}
    </div>
  );
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
            renderOption={this.renderCountryOption}
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
        {country && (
          <Header route={route}>
            <div className={styles.header}>
              <div
                className={cx(styles.actionsContainer, {
                  [styles.withSearch]: hasSearch
                })}
              >
                <BackButton backLabel="Explore LTS" pathname="/lts-explore" />
                <TabletPortrait>
                  {this.renderFullTextDropdown()}
                  {hasSearch && (
                    <Search
                      placeholder="Filter"
                      value={search}
                      onChange={onSearchChange}
                      variant="transparent"
                    />
                  )}
                </TabletPortrait>
              </div>
              <div className={styles.title}>{renderIntroDropdown()}</div>
              <MobileOnly>
                <div className={styles.mobileActions}>
                  {this.renderFullTextDropdown()}
                  {hasSearch && (
                    <Search
                      placeholder="Filter"
                      value={search}
                      onChange={onSearchChange}
                      variant="transparent"
                    />
                  )}
                </div>
              </MobileOnly>
              <TabletPortrait>{this.renderCompareButton()}</TabletPortrait>
            </div>
            <Sticky activeClass="sticky -ndcs" top="#navBarMobile">
              <AnchorNav
                useRoutes
                links={anchorLinks}
                className={styles.anchorNav}
                theme={anchorNavRegularTheme}
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
  documentLink: PropTypes.string,
  handleCountryLink: PropTypes.func.isRequired,
  countriesOptions: PropTypes.array
};

export default LTSCountry;
