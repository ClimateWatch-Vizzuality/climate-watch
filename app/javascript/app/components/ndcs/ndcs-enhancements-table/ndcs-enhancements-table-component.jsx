import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/dropdown';
import Search from 'components/search';
import Table from 'components/table';
import NoContent from 'components/no-content';
import Loading from 'components/loading';

import darkSearch from 'styles/themes/search/search-dark.scss';
import styles from './ndcs-enhancements-table-styles.scss';

class NDCSEnhancementsTable extends PureComponent {
  getTableContent() {
    const { loading, data, noContentMsg } = this.props;

    if (loading) return <Loading light className={styles.loader} />;
    if (data && data.length > 0) {
      return <Table horizontalScroll parseHtml urlInData data={data} flexGrow={0} />;
    }
    return <NoContent className={styles.noContent} message={noContentMsg} />;
  }

  render() {
    const {
      query,
      categories,
      selectedCategory,
      indicators,
      handleSearchChange,
      selectedIndicator
    } = this.props;
    return (
      <div>
        <div className={styles.filtersLayout}>
          <Search
            value={query}
            theme={darkSearch}
            onChange={handleSearchChange}
            className={styles.searchBox}
            placeholder="Search table data"
            plain
          />
        </div>
        {this.getTableContent()}
      </div>
    );
  }
}

NDCSEnhancementsTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  noContentMsg: PropTypes.string,
  query: PropTypes.string,
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.object,
  indicators: PropTypes.array.isRequired,
  selectedIndicator: PropTypes.object,
  data: PropTypes.array,
  handleSearchChange: PropTypes.func.isRequired
};

export default NDCSEnhancementsTable;
