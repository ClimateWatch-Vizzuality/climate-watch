import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Table from 'components/table';
import Dropdown from 'components/dropdown';
import NoContent from 'components/no-content';
import Search from 'components/search';
import Loading from 'components/loading';
import layout from 'styles/layout.scss';
import cx from 'classnames';
import EspIndicatorsTrendDataProvider from 'providers/esp-indicators-trend-provider';
import EspLocationsProvider from 'providers/esp-locations-provider';
import styles from './emission-pathways-scenario-table-styles.scss';

class EmissionPathwaysScenarioTableComponent extends PureComponent {
  renderTable() {
    const {
      data,
      noContentMsg,
      defaultColumns,
      ellipsisColumns,
      titleLinks,
      error
    } = this.props;
    if (error) {
      return (
        <NoContent
          message={'Something went wrong'}
          className={styles.noContent}
        />
      );
    }
    return data && data.length > 0 ? (
      <Table
        data={data}
        rowHeight={60}
        hasColumnSelect
        ellipsisColumns={ellipsisColumns}
        defaultColumns={defaultColumns}
        trendLine={'trend'}
        titleLinks={titleLinks}
        emptyValueLabel={'Not specified'}
        horizontalScroll
      />
    ) : (
      <NoContent message={noContentMsg} className={styles.noContent} />
    );
  }

  render() {
    const {
      loading,
      query,
      handleSearchChange,
      categories,
      handleCategoryChange,
      selectedCategory,
      locations,
      handleLocationChange,
      selectedLocation,
      id
    } = this.props;
    return (
      <div className={layout.content}>
        <EspLocationsProvider scenarioId={id} />
        {selectedLocation && (
          <EspIndicatorsTrendDataProvider
            scenarioId={id}
            locationId={selectedLocation.value}
          />
        )}
        <div className="grid-column-item">
          <div className={cx(styles.tableMenu)}>
            <li>{'Indicators'}</li>
          </div>
        </div>
        <div className="grid-column-item">
          <div className={styles.col4}>
            <Dropdown
              label="Country/Region"
              placeholder="Select a Country/Region"
              options={locations}
              onValueChange={handleLocationChange}
              value={selectedLocation}
            />
            <Dropdown
              label="Category"
              placeholder="Select a category"
              options={categories}
              onValueChange={handleCategoryChange}
              value={selectedCategory}
            />
            <Search
              value={query}
              onChange={handleSearchChange}
              placeholder={'Search by all fields'}
            />
          </div>
        </div>
        {loading ? (
          <Loading light className={styles.loader} />
        ) : (
          this.renderTable()
        )}
      </div>
    );
  }
}

EmissionPathwaysScenarioTableComponent.propTypes = {
  loading: PropTypes.bool,
  noContentMsg: PropTypes.string,
  id: PropTypes.string,
  data: PropTypes.array,
  defaultColumns: PropTypes.array,
  ellipsisColumns: PropTypes.array,
  query: PropTypes.string,
  handleSearchChange: PropTypes.func,
  categories: PropTypes.array,
  locations: PropTypes.array,
  titleLinks: PropTypes.array,
  selectedCategory: PropTypes.object,
  selectedLocation: PropTypes.object,
  handleCategoryChange: PropTypes.func,
  handleLocationChange: PropTypes.func,
  error: PropTypes.bool.isRequired
};

export default EmissionPathwaysScenarioTableComponent;
