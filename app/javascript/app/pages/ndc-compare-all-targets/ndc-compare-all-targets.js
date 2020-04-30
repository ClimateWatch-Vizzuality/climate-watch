import { createElement } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';
import { setColumnWidth as setColumnWidthUtil } from 'utils/table';
import NDCCompareAllComponent from './ndc-compare-all-targets-component';

import {
  getFilteredDataBySearch,
  getColumns,
  getLoading,
  getSearch,
  getSelectedTargets,
  getQuery
} from './ndc-compare-all-targets-selectors';

const mapStateToProps = (state, { location }) => {
  const search = qs.parse(location.search);
  return {
    loading: getLoading(state),
    query: getSearch(state, { search }),
    tableData: getFilteredDataBySearch(state, { search }),
    columns: getColumns(state, {
      search
    }),
    selectedTargets: getSelectedTargets(state, { search }),
    queryParams: getQuery(state, { search })
  };
};

const NDCCompareAllContainer = props => {
  const { history, location, columns, query, tableData } = props;

  const setColumnWidth = column =>
    setColumnWidthUtil({
      column,
      columns,
      tableWidth: 1170,
      narrowColumnWidth: 134,
      wideColumnWidth: 200,
      narrowColumns: [0, 2, 3, 4, 5, 6],
      wideColumns: [1]
    });

  const updateUrlParam = (param, clear) => {
    history.replace(getLocationParamUpdated(location, param, clear));
  };

  const handleSearchChange = value => {
    updateUrlParam({
      name: 'search',
      value
    });
  };

  const handleTargetsChange = value => {
    updateUrlParam({
      name: 'targets',
      value: value ? value.toString() : undefined
    });
  };

  const noContentMsg = query ? 'No data for this search' : 'No data';

  return createElement(NDCCompareAllComponent, {
    ...props,
    noContentMsg,
    handleSearchChange,
    tableData,
    setColumnWidth,
    handleTargetsChange
  });
};

NDCCompareAllContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  tableData: PropTypes.array,
  columns: PropTypes.array,
  query: PropTypes.string
};

export default withRouter(
  connect(mapStateToProps, null)(NDCCompareAllContainer)
);
