/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Header from 'components/header';
import Intro from 'components/intro';
import ButtonGroup from 'components/button-group';
import PreviousSubmissionIcon from 'components/previous-submission-icon';
import cx from 'classnames';
import layout from 'styles/layout.scss';
import HandIconInfo from 'components/ndcs/shared/hand-icon-info';
import Search from 'components/search';
import { SEO_PAGES } from 'data/seo';
import SEOTags from 'components/seo-tags';
import NdcCompareAllTargetsProvider from 'providers/ndc-compare-all-targets-provider';
import CountriesDocumentsProvider from 'providers/countries-documents-provider';
import ModalMetadata from 'components/modal-metadata';
import { SUBMISSION_ICON_VALUE } from 'data/country-documents';

import CompareAllTable from './ndc-compare-all-targets-table/ndc-compare-all-targets-table';
import styles from './ndc-compare-all-targets-styles.scss';

const renderLegend = () => (
  <div className={styles.legend} data-tour="compare-all-01">
    <span className={styles.legendItem}>
      <PreviousSubmissionIcon
        submissionIconValue={SUBMISSION_ICON_VALUE.yes}
        className={styles.submitIcon}
      />
      Submitted
    </span>
    <span className={styles.legendItem}>
      <PreviousSubmissionIcon
        submissionIconValue={SUBMISSION_ICON_VALUE.no}
        className={styles.submitIcon}
      />
      Not submitted
    </span>
    <span className={styles.legendItem}>
      <PreviousSubmissionIcon
        submissionIconValue={SUBMISSION_ICON_VALUE.intends}
        className={styles.submitIcon}
      />
      Intends to submit
    </span>
  </div>
);

const renderSearch = (searchHandler, query) => (
  <div data-tour="compare-all-06">
    <Search
      value={query}
      onChange={searchHandler}
      className={styles.searchBox}
      placeholder="Search table data"
    />
  </div>
);

const NDCCompareAllTargets = props => {
  const {
    loading,
    query,
    handleSearchChange,
    route,
    location,
    tableData,
    noContentMsg,
    columns,
    handleTargetsChange,
    selectedTargets,
    selectedTableTargets,
    handleInfoClick,
    titleLinks,
    countryIsos
  } = props;
  return (
    <div>
      <SEOTags page={SEO_PAGES.ndcCompareAll} href={location.href} />
      <Header route={route}>
        <div className={cx(layout.content, styles.header)}>
          <div className={styles.title}>
            <Intro
              title="Compare all targets"
              description={`It is important for countries’ various commitments, laws and policies align to achieve their climate objectives. Explore a summary of which countries have each type of document and compare all of them side-by-side. You can also <a href='https://climate-laws.org/' class=${styles.link}> explore countries’ climate laws and policies published by Grantham Research Institute</a>.`}
            />
          </div>
        </div>
      </Header>
      <div className={cx(layout.content, styles.wrapper)}>
        <HandIconInfo className={styles.handIconInfo}>
          Click on up to 3 of the submitted boxes and click on the compare
          button.
        </HandIconInfo>
        <div>
          <div className={styles.legendAndActions}>
            {renderLegend()}
            <div className={styles.buttonAndSearch}>
              <ButtonGroup
                className={styles.colEnd}
                buttonsConfig={[
                  {
                    type: 'info',
                    onClick: handleInfoClick,
                    dataTour: 'compare-all-07'
                  }
                ]}
              />
              <div data-tour="compare-all-05">
                <Button
                  variant="secondary"
                  className={styles.actionButton}
                  disabled={selectedTargets.length === 0}
                  onClick={() => handleTargetsChange(null)}
                >
                  Clear
                </Button>
              </div>
              <div data-tour="compare-all-04">
                <Button
                  variant="primary"
                  className={styles.actionButton}
                  disabled={selectedTargets.length === 0}
                  link={`/custom-compare/overview?targets=${selectedTargets.join(
                    ','
                  )}`}
                >
                  {`Compare${
                    selectedTargets.length === 0
                      ? ''
                      : ` (${selectedTargets.length})`
                  }`}
                </Button>
              </div>
              {!loading && (
                <div className={styles.filtersLayout}>
                  {renderSearch(handleSearchChange, query)}
                </div>
              )}
            </div>
          </div>
          <CompareAllTable
            loading={loading}
            tableData={tableData}
            titleLinks={titleLinks}
            countryIsos={countryIsos}
            noContentMsg={noContentMsg}
            columns={columns}
            selectedTargets={selectedTableTargets}
            setSelectedTargets={handleTargetsChange}
          />
        </div>
      </div>
      <NdcCompareAllTargetsProvider />
      <CountriesDocumentsProvider />
      <ModalMetadata />
    </div>
  );
};

NDCCompareAllTargets.propTypes = {
  route: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  tableData: PropTypes.array,
  titleLinks: PropTypes.array,
  countryIsos: PropTypes.object,
  query: PropTypes.string,
  handleSearchChange: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  handleTargetsChange: PropTypes.func.isRequired,
  noContentMsg: PropTypes.string,
  columns: PropTypes.array,
  location: PropTypes.object,
  selectedTargets: PropTypes.array,
  selectedTableTargets: PropTypes.array
};

export default NDCCompareAllTargets;
