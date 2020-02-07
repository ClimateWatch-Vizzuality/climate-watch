import { createElement, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';
import { setColumnWidth as setColumnWidthUtil } from 'utils/table';
import NDCCompareAllComponent from './ndc-compare-all-targets-component';

import actions from './ndc-compare-all-targets-actions';
import reducers, { initialState } from './ndc-compare-all-targets-reducers';

import {
  getFilteredDataBySearch,
  getColumns,
  getLoading,
  getQuery
} from './ndc-compare-all-targets-selectors';

const mapStateToProps = (state, { location }) => {
  const search = qs.parse(location.search);
  return {
    loading: getLoading(state),
    query: getQuery(state, { search }),
    tableData: getFilteredDataBySearch(state, { search }),
    columns: getColumns(state, {
      search
    })
  };
};

const NDCCompareAllContainer = props => {
  const {
    history,
    location,
    columns,
    query,
    tableData,
    fetchCompareAll
  } = props;

  useEffect(() => {
    fetchCompareAll();
  }, []);

  const setColumnWidth = column =>
    setColumnWidthUtil({
      column,
      columns,
      tableWidth: 1170,
      narrowColumnWidth: 134,
      wideColumnWidth: 200,
      narrowColumns: [0, 2, 3, 4, 5],
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
  const noContentMsg = query ? 'No data for this search' : 'No data';

  return createElement(NDCCompareAllComponent, {
    ...props,
    noContentMsg,
    handleSearchChange,
    tableData,
    setColumnWidth
  });
};

NDCCompareAllContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  tableData: PropTypes.array,
  columns: PropTypes.array,
  query: PropTypes.string
};

export { actions, reducers, initialState };
export default withRouter(
  connect(mapStateToProps, actions)(NDCCompareAllContainer)
);
