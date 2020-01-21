import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/dropdown';
import Search from 'components/search';
import Table from 'components/table';
import NoContent from 'components/no-content';
import Loading from 'components/loading';
import { TabletPortrait } from 'components/responsive';

import styles from './ndcs-table-styles.scss';

class NDCTable extends PureComponent {
  getTableContent(isMobile) {
    const { loading, data, noContentMsg } = this.props;

    if (loading) return <Loading light className={styles.loader} />;
    if (data && data.length > 0) {
      return (
        <Table
          parseHtml
          urlInData
          data={data}
          rowHeight={60}
          forcedColumnWidth={!isMobile && 150}
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
          <div className={styles.emptyCell} />
          <Search
            value={query}
            onChange={handleSearchChange}
            className={styles.searchBox}
            placeholder="Search table data"
            variant="transparent"
          />
        </div>
        <TabletPortrait>
          {isMobile => this.getTableContent(isMobile)}
        </TabletPortrait>
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
  handleSearchChange: PropTypes.func.isRequired
};

export default NDCTable;
