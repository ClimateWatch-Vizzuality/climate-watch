import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Table from 'components/table';
import NoContent from 'components/no-content';
import Search from 'components/search';
import darkSearch from 'styles/themes/search/search-dark.scss';
import Loading from 'components/loading';
import layout from 'styles/layout.scss';
import styles from './emission-pathways-scenario-table-styles.scss';

class EmissionPathwaysScenarioTableComponent extends PureComponent {
  getTableContent() {
    const {
      loading,
      data,
      noContentMsg,
      defaultColumns,
      query,
      handleSearchChange
    } = this.props;
    if (loading) return <Loading light className={styles.loader} />;
    return (
      <div>
        <div className={styles.col4}>
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
          <NoContent message={noContentMsg} />
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
  handleSearchChange: PropTypes.func
};

export default EmissionPathwaysScenarioTableComponent;
