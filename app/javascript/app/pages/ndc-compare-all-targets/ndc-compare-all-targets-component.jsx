/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Header from 'components/header';
import Intro from 'components/intro';
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
import qs from 'query-string';
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

const getLinkToCustomCompare = selectedTargets => {
  let linkToCustomCompare = {};
  selectedTargets.forEach((t, i) => {
    const [country, document] = t.split('-');
    linkToCustomCompare = {
      ...linkToCustomCompare,
      [`country${i}`]: country,
      [`document${i}`]: document
    };
  });
  return qs.stringify(linkToCustomCompare);
};

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
    setColumnWidth
  } = props;
  const [selectedTargets, setSelectedTargets] = useState([]);
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
              description="It is important for countries’ various commitments, laws and policies align to achieve their climate objectives.
  Explore a summary of which countries have submitted each type of target and compare all of them side-by-side."
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
              <Button
                variant="primary"
                className={styles.compareButton}
                disabled={selectedTargets.length === 0}
                link={`/custom-compare/${getLinkToCustomCompare(
                  selectedTargets
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
            selectedTargets={selectedTargets}
            setSelectedTargets={setSelectedTargets}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

NDCCompareAllTargets.propTypes = {
  route: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  tableData: PropTypes.array,
  query: PropTypes.string,
  handleSearchChange: PropTypes.func.isRequired,
  noContentMsg: PropTypes.string,
  columns: PropTypes.array,
  setColumnWidth: PropTypes.func.isRequired,
  location: PropTypes.object
};

export default NDCCompareAllTargets;
