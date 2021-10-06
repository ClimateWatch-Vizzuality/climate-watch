import React from 'react';
import PropTypes from 'prop-types';
import Search from 'components/search';
import { Table } from 'cw-components';
import NoContent from 'components/no-content';
import Loading from 'components/loading';
import styles from './ndcs-enhancements-table-styles.scss';
import customCellRenderer from './ndcs-enhancements-table-cell-renderer';

const renderSearch = (searchHandler, query) => (
  <Search
    value={query}
    onChange={searchHandler}
    className={styles.searchBox}
    placeholder="Search for country or keyword"
  />
);

const NDCSEnhancementsTable = ({
  loading,
  tableData,
  query,
  handleSearchChange,
  noContentMsg,
  columns
}) => (
  <div>
    <div className={styles.wrapper}>
      {loading && <Loading light className={styles.loader} />}
      {!loading && (
        <div className={styles.filtersLayout}>
          {renderSearch(handleSearchChange, query)}
        </div>
      )}
      {!loading && tableData && tableData.length > 0 && (
        <div
          className={styles.tableWrapper}
          data-tour="ndc-enhancement-tracker-03"
        >
          <Table
            data={tableData}
            horizontalScroll
            parseHtml
            dynamicRowsHeight
            // eslint-disable-next-line no-confusing-arrow
            setColumnWidth={col => (col === 'NDC Status' ? 80 : 180)}
            customCellRenderer={customCellRenderer}
            defaultColumns={columns}
            sortBy="Date"
            sortASC={false}
          />
        </div>
      )}
      {!loading && (!tableData || tableData.length <= 0) && (
        <NoContent className={styles.noContent} message={noContentMsg} />
      )}
    </div>
  </div>
);

NDCSEnhancementsTable.propTypes = {
  loading: PropTypes.bool,
  noContentMsg: PropTypes.string,
  query: PropTypes.string,
  tableData: PropTypes.array,
  columns: PropTypes.array,
  handleSearchChange: PropTypes.func.isRequired
};

export default NDCSEnhancementsTable;
