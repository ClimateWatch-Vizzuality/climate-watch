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
// Use NDC Document Provider in the main page to prevent race conditions loading NDC accordions
import NdcsDocumentsProvider from 'providers/documents-provider';
import Dropdown from 'components/dropdown';
import { Dropdown as CWDropdown } from 'cw-components';
import { SEO_PAGES } from 'data/seo';
import SEOTags from 'components/seo-tags';
import { TabletPortrait, MobileOnly } from 'components/responsive';
import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import countryDropdownTheme from 'styles/themes/dropdown/dropdown-country.scss';
import styles from './ndc-country-styles.scss';

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
    handleDownloadAnalytics,
    match
  } = props;

  const { iso } = match.params;

  const renderDocumentsDropdown = () => (
    <span data-tour="ndcs-country-01">
      <Dropdown
        className={cx(styles.countryDropdown)}
        options={documentsOptions}
        value={documentSelected}
        onValueChange={handleDropDownChange}
        white
        hideResetButton
        disabled={!documentsOptions}
        noAutoSort
      />
    </span>
  );

  const renderFullTextButton = () => (
    <span data-tour="ndcs-country-02">
      <Button
        variant="secondary"
        link={`/ndcs/country/${iso}/full?document=${documentSelected &&
          documentSelected.value}`}
        className={styles.viewDocumentButton}
        disabled={!documentsOptions}
      >
        View Full Text
      </Button>
    </span>
  );

  const renderDownloadButton = () => (
    <span data-tour="ndcs-country-03">
      <Button
        variant="secondary"
        onClick={() =>
          documentSelected &&
          documentSelected.url &&
          handleDownloadAnalytics(documentSelected)
        }
        href={documentSelected && documentSelected.url}
        target="_blank"
        className={styles.viewDocumentButton}
        disabled={!documentsOptions}
      >
        Download original PDF
      </Button>
    </span>
  );

  const renderCompareButton = () => (
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

  const countryName = country && country.wri_standard_name;
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
      <SEOTags
        page={SEO_PAGES.ndcCountry}
        dynamicTitlePart={countryName}
        countryName={countryName}
        href={location.href}
        canonicalAttribute={iso}
      />
      <CountriesDocumentsProvider location={iso} />
      <NdcsDocumentsProvider />
      {country && (
        <Header route={route}>
          <div className={styles.header}>
            <div
              className={cx(styles.actionsContainer, {
                [styles.withSearch]: hasSearch
              })}
            >
              <BackButton backLabel="Explore NDCs" pathname="/ndcs-explore" />
              <TabletPortrait>
                {renderDocumentsDropdown()}
                {renderFullTextButton()}
                {renderDownloadButton()}
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
            <div className={styles.title}>{renderIntroDropdown()}</div>
            <MobileOnly>
              <div className={styles.mobileActions}>
                {renderDocumentsDropdown()}
                {renderDownloadButton()}
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
            <TabletPortrait>{renderCompareButton()}</TabletPortrait>
          </div>
          <Sticky activeClass="sticky -ndcs" top="#navBarMobile">
            <AnchorNav
              useRoutes
              links={anchorLinks}
              className={styles.anchorNav}
              theme={anchorNavRegularTheme}
              dataTours={{ summary: 'ndcs-country-04' }}
              dataTour="ndcs-country-05"
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
  handleDownloadAnalytics: PropTypes.func,
  location: PropTypes.object,
  notSummary: PropTypes.bool
};

export default NDCCountry;
