/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Header from 'components/header';
import Intro from 'components/intro';
import { Link } from 'react-router-dom';
import Icon from 'components/icon';
import cx from 'classnames';
import layout from 'styles/layout.scss';
import HandIconInfo from 'components/ndcs/shared/hand-icon-info';
import compareSubmittedIcon from 'assets/icons/compare-submitted.svg';
import compareNotSubmittedIcon from 'assets/icons/compare-not-submitted.svg';
import compareIntendsIcon from 'assets/icons/compare-intends.svg';
import Search from 'components/search';
import { Table } from 'cw-components';
import NoContent from 'components/no-content';
import Loading from 'components/loading';
import { NCS_COMPARE_ALL } from 'data/SEO';
import compareTableTheme from 'styles/themes/table/compare-table-theme.scss';
import { MetaDescription, SocialMetadata } from 'components/seo';
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
    tableData,
    query,
    handleSearchChange,
    noContentMsg,
    columns,
    setColumnWidth,
    route,
    location
  } = props;
  const [selectedTargets, setSelectedTargets] = useState([]);
  const canSelect = selectedTargets.length < 3;

  const addSelectedTarget = target => {
    if (selectedTargets.includes(target)) {
      setSelectedTargets(selectedTargets.filter(t => t !== target));
    } else if (canSelect) {
      setSelectedTargets([...selectedTargets, target]);
    }
  };

  const cellRenderer = cell => {
    const { cellData, dataKey, columnIndex, rowData } = cell;
    const id = `${rowData.Country.iso}-${dataKey}`;
    const isActive = selectedTargets.includes(id);
    const isLastColumn = columnIndex === columns.length - 1;
    if (dataKey === 'Country') {
      return <Link to={`/ndc/${cellData.iso}`}>{cellData.name}</Link>;
    }
    if (dataKey === 'Share of global GHG emissions') {
      return cellData;
    }
    if (cellData === 'yes') {
      return (
        <Button
          onClick={() => addSelectedTarget(id)}
          className={cx(
            styles.iconButton,
            { [styles.clickable]: isActive || canSelect },
            { [styles.lastColumn]: isLastColumn },
            { [styles.active]: isActive }
          )}
          disabled={!isActive && !canSelect}
        >
          <Icon icon={compareSubmittedIcon} className={styles.submitIcon} />
        </Button>
      );
    }
    return (
      <button
        className={cx(styles.iconButton, { [styles.lastColumn]: isLastColumn })}
      >
        <Icon icon={compareNotSubmittedIcon} className={styles.submitIcon} />
      </button>
    );
  };

  const renderTable = () => (
    <div>
      {loading && (
        <div className={styles.loaderWrapper}>
          <Loading light />
        </div>
      )}
      {!loading && tableData && tableData.length > 0 && (
        <div className={styles.tableWrapper}>
          <Table
            data={tableData}
            horizontalScroll
            parseHtml
            dynamicRowsHeight
            setColumnWidth={setColumnWidth}
            defaultColumns={columns}
            theme={compareTableTheme}
            customCellRenderer={cellRenderer}
          />
        </div>
      )}
      {!loading && (!tableData || tableData.length <= 0) && (
        <NoContent className={styles.noContent} message={noContentMsg} />
      )}
    </div>
  );
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
          {renderTable()}
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
