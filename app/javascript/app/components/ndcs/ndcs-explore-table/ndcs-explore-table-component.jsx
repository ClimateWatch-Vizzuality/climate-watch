import React from 'react';
import PropTypes from 'prop-types';
import Search from 'components/search';
import { Table } from 'cw-components';
import NoContent from 'components/no-content';
import Loading from 'components/loading';
import exploreTableTheme from 'styles/themes/table/explore-table-theme.scss';

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

const NDCSExploreTable = ({
  loading,
  tableData,
  query,
  handleSearchChange,
  noContentMsg,
  columns,
  setColumnWidth,
  titleLinks
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
              setColumnWidth={setColumnWidth}
              defaultColumns={columns}
              theme={exploreTableTheme}
              titleLinks={titleLinks}
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

NDCSExploreTable.propTypes = {
  loading: PropTypes.bool,
  noContentMsg: PropTypes.string,
  query: PropTypes.string,
  tableData: PropTypes.array,
  handleSearchChange: PropTypes.func.isRequired,
  setColumnWidth: PropTypes.func.isRequired,
  columns: PropTypes.array,
  titleLinks: PropTypes.array
};

export default NDCSExploreTable;
