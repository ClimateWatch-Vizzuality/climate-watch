import React from 'react';
import PropTypes from 'prop-types';
import Search from 'components/search';
import { Table } from 'cw-components';
import NoContent from 'components/no-content';
import Loading from 'components/loading';
import exploreTableTheme from 'styles/themes/table/explore-table-theme.scss';
import exploreTableTwoHighlightedColumnsTheme from 'styles/themes/table/explore-table-two-highlighted-theme.scss';

import layout from 'styles/layout.scss';
import styles from 'components/ndcs/shared/explore-table-styles.scss';

const renderSearch = (searchHandler, query) => (
  <Search
    value={query}
    onChange={searchHandler}
    className={styles.searchBox}
    placeholder="Search table data"
  />
);

const NetZeroTable = ({
  loading,
  tableData,
  query,
  handleSearchChange,
  noContentMsg,
  columns,
  setColumnWidth,
  titleLinks,
  extraColumn
}) => (
  <div>
    <div className={styles.wrapper}>
      <div className={layout.content}>
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
              dynamicRowsConfig={{
                fontWidth: 10,
                fontSize: 14,
                extraMargin: 0,
                lineHeight: 1.25
              }}
              setColumnWidth={setColumnWidth}
              defaultColumns={columns}
              titleLinks={titleLinks}
              theme={
                extraColumn
                  ? exploreTableTwoHighlightedColumnsTheme
                  : exploreTableTheme
              }
              tableHeight={650}
            />
          </div>
        )}
        {!loading && (!tableData || tableData.length <= 0) && (
          <NoContent className={styles.noContent} message={noContentMsg} />
        )}
      </div>
    </div>
  </div>
);

NetZeroTable.propTypes = {
  loading: PropTypes.bool,
  noContentMsg: PropTypes.string,
  query: PropTypes.string,
  tableData: PropTypes.array,
  extraColumn: PropTypes.string,
  handleSearchChange: PropTypes.func.isRequired,
  setColumnWidth: PropTypes.func.isRequired,
  columns: PropTypes.array,
  titleLinks: PropTypes.array
};

export default NetZeroTable;
