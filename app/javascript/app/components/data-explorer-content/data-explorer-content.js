import { connect } from 'react-redux';
import { DATA_EXPLORER_FIRST_COLUMN_HEADERS } from 'data/constants';
import Component from './data-explorer-content-component';
import { parseData } from './data-explorer-content-selectors';

const mapStateToProps = (state, { section }) => {
  const dataState = {
    data: state.dataExplorer && state.dataExplorer.data,
    section
  };

  return {
    data: parseData(dataState),
    loading: state.dataExplorer && state.dataExplorer.loading,
    firstColumnHeaders: DATA_EXPLORER_FIRST_COLUMN_HEADERS
  };
};

export default connect(mapStateToProps, null)(Component);
