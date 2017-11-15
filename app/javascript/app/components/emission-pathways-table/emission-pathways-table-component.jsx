import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Table from 'components/table';
import NoContent from 'components/no-content';
import Search from 'components/search';
import Loading from 'components/loading';
import darkSearch from 'styles/themes/search/search-dark.scss';
import layout from 'styles/layout.scss';
import EspModelsProvider from 'providers/esp-models-provider';
import EspScenariosProvider from 'providers/esp-scenarios-provider';
import EspIndicatorsProvider from 'providers/esp-indicators-provider';
import styles from './emission-pathways-table-styles.scss';

class EmissionPathwaysTable extends PureComponent {
  getTableContent() {
    const { loading, data, noContentMsg, sortBy, titleLinks } = this.props;
    if (loading) return <Loading light className={styles.loader} />;
    return data && data.length > 0 ? (
      <Table
        titleLinks={titleLinks}
        data={data}
        rowHeight={60}
        sortBy={sortBy}
      />
    ) : (
      <NoContent message={noContentMsg} />
    );
  }

  render() {
    const { query, handleSearchChange, categoryName } = this.props;
    return (
      <div className={layout.content}>
        <EspModelsProvider />
        <EspScenariosProvider />
        <EspIndicatorsProvider />
        <div className={styles.col4}>
          <Search
            input={query}
            theme={darkSearch}
            onChange={handleSearchChange}
            className={styles.searchBox}
            placeholder={`Search in ${categoryName}`}
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
  data: PropTypes.array,
  categoryName: PropTypes.string.isRequired,
  titleLinks: PropTypes.array,
  query: PropTypes.string,
  sortBy: PropTypes.string,
  handleSearchChange: PropTypes.func
};

export default EmissionPathwaysTable;
