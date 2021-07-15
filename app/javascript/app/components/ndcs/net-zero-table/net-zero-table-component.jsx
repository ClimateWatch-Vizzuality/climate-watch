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

const NetZeroTable = ({
  loading,
  tableData,
  query,
  handleSearchChange,
  noContentMsg,
  columns,
  titleLinks
}) => (
  <div>
    <div className={styles.wrapper}>
      <div className={layout.content} data-tour="net-zero-04">
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
              setColumnWidth={() => 220}
              defaultColumns={columns}
              titleLinks={titleLinks}
              theme={exploreTableTheme}
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
  handleSearchChange: PropTypes.func.isRequired,
  columns: PropTypes.array,
  titleLinks: PropTypes.array
};

export default NetZeroTable;
