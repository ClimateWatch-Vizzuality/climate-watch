import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Table from 'components/table';
import NoContent from 'components/no-content';
import Search from 'components/search';
import Loading from 'components/loading';
import Dropdown from 'components/dropdown';
import darkSearch from 'styles/themes/search/search-dark.scss';
import layout from 'styles/layout.scss';
import EspModelsProvider from 'providers/esp-models-provider';
import EspScenariosProvider from 'providers/esp-scenarios-provider';
import EspIndicatorsProvider from 'providers/esp-indicators-provider';
import startCase from 'lodash/startCase';
import { FILTERS_BY_CATEGORY } from 'data/constants';
import styles from './emission-pathways-table-styles.scss';

class EmissionPathwaysTable extends PureComponent {
  renderTableContent() {
    const {
      loading,
      data,
      noContentMsg,
      defaultColumns,
      titleLinks
    } = this.props;
    if (loading) return <Loading light className={styles.loader} />;
    return data && data.length > 0 ? (
      <Table
        data={data}
        titleLinks={titleLinks}
        rowHeight={60}
        hasColumnSelect
        defaultColumns={defaultColumns}
      />
    ) : (
      <NoContent className={styles.noContent} message={noContentMsg} icon />
    );
  }

  renderFilters() {
    const {
      categoryName,
      handleFilterChange,
      selectedFields,
      filterOptions
    } = this.props;
    const category = categoryName.toLowerCase();
    return FILTERS_BY_CATEGORY[category].map(field => (
      <Dropdown
        key={field}
        label={startCase(field === 'model_abbreviation' ? 'model' : field)}
        placeholder={`Filter by ${startCase(field)}`}
        options={filterOptions ? filterOptions[field] : []}
        onValueChange={selected =>
          handleFilterChange(field, categoryName, selected && selected.value)}
        value={selectedFields ? selectedFields[field] : null}
      />
    ));
  }

  render() {
    const { query, handleSearchChange, categoryName } = this.props;
    return (
      <div className={layout.content}>
        <EspModelsProvider />
        <EspScenariosProvider />
        <EspIndicatorsProvider />
        <div className={styles.col4}>
          {this.renderFilters()}
          <Search
            input={query}
            theme={darkSearch}
            onChange={handleSearchChange}
            className={styles.searchBox}
            placeholder={`Search in ${categoryName}`}
            plain
          />
        </div>
        {this.renderTableContent()}
      </div>
    );
  }
}

EmissionPathwaysTable.propTypes = {
  loading: PropTypes.bool,
  noContentMsg: PropTypes.string,
  data: PropTypes.array,
  defaultColumns: PropTypes.array,
  categoryName: PropTypes.string.isRequired,
  titleLinks: PropTypes.array,
  query: PropTypes.string,
  handleSearchChange: PropTypes.func,
  handleFilterChange: PropTypes.func,
  selectedFields: PropTypes.object,
  filterOptions: PropTypes.object
};

export default EmissionPathwaysTable;
