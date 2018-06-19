import { connect } from 'react-redux';
import {
  DATA_EXPLORER_FIRST_COLUMN_HEADERS,
  DATA_EXPLORER_SECTION_NAMES
} from 'data/constants';
import DataExplorerComponent from './data-explorer-content-component';

import { parseData } from './data-explorer-content-selectors';

const mapStateToProps = (state, { section }) => {
  const dataState = {
    data: state.dataExplorer && state.dataExplorer.data,
    section
  };
  const SECTION_HREFS = {
    'historical-emissions': '/ghg-emissions',
    'ndc-sdg-linkages': '/ndcs-sdg',
    'ndc-content': '/ndcs-content',
    'emission-pathways': '/pathways'
  };

  return {
    data: parseData(dataState),
    loading: state.dataExplorer && state.dataExplorer.loading,
    firstColumnHeaders: DATA_EXPLORER_FIRST_COLUMN_HEADERS,
    href: SECTION_HREFS[section],
    downloadHref: `/api/v1/data/${DATA_EXPLORER_SECTION_NAMES[
      section
    ]}/download.csv`
  };
};

export default connect(mapStateToProps, null)(DataExplorerComponent);
