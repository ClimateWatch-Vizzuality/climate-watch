import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/dropdown';
import Search from 'components/search';
import Table from 'components/table';
import NoContent from 'components/no-content';
import Loading from 'components/loading';
import { isPageContained } from 'utils/navigation';

import darkSearch from 'styles/themes/search/search-dark.scss';
import styles from './ndcs-table-styles.scss';

class NDCTable extends PureComponent {
  getTableContent() {
    const { loading, data, noContentMsg } = this.props;

    if (loading) return <Loading light className={styles.loader} />;
    if (data && data.length > 0) {
      return (
        <Table
          parseHtml
          urlInData
          data={data}
          rowHeight={60}
          openLinksInNewTab={isPageContained}
        />
      );
    }
    return <NoContent className={styles.noContent} message={noContentMsg} />;
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
        <div className={styles.filtersLayout}>
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
  handleSearchChange: PropTypes.func.isRequired
};

export default NDCTable;
