import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import Header from 'components/header';
import Intro from 'components/intro';
import Button from 'components/button';
import BackButton from 'components/back-button';
import Search from 'components/search';
import cx from 'classnames';
import Sticky from 'react-stickynode';
import AnchorNav from 'components/anchor-nav';
import CountriesDocumentsProvider from 'providers/countries-documents-provider';
import Dropdown from 'components/dropdown';
import { Dropdown as CWDropdown } from 'cw-components';
import { NDC_COUNTRY } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';
import { TabletPortrait, MobileOnly } from 'components/responsive';
import NdcsDocumentsProvider from 'providers/ndcs-documents-meta-provider';
import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import countryDropdownTheme from 'styles/themes/dropdown/dropdown-country.scss';
import styles from './ndc-country-styles.scss';

const FEATURE_LTS_EXPLORE = process.env.FEATURE_LTS_EXPLORE === 'true';
const FEATURE_NDC_FILTERING = process.env.FEATURE_NDC_FILTERING === 'true';
const FEATURE_COMMITMENTS_OVERVIEW =
  process.env.FEATURE_COMMITMENTS_OVERVIEW === 'true';

function NDCCountry(props) {
  const {
    country,
    onSearchChange,
    search,
    route,
    anchorLinks,
    notSummary,
    location,
    countriesOptions,
    handleCountryLink,
    documentsOptions,
    documentSelected,
    handleDropDownChange,
    match
  } = props;

  const { iso } = match.params;

  const renderDocumentsDropdown = () => (
    <Dropdown
      className={cx(styles.countryDropdown)}
      options={documentsOptions}
      value={documentSelected}
      onValueChange={handleDropDownChange}
      white
      hideResetButton
      disabled={!documentsOptions}
    />
  );

  const renderFullTextButton = () => (
    <Button
      variant="secondary"
      link={`/ndcs/country/${iso}/full?document=${documentSelected &&
        documentSelected.value}`}
      className={styles.viewDocumentButton}
      disabled={!documentsOptions}
    >
      View Full Text
    </Button>
  );

  const renderCompareButton = () => {
    if (!FEATURE_LTS_EXPLORE || FEATURE_COMMITMENTS_OVERVIEW) {
      return (
        <Button
          variant="primary"
          link={`/ndcs/compare/mitigation?locations=${iso}`}
        >
          Compare
        </Button>
      );
    }
    return (
      <div className={styles.compareButtonContainer}>
        <Button
          variant="primary"
          link={`/custom-compare/overview?targets=${iso}-${documentSelected &&
            documentSelected.value}`}
          className={styles.compareButton}
        >
          Compare Countries and Submissions
        </Button>
      </div>
    );
  };

  const countryName = country && `${country.wri_standard_name}`;
  const hasSearch = notSummary;

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
        descriptionContext={NDC_COUNTRY({ countryName })}
        subtitle={countryName}
      />
      <SocialMetadata
        descriptionContext={NDC_COUNTRY({ countryName })}
        href={location.href}
      />
      {FEATURE_NDC_FILTERING && <CountriesDocumentsProvider location={iso} />}
      {!FEATURE_NDC_FILTERING && <NdcsDocumentsProvider />}
      {country && (
        <Header route={route}>
          <div className={styles.header}>
            <div
              className={cx(styles.actionsContainer, {
                [styles.withSearch]: hasSearch,
                [styles.withoutBack]: !FEATURE_LTS_EXPLORE
              })}
            >
              {!FEATURE_LTS_EXPLORE && renderIntroDropdown()}
              {FEATURE_LTS_EXPLORE && (
                <BackButton backLabel="Explore NDCs" pathname="/ndcs-explore" />
              )}
              <TabletPortrait>
                {renderDocumentsDropdown()}
                {renderFullTextButton()}
                {!FEATURE_LTS_EXPLORE && renderCompareButton()}
              </TabletPortrait>
            </div>
            <TabletPortrait>
              {hasSearch && (
                <div className={styles.search}>
                  <Search
                    variant="transparent"
                    placeholder="Filter"
                    value={search}
                    onChange={onSearchChange}
                  />
                </div>
              )}
            </TabletPortrait>
            {FEATURE_LTS_EXPLORE && (
              <div className={styles.title}>{renderIntroDropdown()}</div>
            )}
            <MobileOnly>
              <div className={styles.mobileActions}>
                {renderDocumentsDropdown()}
                {hasSearch && (
                  <div className={styles.search}>
                    <Search
                      variant="transparent"
                      placeholder="Filter"
                      value={search}
                      onChange={onSearchChange}
                    />
                  </div>
                )}
              </div>
            </MobileOnly>
            <TabletPortrait>
              {FEATURE_LTS_EXPLORE && renderCompareButton()}
            </TabletPortrait>
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

NDCCountry.propTypes = {
  route: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  country: PropTypes.object,
  onSearchChange: PropTypes.func.isRequired,
  handleCountryLink: PropTypes.func.isRequired,
  search: PropTypes.string,
  anchorLinks: PropTypes.array,
  documentsOptions: PropTypes.array,
  documentSelected: PropTypes.object,
  countriesOptions: PropTypes.array,
  handleDropDownChange: PropTypes.func,
  location: PropTypes.object,
  notSummary: PropTypes.bool
};

export default NDCCountry;
