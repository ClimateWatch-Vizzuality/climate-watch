import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DataExplorerProvider from 'providers/data-explorer-provider/data-explorer-provider';
import Table from 'components/table';
import NoContent from 'components/no-content';
import Loading from 'components/loading';
import styles from './data-explorer-content-styles.scss';

class DataExplorerContent extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  renderTable() {
    const { data, firstColumnHeaders } = this.props;
    return data ? (
      <Table
        data={data}
        rowHeight={60}
        sortBy={'region'}
        firstColumnHeaders={firstColumnHeaders}
        horizontalScroll
      />
    ) : (
      <NoContent message={'No data'} className={styles.noData} />
    );
  }
  render() {
    const { section, loading } = this.props;
    return (
      <div>
        <DataExplorerProvider section={section} />
        {loading ? (
          <Loading light className={styles.loader} />
        ) : (
          this.renderTable()
        )}
      </div>
    );
  }
}

DataExplorerContent.propTypes = {
  section: PropTypes.string.isRequired,
  data: PropTypes.array,
  firstColumnHeaders: PropTypes.array,
  loading: PropTypes.bool
};

export default DataExplorerContent;
