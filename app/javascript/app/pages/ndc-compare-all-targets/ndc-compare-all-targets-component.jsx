/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Header from 'components/header';
import Intro from 'components/intro';
import ButtonGroup from 'components/button-group';
import Icon from 'components/icon';
import cx from 'classnames';
import layout from 'styles/layout.scss';
import HandIconInfo from 'components/ndcs/shared/hand-icon-info';
import compareSubmittedIcon from 'assets/icons/compare-submitted.svg';
import compareNotSubmittedIcon from 'assets/icons/compare-not-submitted.svg';
import compareIntendsIcon from 'assets/icons/compare-intends.svg';
import Search from 'components/search';
import { NCS_COMPARE_ALL } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';
import NdcCompareAllTargetsProvider from 'providers/ndc-compare-all-targets-provider';
import CountriesDocumentsProvider from 'providers/countries-documents-provider';
import ModalMetadata from 'components/modal-metadata';

import CompareAllTable from './ndc-compare-all-targets-table/ndc-compare-all-targets-table';
import styles from './ndc-compare-all-targets-styles.scss';

const renderLegend = () => (
  <div className={styles.legend}>
    <span className={styles.legendItem}>
      <Icon icon={compareSubmittedIcon} className={styles.submitIcon} />
      Submitted
    </span>
    <span className={styles.legendItem}>
      <Icon icon={compareNotSubmittedIcon} className={styles.submitIcon} />
      Not submitted
    </span>
    <span className={styles.legendItem}>
      <Icon icon={compareIntendsIcon} className={styles.submitIcon} />
      Intends to submit
    </span>
  </div>
);

const renderSearch = (searchHandler, query) => (
  <Search
    value={query}
    onChange={searchHandler}
    className={styles.searchBox}
    placeholder="Search table data"
  />
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
    setColumnWidth,
    handleTargetsChange,
    selectedTargets,
    selectedTableTargets,
    handleInfoClick
  } = props;
  return (
    <React.Fragment>
      <MetaDescription
        descriptionContext={NCS_COMPARE_ALL}
        subtitle="NDCS CONTENT"
      />
      <SocialMetadata
        descriptionContext={NCS_COMPARE_ALL}
        href={location.href}
      />
      <Header route={route}>
        <div className={cx(layout.content, styles.header)}>
          <div className={styles.title}>
            <Intro
              title="Compare all targets"
              description={`It is important for countries’ various commitments, laws and policies align to achieve their climate objectives. Explore a summary of which countries have each type of documents and compare all of them side-by-side. You can also <a href='https://climate-laws.org/' class=${styles.link}> explore climate laws and policies of the world published by Grantham Research Institute</a>.`}
            />
          </div>
        </div>
      </Header>
      <div className={cx(layout.content, styles.wrapper)}>
        <HandIconInfo
          className={styles.handIconInfo}
          text="Click on up to 3 of the submitted boxes and click on the compare button."
        />
        <div>
          <div className={styles.legendAndActions}>
            {renderLegend()}
            <div className={styles.buttonAndSearch}>
              <ButtonGroup
                className={styles.colEnd}
                buttonsConfig={[
                  {
                    type: 'info',
                    onClick: handleInfoClick
                  }
                ]}
              />
              <Button
                variant="secondary"
                className={styles.actionButton}
                disabled={selectedTargets.length === 0}
                onClick={() => handleTargetsChange(null)}
              >
                Clear
              </Button>
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
            noContentMsg={noContentMsg}
            columns={columns}
            setColumnWidth={setColumnWidth}
            selectedTargets={selectedTableTargets}
            setSelectedTargets={handleTargetsChange}
          />
        </div>
      </div>
      <NdcCompareAllTargetsProvider />
      <CountriesDocumentsProvider />
      <ModalMetadata />
    </React.Fragment>
  );
};

NDCCompareAllTargets.propTypes = {
  route: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  tableData: PropTypes.array,
  query: PropTypes.string,
  handleSearchChange: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  handleTargetsChange: PropTypes.func.isRequired,
  noContentMsg: PropTypes.string,
  columns: PropTypes.array,
  setColumnWidth: PropTypes.func.isRequired,
  location: PropTypes.object,
  selectedTargets: PropTypes.array,
  selectedTableTargets: PropTypes.array
};

export default NDCCompareAllTargets;
