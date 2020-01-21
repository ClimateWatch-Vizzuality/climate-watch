import React from 'react';
import PropTypes from 'prop-types';
import Search from 'components/search';
import { Table } from 'cw-components';
import NoContent from 'components/no-content';
import Loading from 'components/loading';
import styles from './ndcs-enhancements-table-styles.scss';

const renderSearch = (searchHandler, query) => (
  <Search
    value={query}
    onChange={searchHandler}
    className={styles.searchBox}
    placeholder="Search table data"
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
        <div className={styles.tableWrapper}>
          <Table
            data={tableData}
            horizontalScroll
            parseHtml
            dynamicRowsHeight
            setColumnWidth={() => 180}
            defaultColumns={columns}
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
