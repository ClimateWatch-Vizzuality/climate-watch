import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';

import { actions as fetchActions } from 'pages/ndcs-lts';

import Component from './ndcs-lts-table-component';

import {
  getISOCountries,
  getFilteredDataBySearch,
  getDefaultColumns
} from './ndcs-lts-table-selectors';

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
    tableData: getFilteredDataBySearch(ndcsLTSWithSelection),
    columns: getDefaultColumns(ndcsLTSWithSelection)
  };
};

class NDCSLTSTableContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.fetchNDCSLTS();
  }

  setColumnWidth = column => {
    const { columns } = this.props;
    const narrowColumns = [0, 1];
    const tableWidth = 1170;
    const numColumns = columns.length;
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

  handleSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
  };

  updateUrlParam(param, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, param, clear));
  }

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

NDCSLTSTableContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  fetchNDCSLTS: PropTypes.func.isRequired,
  tableData: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  query: PropTypes.object
};

export default withRouter(
  connect(mapStateToProps, actions)(NDCSLTSTableContainer)
);
