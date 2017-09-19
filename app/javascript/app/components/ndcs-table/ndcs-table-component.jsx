import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/dropdown';
import Table from 'components/table';

import styles from './ndcs-table-styles.scss';

class NDCTable extends PureComponent {
  render() {
    const {
      data,
      categories,
      handleCategoryChange,
      selectedCategory,
      indicators,
      handleIndicatorChange,
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
        </div>
        <Table data={data} />
      </div>
    );
  }
}

NDCTable.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.object,
  indicators: PropTypes.array.isRequired,
  selectedIndicator: PropTypes.object,
  data: PropTypes.array.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  handleIndicatorChange: PropTypes.func.isRequired
};

export default NDCTable;
