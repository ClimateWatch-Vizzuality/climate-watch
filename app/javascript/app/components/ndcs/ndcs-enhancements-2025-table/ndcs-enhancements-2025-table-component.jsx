import React from 'react';
import PropTypes from 'prop-types';
import Search from 'components/search';
import { Table } from 'cw-components';
import NoContent from 'components/no-content';
import Loading from 'components/loading';
import ReactTooltip from 'react-tooltip';
import styles from './ndcs-enhancements-2025-table-styles.scss';
import customCellRenderer from './ndcs-enhancements-2025-table-cell-renderer';
import Enhancements2025Legend from './enhancements-2025-legend';

const renderSearch = (searchHandler, query) => (
  <Search
    value={query}
    onChange={searchHandler}
    className={styles.searchBox}
    placeholder="Search for country or keyword"
  />
);
const setColumnWidth = col => {
  const columnWidth = {
    country: 120,
    'NDC Status': 75,
    'Share of Global GHG Emissions': 120,
    'Overall comparison with previous NDC': 280,
    'Source Link': 150,
    '2025 Statement': 260,
    Date: 75
  }[col];
  return columnWidth || 170;
};

const NDCSEnhancements2025Table = ({
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
          onScroll={() => ReactTooltip.rebuild()}
        >
          <Table
            data={tableData}
            horizontalScroll
            parseHtml
            dynamicRowsHeight
            setColumnWidth={setColumnWidth}
            customCellRenderer={customCellRenderer}
            defaultColumns={columns}
            sortBy="Share of Global GHG Emissions"
            sortASC={false}
            dynamicRowsConfig={{
              fontWidth: 8,
              // px
              fontSize: 10,
              // px
              extraMargin: 30,
              // px
              lineHeight: 1
            }}
          />
          <ReactTooltip id="submission-icon-info" html />
          <Enhancements2025Legend />
        </div>
      )}
      {!loading && (!tableData || tableData.length <= 0) && (
        <NoContent className={styles.noContent} message={noContentMsg} />
      )}
    </div>
  </div>
);

NDCSEnhancements2025Table.propTypes = {
  loading: PropTypes.bool,
  noContentMsg: PropTypes.string,
  query: PropTypes.string,
  tableData: PropTypes.array,
  columns: PropTypes.array,
  handleSearchChange: PropTypes.func.isRequired
};

export default NDCSEnhancements2025Table;
