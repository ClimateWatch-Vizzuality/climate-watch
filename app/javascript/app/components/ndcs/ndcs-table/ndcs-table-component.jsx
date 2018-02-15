import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/dropdown';
import Search from 'components/search';
import Table from 'components/table';
import NoContent from 'components/no-content';

import darkSearch from 'styles/themes/search/search-dark.scss';
import styles from './ndcs-table-styles.scss';

class NDCTable extends PureComponent {
  getTableContent() {
    const { loading, data, noContentMsg, titleLinks } = this.props;

    if (loading) return null;

    return data && data.length > 0 ? (
      <Table parseHtml titleLinks={titleLinks} data={data} rowHeight={60} />
    ) : (
      <NoContent className={styles.noContent} message={noContentMsg} />
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
            onValueChange={handleCategoryChange}
            value={selectedCategory}
            hideResetButton
            plain
          />
          <Dropdown
            label="Indicator"
            options={indicators}
            onValueChange={handleIndicatorChange}
            value={selectedIndicator}
            hideResetButton
            plain
          />
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

NDCTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  noContentMsg: PropTypes.string,
  query: PropTypes.string,
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.object,
  indicators: PropTypes.array.isRequired,
  selectedIndicator: PropTypes.object,
  data: PropTypes.array,
  handleCategoryChange: PropTypes.func.isRequired,
  handleIndicatorChange: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  titleLinks: PropTypes.array
};

export default NDCTable;
