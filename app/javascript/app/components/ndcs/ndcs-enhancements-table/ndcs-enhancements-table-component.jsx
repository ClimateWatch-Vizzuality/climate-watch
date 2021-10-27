import React from 'react';
import PropTypes from 'prop-types';
import Search from 'components/search';
import { Table } from 'cw-components';
import NoContent from 'components/no-content';
import Loading from 'components/loading';
import ReactTooltip from 'react-tooltip';
import styles from './ndcs-enhancements-table-styles.scss';
import customCellRenderer from './ndcs-enhancements-table-cell-renderer';
import EnhancementsLegend from './enhancements-legend';

const FEATURE_ENHANCEMENT_CHANGES =
  process.env.FEATURE_ENHANCEMENT_CHANGES === 'true';

const renderSearch = (searchHandler, query) => (
  <Search
    value={query}
    onChange={searchHandler}
    className={styles.searchBox}
    placeholder="Search for country or keyword"
  />
);
const setColumnWidth = FEATURE_ENHANCEMENT_CHANGES
  ? col => {
    const columnWidth = {
      country: 100,
      'NDC Status': 64,
      'Share of Global GHG Emissions': 120,
      'Overall comparison with previous NDC': 200,
      Statement: 150,
      Date: 76
    }[col];
    return columnWidth || 170;
  }
  : () => 180;

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
            sortBy="Date"
            sortASC={false}
          />
          <ReactTooltip id="submission-icon-info" html />
          {FEATURE_ENHANCEMENT_CHANGES && <EnhancementsLegend />}
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
