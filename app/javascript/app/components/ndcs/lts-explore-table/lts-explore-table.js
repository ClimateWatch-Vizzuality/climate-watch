/* eslint-disable no-mixed-operators */
import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';

import { actions as fetchActions } from 'pages/ndcs-lts';

import Component from './lts-explore-table-component';

import {
  getISOCountries,
  tableRemoveIsoFromData,
  getDefaultColumns
} from './lts-explore-table-selectors';

const actions = { ...fetchActions };

const mapStateToProps = (state, { location }) => {
  const { data, loading } = state.ndcsLTS;
  const { countries } = state;
  const search = qs.parse(location.search);
  const ndcsLTSWithSelection = {
    ...data,
    countries: countries.data,
    query: search.search,
    search
  };
  return {
    loading,
    query: ndcsLTSWithSelection.query,
    isoCountries: getISOCountries(ndcsLTSWithSelection),
    tableData: tableRemoveIsoFromData(ndcsLTSWithSelection),
    columns: getDefaultColumns(ndcsLTSWithSelection)
  };
};

class LTSExploreTableContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.fetchNDCSLTS();
  }

  setColumnWidth = column => {
    const narrowColumns = [0, 1];
    const tableWidth = 1170;
    const numColumns = this.props.columns.length;
    const numNarrowColumns = narrowColumns.length;
    const colPadding = 10;
    const narrowColumnWidth = 180;
    const columnWidth =
      (tableWidth -
        (numColumns + 2) * colPadding -
        numNarrowColumns * narrowColumnWidth) /
      (numColumns - numNarrowColumns);
    const index = this.props.columns.indexOf(column);
    return index !== -1 && narrowColumns.indexOf(index) > -1
      ? narrowColumnWidth
      : columnWidth;
  };

  updateUrlParam(param, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, param, clear));
  }

  handleSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
  };

  render() {
    const { query } = this.props;
    const noContentMsg = query
      ? 'No results found'
      : 'There is no data for this indicator';
    return createElement(Component, {
      ...this.props,
      noContentMsg,
      handleSearchChange: this.handleSearchChange,
      tableData: this.props.tableData,
      setColumnWidth: this.setColumnWidth
    });
  }
}

LTSExploreTableContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  tableData: PropTypes.array,
  columns: PropTypes.array,
  query: PropTypes.object,
  fetchNDCSLTS: PropTypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, actions)(LTSExploreTableContainer)
);
