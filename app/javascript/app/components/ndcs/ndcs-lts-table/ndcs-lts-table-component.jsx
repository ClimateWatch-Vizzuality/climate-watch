import React from 'react';
import PropTypes from 'prop-types';
import Search from 'components/search';
import { Table } from 'cw-components';
import NoContent from 'components/no-content';
import Loading from 'components/loading';
import darkSearch from 'styles/themes/search/search-dark.scss';
import styles from './ndcs-lts-table-styles.scss';

const renderSearch = (searchHandler, query) => (
  <Search
    value={query}
    theme={darkSearch}
    onChange={searchHandler}
    className={styles.searchBox}
    placeholder="Search table data"
    plain
  />
);

const NDCSLTSTable = ({
  loading,
  tableData,
  query,
  handleSearchChange,
  noContentMsg
}) => (
  <div>
    <div className={styles.wrapper}>
      {loading && <Loading light className={styles.loader} />}
      {!loading && (
        <div className={styles.filtersLayout}>
          {renderSearch(handleSearchChange, query)}
        </div>
      )}
      {!loading &&
      tableData &&
      tableData.length > 0 && (
      <div className={styles.tableWrapper}>
            <Table
          data={tableData}
          horizontalScroll
          parseHtml
          dynamicRowsHeight
          setColumnWidth={column => ((column == "country" || column == "Share of GHG Emissions") ? 180 : (1170 - ((5+2) * 10) - 360) / 3)}
          defaultColumns={[
                'country',
                'Share of GHG Emissions',
                'Quantified 2050 Emissions Goal',
                'Document',
                'Submission Date'
              ]}
        />
          </div>
        )}
      {!loading &&
      (!tableData || tableData.length <= 0) && (
      <NoContent className={styles.noContent} message={noContentMsg} />
        )}
    </div>
  </div>
);

NDCSLTSTable.propTypes = {
  loading: PropTypes.bool,
  noContentMsg: PropTypes.string,
  query: PropTypes.string,
  tableData: PropTypes.array,
  handleSearchChange: PropTypes.func.isRequired
};

export default NDCSLTSTable;
