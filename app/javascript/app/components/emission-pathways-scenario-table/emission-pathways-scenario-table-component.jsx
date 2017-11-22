import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Table from 'components/table';
import Dropdown from 'components/dropdown';
import NoContent from 'components/no-content';
import Search from 'components/search';
import darkSearch from 'styles/themes/search/search-dark.scss';
import Loading from 'components/loading';
import layout from 'styles/layout.scss';
import cx from 'classnames';
import styles from './emission-pathways-scenario-table-styles.scss';

class EmissionPathwaysScenarioTableComponent extends PureComponent {
  getTableContent() {
    const {
      loading,
      data,
      noContentMsg,
      defaultColumns,
      query,
      handleSearchChange,
      categories,
      handleCategoryChange,
      selectedCategory
    } = this.props;
    if (loading) return <Loading light className={styles.loader} />;
    return (
      <div>
        <div className={cx(styles.tableMenu)}>
          <li className={cx(styles.singleTitle, styles.active)}>
            {'Indicators'}
          </li>
        </div>
        <div className={styles.col4}>
          {categories && (
            <Dropdown
              label="Category"
              options={categories}
              onValueChange={handleCategoryChange}
              value={selectedCategory}
              hideResetButton
              plain
            />
          )}
          <Search
            input={query}
            theme={darkSearch}
            onChange={handleSearchChange}
            className={styles.searchBox}
            placeholder={'Search by all fields'}
            plain
          />
        </div>
        {data && data.length > 0 ? (
          <Table
            data={data}
            rowHeight={60}
            sortBy={'name'}
            hasColumnSelect
            defaultColumns={defaultColumns}
          />
        ) : (
          <NoContent message={noContentMsg} className={styles.noContent} />
        )}
      </div>
    );
  }

  render() {
    return <div className={layout.content}>{this.getTableContent()}</div>;
  }
}

EmissionPathwaysScenarioTableComponent.propTypes = {
  loading: PropTypes.bool,
  noContentMsg: PropTypes.string,
  data: PropTypes.array,
  defaultColumns: PropTypes.array,
  query: PropTypes.string,
  handleSearchChange: PropTypes.func,
  categories: PropTypes.array,
  selectedCategory: PropTypes.object,
  handleCategoryChange: PropTypes.func
};

export default EmissionPathwaysScenarioTableComponent;
