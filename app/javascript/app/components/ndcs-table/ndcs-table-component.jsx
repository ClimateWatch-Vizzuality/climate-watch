import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/dropdown';
import Search from 'components/search';
import Table from 'components/table';
import NoContent from 'components/no-content';

import darkSearch from 'styles/themes/search-dark.scss';
import styles from './ndcs-table-styles.scss';

class NDCTable extends PureComponent {
  getTableContent() {
    const { loading, data, query } = this.props;

    if (loading) return null;
    const noContentMsg = query
      ? 'No results found'
      : 'There is no data for that indicator';
    return data.length > 0 ? (
      <Table data={data} />
    ) : (
      <NoContent message={noContentMsg} />
    );
  }

  render() {
    const {
      query,
      categories,
      handleCategoryChange,
      selectedCategory,
      indicators,
      handleIndicatorChange,
      handleSearchChange,
      selectedIndicator
    } = this.props;
    return (
      <div>
        <div className={styles.col4}>
          <Dropdown
            label="Category"
            options={categories}
            onChange={handleCategoryChange}
            value={selectedCategory.value}
            clearable={false}
          />
          <Dropdown
            label="Indicator"
            options={indicators}
            onChange={handleIndicatorChange}
            value={selectedIndicator.value}
            clearable={false}
          />
          <Search
            input={query}
            theme={darkSearch}
            onChange={handleSearchChange}
            className={styles.searchBox}
            placeholder="Filter table data"
          />
        </div>
        {this.getTableContent()}
      </div>
    );
  }
}

NDCTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  query: PropTypes.string,
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.object,
  indicators: PropTypes.array.isRequired,
  selectedIndicator: PropTypes.object,
  data: PropTypes.array.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  handleIndicatorChange: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired
};

export default NDCTable;
