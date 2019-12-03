import React from 'react';
import PropTypes from 'prop-types';
import Search from 'components/search';
import { Table } from 'cw-components';
import NoContent from 'components/no-content';
import Loading from 'components/loading';
import darkSearch from 'styles/themes/search/search-dark.scss';
import exploreTableTheme from 'styles/themes/table/explore-table-theme.scss';

import styles from './lts-explore-table-styles.scss';

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

const LTSExploreTable = ({
  loading,
  tableData,
  query,
  handleSearchChange,
  noContentMsg,
  columns,
  setColumnWidth
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
            setColumnWidth={setColumnWidth}
            defaultColumns={columns}
            theme={exploreTableTheme}
          />
        </div>
      )}
      {!loading && (!tableData || tableData.length <= 0) && (
        <NoContent className={styles.noContent} message={noContentMsg} />
      )}
    </div>
  </div>
);

LTSExploreTable.propTypes = {
  loading: PropTypes.bool,
  noContentMsg: PropTypes.string,
  query: PropTypes.string,
  tableData: PropTypes.array,
  handleSearchChange: PropTypes.func.isRequired,
  setColumnWidth: PropTypes.func.isRequired,
  columns: PropTypes.array
};

export default LTSExploreTable;
