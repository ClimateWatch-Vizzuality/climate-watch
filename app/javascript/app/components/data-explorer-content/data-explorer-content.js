import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { DATA_EXPLORER_FIRST_COLUMN_HEADERS } from 'data/constants';
import DataExplorerComponent from './data-explorer-content-component';

import { parseData, getMeta } from './data-explorer-content-selectors';

const mapStateToProps = (state, { section, location }) => {
  const dataState = {
    data: state.dataExplorer && state.dataExplorer.data,
    section
  };

  return {
    data: parseData(dataState),
    meta: getMeta(dataState),
    metadataSection: location.hash && location.hash === '#meta',
    loading: state.dataExplorer && state.dataExplorer.loading,
    firstColumnHeaders: DATA_EXPLORER_FIRST_COLUMN_HEADERS,
    href: '/ghg-emissions',
    downloadHref: '/api/v1/data/historical_emissions/download.csv'
  };
};

export default withRouter(
  connect(mapStateToProps, null)(DataExplorerComponent)
);
