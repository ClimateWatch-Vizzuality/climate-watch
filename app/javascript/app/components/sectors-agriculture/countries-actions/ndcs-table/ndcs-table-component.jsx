import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/dropdown';
import Search from 'components/search';
import Table from 'components/table';
import NoContent from 'components/no-content';
import Loading from 'components/loading';

import darkSearch from 'styles/themes/search/search-dark.scss';
import styles from './ndcs-table-styles.scss';

class NDCTable extends PureComponent {
  getTableContent() {
    const { loading, data, noContentMsg, titleLinks } = this.props;

    if (loading) return <Loading light className={styles.loader} />;
    if (data && data.length > 0) {
      return (
        <Table parseHtml titleLinks={titleLinks} data={data} rowHeight={60} />
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
      handleSearchChange
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
  data: PropTypes.array,
  handleCategoryChange: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  titleLinks: PropTypes.array
};

export default NDCTable;
