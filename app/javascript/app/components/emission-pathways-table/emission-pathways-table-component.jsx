import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/dropdown';
import Search from 'components/search';
import Table from 'components/table';
import NoContent from 'components/no-content';
import darkSearch from 'styles/themes/search/search-dark.scss';
import layout from 'styles/layout.scss';
import styles from './emission-pathways-table-styles.scss';

class EmissionPathwaysTable extends PureComponent {
  getTableContent() {
    const { loading, data, noContentMsg } = this.props;
    if (loading) return null;
    return data && data.length > 0 ? (
      <Table parseHtml data={data} rowHeight={60} />
    ) : (
      <NoContent message={noContentMsg} />
    );
  }

  render() {
    const {
      query,
      categories,
      handleLicenseChange,
      handleTimeIntervalChange,
      indicators,
      handleHorizonChange,
      handleSearchChange,
      selectedLicense,
      selectedTimeInterval,
      selectedHorizon
    } = this.props;
    return (
      <div className={layout.content}>
        <div className={styles.col4}>
          <Dropdown
            label="License"
            options={categories}
            onValueChange={handleLicenseChange}
            value={selectedLicense}
            hideResetButton
            plain
          />
          <Dropdown
            label="TimeInterval"
            options={indicators}
            onValueChange={handleTimeIntervalChange}
            value={selectedTimeInterval}
            hideResetButton
            plain
          />
          <Dropdown
            label="Horizon"
            options={indicators}
            onValueChange={handleHorizonChange}
            value={selectedHorizon}
            hideResetButton
            plain
          />
          <Search
            input={query}
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

EmissionPathwaysTable.propTypes = {
  loading: PropTypes.bool,
  noContentMsg: PropTypes.string,
  query: PropTypes.string,
  categories: PropTypes.array,
  indicators: PropTypes.array,
  selectedLicense: PropTypes.object,
  selectedTimeInterval: PropTypes.object,
  selectedHorizon: PropTypes.object,
  data: PropTypes.array,
  handleLicenseChange: PropTypes.func,
  handleHorizonChange: PropTypes.func,
  handleTimeIntervalChange: PropTypes.func,
  handleSearchChange: PropTypes.func
};

export default EmissionPathwaysTable;
